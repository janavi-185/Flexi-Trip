import { createTrip, getTripsByUser, getTripById, updateTrip, deleteTrip } from "../models/trip.js";
import { saveItinerary, getItineraryByTrip } from "../models/itinerary.js";
import { saveChatMessage, getChatHistory, clearChatHistory } from "../models/chat.js";
import { generateAIResponse } from "../services/ai.js";


function extractDays(aiResult) {
  if (!aiResult || typeof aiResult !== 'object') return [];

  // Shape: { itinerary: { days: [...] } }
  if (Array.isArray(aiResult.itinerary?.days) && aiResult.itinerary.days.length > 0) {
    return aiResult.itinerary.days;
  }

  // Shape: { days: [...] }
  if (Array.isArray(aiResult.days) && aiResult.days.length > 0) {
    return aiResult.days;
  }

  // Shape: { itinerary: [...] } (itinerary IS the array)
  if (Array.isArray(aiResult.itinerary) && aiResult.itinerary.length > 0) {
    return aiResult.itinerary;
  }

  // Shape: { plan: { days: [...] } }
  if (Array.isArray(aiResult.plan?.days) && aiResult.plan.days.length > 0) {
    return aiResult.plan.days;
  }

  // Shape: { plan: [...] }
  if (Array.isArray(aiResult.plan) && aiResult.plan.length > 0) {
    return aiResult.plan;
  }

  // Shape: { trip: { itinerary: [...] } }
  if (Array.isArray(aiResult.trip?.itinerary) && aiResult.trip.itinerary.length > 0) {
    return aiResult.trip.itinerary;
  }

  console.warn("[TRIP] Could not extract days from AI result. Keys:", Object.keys(aiResult));
  return [];
}


export async function create(req, res) {
  try {
    const { destination, budget, duration, travelers, tripStyle, message } = req.body;

    if (!destination) {
      return res.status(400).json({ success: false, message: "destination is required" });
    }

    // 1. Create the trip record
    const trip = await createTrip({
      userId: req.userId,
      destination,
      budget,
      duration,
      travelers,
      tripStyle,
    });

    console.log("[TRIP] Created trip:", trip.id);

    const userMessage = message || `Plan a ${duration || ''} trip to ${destination} for ${travelers || '1'} ${
      (travelers === '1' || !travelers) ? 'person' : 'people'
    }. Budget: ${budget || 'flexible'}. Style: ${tripStyle || 'any'}.`;

    await saveChatMessage(trip.id, "user", userMessage);

    const tripContext = { destination, budget, duration, travelers, tripStyle };
    const chatHistory = [{ role: "user", content: userMessage }];

    let aiResult;
    try {
      aiResult = await generateAIResponse(chatHistory, tripContext);
    } catch (aiError) {
      console.error("[TRIP] AI generation failed:", aiError.message);
      return res.status(201).json({
        success: true,
        message: "Trip created but AI generation failed. You can try regenerating.",
        data: { trip, itinerary: null, aiMessage: "I'm having trouble generating your itinerary right now. Please try again." },
      });
    }

    console.log("[TRIP] AI result keys:", Object.keys(aiResult));

    const aiMessage = aiResult.message || "Here's your personalized itinerary!";
    await saveChatMessage(trip.id, "assistant", aiMessage);

    const days = extractDays(aiResult);
    let savedItinerary = [];
    if (days.length > 0) {
      savedItinerary = await saveItinerary(trip.id, days);
      await updateTrip(trip.id, { status: "planned" });
    }

    console.log("[TRIP] Itinerary saved with", savedItinerary.length, "days");

    return res.status(201).json({
      success: true,
      message: "Trip created successfully",
      data: {
        trip,
        itinerary: savedItinerary,
        aiMessage,
      },
    });
  } catch (error) {
    console.error("[TRIP] Create error:", error.message);
    return res.status(500).json({ success: false, message: "internal server error" });
  }
}

export async function list(req, res) {
  try {
    const trips = await getTripsByUser(req.userId);
    return res.json({ success: true, data: trips });
  } catch (error) {
    console.error("[TRIP] List error:", error.message);
    return res.status(500).json({ success: false, message: "internal server error" });
  }
}

