import { useMemo } from "react";

function useCatalogFilter<T>(
  items: T[],
  query: string,
  searchKey?: (item: T) => string,
): T[] {
  return useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();

    if (!cleanQuery) return items;

    return items.filter((item) => {
      const targetText = searchKey
        ? searchKey(item)
        : typeof item === "string"
          ? item
          : JSON.stringify(item);

      return targetText.toLowerCase().includes(cleanQuery);
    });
  }, [items, query, searchKey]);
}

export default useCatalogFilter;
