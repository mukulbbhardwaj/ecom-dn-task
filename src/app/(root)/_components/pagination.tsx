import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

export async function PaginationSystem({ pageNumber }: { pageNumber: number }) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size={"sm"}
            href={`/?page=${pageNumber - 1}`}
            aria-disabled={pageNumber <= 1}
            tabIndex={pageNumber <= 1 ? -1 : undefined}
            className={
              pageNumber <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive={pageNumber === 1} href={"/"}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive={pageNumber === 2} href={`/?page=2`}>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:flex">
          <PaginationLink isActive={pageNumber === 3} href={`/?page=3`}>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext size={"sm"} href={`/?page=${pageNumber + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
