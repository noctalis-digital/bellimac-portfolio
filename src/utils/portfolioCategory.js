export const PORTFOLIO_CATEGORIES = ["photo", "video", "lumiere"];

const stripAccents = (value = "") =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const normalizePortfolioCategory = (value, fallback = null) => {
  const rawValue = Array.isArray(value) ? value[0] : value;
  if (typeof rawValue !== "string") return fallback;

  const category = stripAccents(rawValue).toLowerCase().trim();
  return PORTFOLIO_CATEGORIES.includes(category) ? category : fallback;
};

export const isPortfolioCategory = (value) =>
  normalizePortfolioCategory(value, null) !== null;
