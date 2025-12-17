"use client";

import { SolaceCandidateAssignmentQueryClientProvider } from "./api/QueryClientProvider";
import { AdvocatesTable } from "./Components/AdvocatesTable";
import { SearchHeader } from "./Components/SearchHeader";
import { Pagination } from "./Components/Pagination";
import { useFilteredAdvocates } from "./api/queryHooks/useAdvocates";

/**
 * Home Page component for the Solace Candidate Assignment app
 */
function Home() {
  const {
    filteredAdvocates,
    onSearchTermChange,
    resetSearch,
    pagination,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = useFilteredAdvocates();

  return (
    <main style={{ margin: "24px" }}>
      <SearchHeader onClick={resetSearch} onChange={onSearchTermChange}>
        <AdvocatesTable advocates={filteredAdvocates} />
        {pagination && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            hasNextPage={pagination.hasNextPage}
            hasPreviousPage={pagination.hasPreviousPage}
            onNextPage={goToNextPage}
            onPreviousPage={goToPreviousPage}
            onGoToPage={goToPage}
          />
        )}
      </SearchHeader>
    </main>
  );
}

export default function App() {
  return (
    <SolaceCandidateAssignmentQueryClientProvider>
      <Home />
    </SolaceCandidateAssignmentQueryClientProvider>
  );
}
