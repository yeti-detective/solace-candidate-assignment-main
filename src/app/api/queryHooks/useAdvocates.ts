import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {filterAdvocates } from "../../utils";

const getAdvocatesUrl = "/api/advocates";

/**
 * Query Hook that fetches from the /api/advocates endpoint
 */
export function useAdvocates() {
  return useQuery(
    { queryKey: [getAdvocatesUrl],
      queryFn: () =>
    fetch(getAdvocatesUrl).then((response) =>
      response.json().then((jres) => jres.data),
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
 */ 
export function useFilteredAdvocates() {
  const {data: advocates } = useAdvocates();

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

  return {filteredAdvocates, onSearchTermChange, resetSearch}
}

/**
 * helper function to get the search-term element 
 */ 
const getSearchTermElement = (): HtmlElement => {
  return document.getElementById("search-term")
}
