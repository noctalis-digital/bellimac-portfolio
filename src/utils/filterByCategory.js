export const filterByCategory = (items = [], category) => {
  if (!Array.isArray(items)) return [];

  return items.filter((item) => {
    const itemCategory = item?.category?.toLowerCase?.();
    return itemCategory === category.toLowerCase();
  });
};
