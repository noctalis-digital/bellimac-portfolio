import { useEffect, useState } from "react";
import { fetchPortfolio } from "../services/portfolioApi";
import { normalizePortfolioCategory } from "../utils/portfolioCategory";

const normalizeProject = (project) => {
  const gallery = (
  project?.galleryUrls ||
  project?.gallery ||
  []
).map((img) => {
  return typeof img === "string" ? img : img.url;
});
  const coverUrl =
    project.coverUrl ||
    project.cover?.url ||
    gallery?.[0] ||
    "";

  return {
  id: project.id,
  title: project.title || "Projet",
  description: project.description || "",
  detailsHtml: project.detailsHtml || "",
  link: project.link || "",

  category: normalizePortfolioCategory(project.category, null),

  coverUrl,
  galleryUrls: gallery,
  updatedAt: project.updatedAt,
};
};

export const usePortfolio = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await fetchPortfolio();
        if (!mounted) return;

        setItems((data || []).map(normalizeProject));
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Erreur chargement portfolio");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return { items, loading, error };
};
