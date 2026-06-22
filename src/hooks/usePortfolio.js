import { useEffect, useState } from "react";
import { fetchPortfolio } from "../api/portfolioAPI";

export const usePortfolio = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetchPortfolio()
      .then((data) => {
        if (!mounted) return;
        setItems(data);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => (mounted = false);
  }, []);

  return { items, loading, error };
};
