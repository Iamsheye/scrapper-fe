import ChevronLeft from "@/assets/left-boxed.svg?react";
import ChevronRight from "@/assets/right-boxed.svg?react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (string | number)[] = [1];

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    // Add pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-4 lg:justify-end lg:gap-6">
      <button
        aria-label="Previous page"
        disabled={currentPage === 1}
        className="disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((pageNum, idx) =>
          pageNum === "ellipsis" ? (
            <svg
              key={`ellipsis-${idx}`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="mx-1 h-4 w-4 text-form_text"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          ) : (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum as number)}
              className={`px-1 text-[1.5rem] ${
                currentPage === pageNum
                  ? "font-bold text-primary"
                  : "font-medium text-form_text"
              }`}
            >
              {pageNum}
            </button>
          ),
        )}
      </div>

      <button
        aria-label="Next page"
        disabled={currentPage === totalPages}
        className="disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      >
        <ChevronRight className="h-8 w-8" />
      </button>
    </nav>
  );
};

export default Pagination;
