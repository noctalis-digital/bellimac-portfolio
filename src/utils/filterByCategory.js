export const filterByCategory = (items = [], category) => {
  return items.filter((item) => {
    if (!item.category) return true;

    return (
      item.category
        .toLowerCase()
        .trim() === category.toLowerCase()
    );
  });
};
