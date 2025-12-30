"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Adjust path to where you saved your component

interface BlogPaginationProps {
  totalCount: number;
  pageSize?: number; // Default Django page size is usually 10
  siblingCount?: number;
}

export function BlogPagination({
  totalCount,
  pageSize = 10,
  siblingCount = 1,
}: BlogPaginationProps) {
    const [currentPage, setPage] = useQueryState(
    "page", 
    parseAsInteger.withDefault(1).withOptions({
      shallow: false, // Set to TRUE if you want instant updates without reloading
      history: "push", // Allows user to use "Back" button
      scroll: true, // Scroll to top on change
    })
  );
  
  //const searchParams = useSearchParams();
  //const pathname = usePathname();
  //const router = useRouter();

  // 1. Get current page from URL (default to 1)
  //const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalCount / pageSize);

  // If there's only 1 page, don't show pagination
  if (totalPages <= 1) return null;

  // Helper to handle click
  const handlePageChange = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    setPage(page);
  };

  // 3. Logic to generate page numbers (e.g., [1, ..., 4, 5, 6, ..., 10])
  const generatePaginationItems = () => {
    // If total pages is small, show all
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
 
    // Otherwise, calculate range
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
            href={`?page=${currentPage - 1}`} // Fallback for SEO
            onClick={(e) => handlePageChange(currentPage - 1, e)}
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
                href={`?page=${page}`} // Fallback for SEO
                onClick={(e) => handlePageChange(Number(page), e)}
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
            href={`?page=${currentPage + 1}`}
            onClick={(e) => handlePageChange(currentPage + 1, e)}
            aria-disabled={currentPage >= totalPages}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}