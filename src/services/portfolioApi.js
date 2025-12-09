const isLocalhost = (host) =>
  host === "localhost" || host === "127.0.0.1" || host === "::1";

export const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }
  if (typeof window !== "undefined" && isLocalhost(window.location.hostname)) {
    return "http://localhost:4000";
  }
  return "https://admin.bellimac.com";
};

const withTrailingSlash = (url) => url.replace(/\/+$/, "");

export const fetchPortfolio = async () => {
  const endpoint = `${withTrailingSlash(getApiBaseUrl())}/api/portfolio`;
  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    throw new Error(
      errorPayload.message ||
        `Chargement du portfolio impossible (${response.status})`
    );
  }

  const payload = await response.json();
  return payload.items || [];
};

export const fetchPortfolioItem = async (id) => {
  const endpoint = `${withTrailingSlash(
    getApiBaseUrl()
  )}/api/portfolio/${encodeURIComponent(id)}`;
  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    throw new Error(errorPayload.message || `Projet introuvable (${id})`);
  }

  const payload = await response.json();
  return payload.item;
};
