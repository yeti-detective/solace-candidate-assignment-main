"use client";

import { SolaceCandidateAssignmentQueryClientProvider } from "./api/QueryClientProvider";
import { AdvocatesTable } from "./Components/AdvocatesTable";
import { SearchHeader } from "./Components/SearchHeader";
import { useFilteredAdvocates } from "./api/queryHooks/useAdvocates";

/**
 * Home Page component for the Solace Candidate Assignment app
 */
function Home() {
  const {filteredAdvocates, onSearchTermChange, resetSearch} = useFilteredAdvocates();

  return (
    <main style={{ margin: "24px" }}>
      <SearchHeader onClick={resetSearch} onChange={onSearchTermChange}>
        <AdvocatesTable advocates={filteredAdvocates} />
      </SearchHeader>
    </main>
  );
}

export default function () {
  return (
    <SolaceCandidateAssignmentQueryClientProvider>
      <Home />
    </SolaceCandidateAssignmentQueryClientProvider>
  );
}