export async function get(req, res) {
  try {
    const trip = await getTripById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: "trip not found" });
    }

    if (String(trip.user_id) !== String(req.userId)) {
      return res.status(403).json({ success: false, message: "not authorized" });
    }

    const [itinerary, chatHistory] = await Promise.all([
      getItineraryByTrip(trip.id),
      getChatHistory(trip.id),
    ]);

    return res.json({
      success: true,
      data: { trip, itinerary, chatHistory },
    });
  } catch (error) {
    console.error("[TRIP] Get error:", error.message);
    return res.status(500).json({ success: false, message: "internal server error" });
  }
}

export async function update(req, res) {
  try {
    const trip = await getTripById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: "trip not found" });
    }
    if (String(trip.user_id) !== String(req.userId)) {
      return res.status(403).json({ success: false, message: "not authorized" });
    }

    const updated = await updateTrip(trip.id, req.body);
    return res.json({ success: true, data: updated });
  } catch (error) {
    console.error("[TRIP] Update error:", error.message);
    return res.status(500).json({ success: false, message: "internal server error" });
  }
}


export async function remove(req, res) {
  try {
    const trip = await getTripById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: "trip not found" });
    }
    if (String(trip.user_id) !== String(req.userId)) {
      return res.status(403).json({ success: false, message: "not authorized" });
    }

    await deleteTrip(trip.id);
    return res.json({ success: true, message: "trip deleted" });
  } catch (error) {
    console.error("[TRIP] Delete error:", error.message);
    return res.status(500).json({ success: false, message: "internal server error" });
  }
}


export async function chat(req, res) {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: "message is required" });
    }

    const trip = await getTripById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: "trip not found" });
    }
    if (String(trip.user_id) !== String(req.userId)) {
      return res.status(403).json({ success: false, message: "not authorized" });
    }

    // Save user message
    await saveChatMessage(trip.id, "user", message);

    // Get full chat history
    const fullHistory = await getChatHistory(trip.id);
    const tripContext = {
      destination: trip.destination,
      budget: trip.budget,
      duration: trip.duration,
      travelers: trip.travelers,
      tripStyle: trip.trip_style,
    };

    // Call AI
    const aiResult = await generateAIResponse(fullHistory, tripContext);
    const aiMessage = aiResult.message || "Here's what I came up with!";

    // Save AI response
    await saveChatMessage(trip.id, "assistant", aiMessage);

    // If AI returned a new itinerary, save it
    const days = extractDays(aiResult);
    let updatedItinerary = null;
    if (days.length > 0) {
      updatedItinerary = await saveItinerary(trip.id, days);
      console.log("[TRIP] Updated itinerary with", updatedItinerary.length, "days");
    }

    return res.json({
      success: true,
      data: {
        aiMessage,
        itinerary: updatedItinerary,
      },
    });
  } catch (error) {
    console.error("[TRIP] Chat error:", error.message);
    return res.status(500).json({ success: false, message: "internal server error" });
  }
}

/**
 * POST /api/trips/:id/regenerate — Regenerate the itinerary for a trip.
 */
export async function regenerate(req, res) {
  try {
    const trip = await getTripById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: "trip not found" });
    }
    if (String(trip.user_id) !== String(req.userId)) {
      return res.status(403).json({ success: false, message: "not authorized" });
    }

    // Clear old chat and start fresh
    await clearChatHistory(trip.id);

    const userMessage = `Please regenerate a detailed day-by-day itinerary for my trip to ${trip.destination}. Budget: ${trip.budget || 'flexible'}. Duration: ${trip.duration || 'flexible'}. Travelers: ${trip.travelers || '1'}. Style: ${trip.trip_style || 'any'}.`;

    await saveChatMessage(trip.id, "user", userMessage);

    const tripContext = {
      destination: trip.destination,
      budget: trip.budget,
      duration: trip.duration,
      travelers: trip.travelers,
      tripStyle: trip.trip_style,
    };

    const aiResult = await generateAIResponse(
      [{ role: "user", content: userMessage }],
      tripContext
    );

    const aiMessage = aiResult.message || "Here's your refreshed itinerary!";
    await saveChatMessage(trip.id, "assistant", aiMessage);

    const days = extractDays(aiResult);
    let savedItinerary = [];
    if (days.length > 0) {
      savedItinerary = await saveItinerary(trip.id, days);
    }

    return res.json({
      success: true,
      data: {
        trip,
        itinerary: savedItinerary,
        aiMessage,
      },
    });
  } catch (error) {
    console.error("[TRIP] Regenerate error:", error.message);
    return res.status(500).json({ success: false, message: "internal server error" });
  }
}
