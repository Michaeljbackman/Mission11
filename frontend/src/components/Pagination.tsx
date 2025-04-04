interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
  }
  
  const Pagination = ({
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
    onPageSizeChange,
  }: PaginationProps) => {
    return (
      <div className="d-flex flex-column align-items-center mt-4 gap-2">
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
  
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`btn btn-sm ${
                currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
  
          <button
            className="btn btn-outline-primary btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
  
        <div>
          <label className="me-2">Results Per Page:</label>
          <select
            className="form-select form-select-sm w-auto d-inline-block"
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
              onPageChange(1); // Reset to page 1 on size change
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    );
  };
  
  export default Pagination;
