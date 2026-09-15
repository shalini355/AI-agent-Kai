const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/$/, "");

export async function apiRequest(path, options = {}) {
  const maxRetries = options.retries ?? 2;
  const { timeoutMs, retries, token: explicitToken, ...requestOptions } = options;
  const token = explicitToken || sessionStorage.getItem("kai_access_token");

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs || 20000);

    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        ...requestOptions,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...requestOptions.headers,
        },
        signal: controller.signal,
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error = new Error(data.message || "The request could not be completed.");
        error.status = response.status;
        error.details = data.details;
        if (attempt < maxRetries && (response.status === 429 || response.status >= 500)) {
          await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** attempt));
          continue;
        }
        throw error;
      }

      return data;
    } catch (error) {
      if (attempt < maxRetries && (error.name === "AbortError" || !error.status)) {
        await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** attempt));
        continue;
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error("The request could not be completed.");
}

export { API_BASE_URL };
