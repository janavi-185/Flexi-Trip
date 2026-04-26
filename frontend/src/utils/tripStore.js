import { create } from 'zustand';
import * as tripApi from './tripApi';

export const useTripStore = create((set, get) => ({
  trips: [],
  activeTrip: null,
  itinerary: [],
  chatHistory: [],
  isLoading: false,
  isGenerating: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchTrips: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await tripApi.getUserTrips();
      set({ trips: result.data || [], isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },

  createTrip: async ({ destination, budget, duration, travelers, tripStyle, message }) => {
    set({ isGenerating: true, error: null });
    try {
      const result = await tripApi.createTrip({
        destination, budget, duration, travelers, tripStyle, message,
      });
      const { trip, itinerary, aiMessage } = result.data;

      // Add the new trip to the list
      set((state) => ({
        trips: [trip, ...state.trips],
        activeTrip: trip,
        itinerary: itinerary || [],
        isGenerating: false,
      }));

      return { trip, itinerary, aiMessage };
    } catch (error) {
      set({ isGenerating: false, error: error.message });
      throw error;
    }
  },

  selectTrip: async (tripId) => {
    set({ isLoading: true, error: null });
    try {
      const result = await tripApi.getTrip(tripId);
      const { trip, itinerary, chatHistory } = result.data;
      set({
        activeTrip: trip,
        itinerary: itinerary || [],
        chatHistory: chatHistory || [],
        isLoading: false,
      });
      return result.data;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  sendMessage: async (message) => {
    const { activeTrip } = get();
    if (!activeTrip) throw new Error('No active trip');

    try {
      const result = await tripApi.chatWithTrip(activeTrip.id, message);
      const { aiMessage, itinerary } = result.data;

      // Update itinerary if a new one was generated
      if (itinerary) {
        set({ itinerary });
      }

      // Reload chat history
      const tripData = await tripApi.getTrip(activeTrip.id);
      set({ chatHistory: tripData.data.chatHistory || [] });

      return { aiMessage, itinerary };
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  regenerate: async () => {
    const { activeTrip } = get();
    if (!activeTrip) throw new Error('No active trip');

    set({ isGenerating: true, error: null });
    try {
      const result = await tripApi.regenerateItinerary(activeTrip.id);
      const { itinerary, aiMessage } = result.data;

      set({ itinerary: itinerary || [], isGenerating: false });

      // Reload chat history
      const tripData = await tripApi.getTrip(activeTrip.id);
      set({ chatHistory: tripData.data.chatHistory || [] });

      return { itinerary, aiMessage };
    } catch (error) {
      set({ isGenerating: false, error: error.message });
      throw error;
    }
  },

  deleteTrip: async (tripId) => {
    try {
      await tripApi.deleteTrip(tripId);
      set((state) => ({
        trips: state.trips.filter((t) => String(t.id) !== String(tripId)),
        activeTrip: state.activeTrip?.id === tripId ? null : state.activeTrip,
        itinerary: state.activeTrip?.id === tripId ? [] : state.itinerary,
        chatHistory: state.activeTrip?.id === tripId ? [] : state.chatHistory,
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  clearActiveTrip: () => set({ activeTrip: null, itinerary: [], chatHistory: [] }),
}));
