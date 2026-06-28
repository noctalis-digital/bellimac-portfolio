export const filterByCategory = (items = [], category) => {
  if (!Array.isArray(items)) return [];

  const target = (category || "").toLowerCase().trim();

  return items.filter((item) => {
    const itemCategory = (item?.category || "")
      .toLowerCase()
      .trim();

    // fallback intelligent si catégorie absente
    const normalizedCategory = itemCategory || "photo";

    return normalizedCategory === target;
  });
};
