const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function apiFetch(path, options = {}) {
  const { headers = {}, ...rest } = options;
  const hasBody = rest.body !== undefined;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
  });

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(payload?.message || `Request failed (${response.status})`);
  }

  return payload;
}
