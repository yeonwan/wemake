import { useSearchParams } from "react-router";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Link } from "react-router";

type PaginationProps = {
    totalPages: number;

}

export function ProductPagination({
    totalPages,

}: PaginationProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const onClick = (page: number) => {
        searchParams.set("page", page.toString());
        setSearchParams(searchParams, );
    }

    return <div>
        <Pagination>
            <PaginationContent>

                {currentPage === 1 ? null :
                    <>
                        <PaginationItem>
                            <PaginationPrevious 
                            to={`?page=${currentPage - 1}`} 
                            onClick={(event) => {
                                event.preventDefault();
                                onClick(currentPage - 1);
                            }} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink 
                            to={`?page=${currentPage - 1}`} 
                            onClick={(event) => {
                                event.preventDefault();
                                onClick(currentPage - 1);
                            }}>{currentPage - 1}</PaginationLink>
                        </PaginationItem>
                    </>
                }
                <PaginationItem>
                    <PaginationLink 
                    to={`?page=${currentPage}`} 
                    onClick={(event) => {
                        event.preventDefault();
                        onClick(currentPage);
                    }} isActive>{currentPage}</PaginationLink>
                </PaginationItem>
                {currentPage === totalPages ? null :
                    <>
                        <PaginationItem>
                            <PaginationLink 
                            to={`?page=${currentPage + 1}`} 
                            onClick={(event) => {
                                event.preventDefault();
                                onClick(currentPage + 1);
                            }}>{currentPage + 1}</PaginationLink>
                        </PaginationItem>
                    </>
                }
                {currentPage + 1 >= totalPages ? null :
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext 
                            to={`?page=${currentPage + 1}`} 
                            onClick={(event) => {
                                event.preventDefault();
                                onClick(currentPage + 1);
                            }} />
                        </PaginationItem>
                    </>
                }

            </PaginationContent>
        </Pagination>

    </div>;
}
