import api from './axios';

function getApiError(error) {
  const message = error?.response?.data?.message || error?.message || 'Request failed';
  return new Error(message);
}

export async function createTrip({ destination, budget, duration, travelers, tripStyle, message }) {
  try {
    const token = localStorage.getItem('flexitrip_auth_token');
    const response = await api.post('/api/trips', {
      destination, budget, duration, travelers, tripStyle, message,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function getUserTrips() {
  try {
    const token = localStorage.getItem('flexitrip_auth_token');
    const response = await api.get('/api/trips', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function getTrip(id) {
  try {
    const token = localStorage.getItem('flexitrip_auth_token');
    const response = await api.get(`/api/trips/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function updateTrip(id, fields) {
  try {
    const token = localStorage.getItem('flexitrip_auth_token');
    const response = await api.put(`/api/trips/${id}`, fields, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function deleteTrip(id) {
  try {
    const token = localStorage.getItem('flexitrip_auth_token');
    const response = await api.delete(`/api/trips/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function chatWithTrip(id, message) {
  try {
    const token = localStorage.getItem('flexitrip_auth_token');
    const response = await api.post(`/api/trips/${id}/chat`, { message }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function regenerateItinerary(id) {
  try {
    const token = localStorage.getItem('flexitrip_auth_token');
    const response = await api.post(`/api/trips/${id}/regenerate`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function updateProfile({ name, email }) {
  try {
    const token = localStorage.getItem('flexitrip_auth_token');
    const response = await api.put('/api/auth/profile', { name, email }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}
