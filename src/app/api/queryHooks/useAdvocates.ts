import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {filterAdvocates } from "../../utils";

const getAdvocatesUrl = "/api/advocates";

/**
 * Query Hook that fetches from the /api/advocates endpoint
 * @param page - The page number to fetch (1-indexed)
 */
export function useAdvocates(page: number = 1) {
  return useQuery(
    { queryKey: [getAdvocatesUrl, page],
      queryFn: () =>
    fetch(`${getAdvocatesUrl}?page=${page}`).then((response) =>
      response.json(),
    ),
      options: {
        onError: (e) => console.error("Uh oh, spaghettios", e),
      }
    }
  );
}

/**
 * Hook that returns:
 * - filteredAdvocates, which is the response from /api/advocates
 * filtered by the search term.
 * - onSearchTermChange, the function meant to be used
 * as the onChange function of the search input
 * - resetSearch, a function that clears the search term
 * - pagination metadata and controls
 */
export function useFilteredAdvocates() {
  const [page, setPage] = useState(1);
  const {data: response } = useAdvocates(page);

  const advocates = response?.data;
  const pagination = response?.pagination;

  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    if (advocates) {
      setFilteredAdvocates(advocates)
    }
  }, [advocates]);

  const resetSearch = useCallback(() => {
    setFilteredAdvocates(advocates);
    getSearchTermElement().innerHTML = '';
    document.getElementById("search-input").value = '';
  }, [advocates])

  const onSearchTermChange = useCallback((e) => {
    const searchTerm = e.target.value;

    getSearchTermElement().innerHTML = searchTerm;

    console.log("filtering advocates...");
    const filteredAdvocates = filterAdvocates(advocates ?? [], searchTerm);
    setFilteredAdvocates(filteredAdvocates);
  }, [advocates]);

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
    filteredAdvocates,
    onSearchTermChange,
    resetSearch,
    pagination,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  }
}

/**
 * helper function to get the search-term element 
 */ 
const getSearchTermElement = (): HtmlElement => {
  return document.getElementById("search-term")
}
