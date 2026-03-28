import api from './axios';

function getApiError(error) {
  const message = error?.response?.data?.message || error?.message || 'Request failed';
  return new Error(message);
}

export async function login(email, password) {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function register(name, email, password) {
  try {
    const response = await api.post('/api/auth/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function me(token) {
  try {
    const response = await api.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export const authApi = {
  login: ({ email, password }) => login(email, password),
  register: ({ name, email, password }) => register(name, email, password),
  me,
};
