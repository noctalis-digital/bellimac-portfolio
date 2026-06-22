export const getPhotos = (items) => {
  return items.filter((p) => {
    const text = `${p.title} ${p.textDetail || ""}`.toLowerCase();

    return (
      text.includes("portrait") ||
      text.includes("corporate") ||
      text.includes("entreprise") ||
      p.gallery?.length > 2
    );
  });
};

export const getVideos = (items) => {
  return items.filter((p) => {
    const text = `${p.title} ${p.textDetail || ""}`.toLowerCase();

    return (
      text.includes("clip") ||
      text.includes("publicité") ||
      text.includes("film") ||
      !!p.externalLink
    );
  });
};

export const getLights = (items) => {
  return items.filter((p) => {
    const text = `${p.title} ${p.textDetail || ""}`.toLowerCase();

    return (
      text.includes("lumière") ||
      text.includes("lighting") ||
      text.includes("plateau") ||
      text.includes("électro")
    );
  });
};
