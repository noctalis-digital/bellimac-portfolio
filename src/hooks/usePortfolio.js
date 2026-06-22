import { useEffect, useState } from "react";
import { fetchPortfolio } from "../api/portfolioAPI";

export default function usePortfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}
