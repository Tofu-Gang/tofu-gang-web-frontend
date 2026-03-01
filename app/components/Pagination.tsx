type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
    if(totalPages <= 1) {
        return null;
    } else {
        const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

        return (
            <div className="flex justify-center gap-2 mt-8">
                {pageNumbers.map((page) =>
                    <button
                        key={page}
                        className={`px-3 py-1 rounded ${currentPage === page ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200 cursor-pointer"}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )}
            </div>
        );
    }
}

export default Pagination;
