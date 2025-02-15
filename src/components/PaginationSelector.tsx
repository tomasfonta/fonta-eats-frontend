import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = {
    page: number;
    pages: number;
    onPageChange: (pageNumber: number) => void;
}

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {

    const pageNubmers = [];
    for (let i = 1; i <= pages; i++) {
        pageNubmers.push(i);
    }

    return (
        <Pagination>
            <PaginationContent>
                {page !== 1 && <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => onPageChange(page - 1)}
                    />
                </PaginationItem>}

                {pageNubmers.map((number) =>
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            onClick={() => onPageChange(number)}
                            isActive={page === number}>
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                )}
                {page !== pageNubmers.length && (
                    <PaginationItem>
                        <PaginationNext href="#"
                            onClick={() => onPageChange(page + 1)} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>)
};

export default PaginationSelector;