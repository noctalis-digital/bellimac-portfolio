export const PORTFOLIO_CATEGORIES = ["photo", "video", "lumiere"];

export const normalizePortfolioCategory = (value, fallback = null) => {
  const category = String(value || "").toLowerCase().trim();
  return PORTFOLIO_CATEGORIES.includes(category) ? category : fallback;
};

export const isPortfolioCategory = (value) =>
  normalizePortfolioCategory(value, null) !== null;
