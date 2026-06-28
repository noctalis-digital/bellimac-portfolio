export const filterByCategory = (items = [], category) => {
  if (!Array.isArray(items)) return [];

  const target = (category || "").toLowerCase().trim();

  return items.filter((item) => {
    const itemCategory = (item?.category || "")
      .toLowerCase()
      .trim();

    return itemCategory === target;
  });
};
