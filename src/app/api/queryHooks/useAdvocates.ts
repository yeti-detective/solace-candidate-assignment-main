import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const getAdvocatesUrl = "/api/advocates";

/**
 * Query Hook that fetches from the /api/advocates endpoint
 * @param page - The page number to fetch (1-indexed)
 * @param searchTerm - The search term to filter advocates
 */
export function useAdvocates(page: number = 1, searchTerm: string = "") {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(searchTerm && { searchTerm }),
  });

  return useQuery({
    queryKey: [getAdvocatesUrl, page, searchTerm],
    queryFn: () =>
      fetch(`${getAdvocatesUrl}?${params}`).then((response) => response.json()),
    options: {
      onError: (e) => console.error("Uh oh, spaghettios", e),
    },
  });
}

/**
 * Hook that returns:
 * - filteredAdvocates, which is the response from /api/advocates
 * filtered by the search term (on the backend).
 * - onSearchTermChange, the function meant to be used
 * as the onChange function of the search input
 * - resetSearch, a function that clears the search term
 * - pagination metadata and controls
 */
export function useFilteredAdvocates() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: response } = useAdvocates(page, searchTerm);

  const advocates = response?.data ?? [];
  const pagination = response?.pagination;

  const resetSearch = useCallback(() => {
    setSearchTerm("");
    setPage(1);
    getSearchTermElement().innerHTML = "";
    document.getElementById("search-input").value = "";
  }, []);

  const onSearchTermChange = useCallback((e) => {
    const newSearchTerm = e.target.value;

    getSearchTermElement().innerHTML = newSearchTerm;

    console.log("searching advocates...");
    setSearchTerm(newSearchTerm);
    // Reset to page 1 when search term changes
    setPage(1);
  }, []);

  const goToNextPage = useCallback(() => {
    if (pagination?.hasNextPage) {
      setPage((p) => p + 1);
    }
  }, [pagination]);

  const goToPreviousPage = useCallback(() => {
    if (pagination?.hasPreviousPage) {
      setPage((p) => p - 1);
    }
  }, [pagination]);

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return {
    filteredAdvocates: advocates,
    onSearchTermChange,
    resetSearch,
    pagination,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  };
}

/**
 * helper function to get the search-term element
 */
const getSearchTermElement = (): HtmlElement => {
  return document.getElementById("search-term");
};
