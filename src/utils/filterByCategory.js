import { normalizePortfolioCategory } from "./portfolioCategory";

export const filterByCategory = (items = [], category) => {
  if (!Array.isArray(items)) return [];

  const target = normalizePortfolioCategory(category, null);
  if (!target) return [];

  return items.filter((item) => {
    return normalizePortfolioCategory(item?.category, null) === target;
  });
};
