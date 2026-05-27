import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogPaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize?: number; // Django page size defaults to 2 here
  siblingCount?: number;
}

export function BlogPagination({
  totalCount,
  currentPage,
  pageSize = 2,
  siblingCount = 1,
}: BlogPaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);

  // If there's only 1 page, don't show pagination
  if (totalPages <= 1) return null;

  // Logic to generate page numbers (e.g., [1, ..., 4, 5, 6, ..., 10])
  const generatePaginationItems = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    const items: (number | string)[] = [];

    // Always show first page
    items.push(1);

    if (showLeftEllipsis) items.push("ellipsis-start");

    // Show siblings
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        items.push(i);
      }
    }

    if (showRightEllipsis) items.push("ellipsis-end");

    // Always show last page
    items.push(totalPages);

    return items;
  };

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious 
            href={currentPage > 1 ? `?page=${currentPage - 1}` : "#"}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {generatePaginationItems().map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={`?page=${page}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext 
            href={currentPage < totalPages ? `?page=${currentPage + 1}` : "#"}
            aria-disabled={currentPage >= totalPages}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}