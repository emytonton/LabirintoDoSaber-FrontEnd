import React from "react";
import "./style.css";

export default function PageTurner({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const goToPage = (page) => {
    if (!onPageChange) return;
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const handlePrev = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  return (
    <div className="pagination-controls">
      <button
        className="page-arrow"
        onClick={handlePrev}
        disabled={currentPage === 1}
        style={{
          background: "none",
          border: "none",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        &lt;
      </button>

      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        const isActive = currentPage === page;

        return (
          <button
            key={page}
            className={`page-number ${isActive ? "active" : ""}`}
            onClick={() => goToPage(page)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: isActive ? "bold" : "normal",
            }}
          >
            {page}
          </button>
        );
      })}

      <button
        className="page-arrow"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        style={{
          background: "none",
          border: "none",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        &gt;
      </button>
    </div>
  );
}
