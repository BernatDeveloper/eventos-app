import React from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { PaginationButtonsProps } from "../../../../types/user";

export const PaginationButtons: React.FC<PaginationButtonsProps> = ({
    currentPage,
    nextPageUrl,
    prevPageUrl,
    onPageChange,
}) => {
    return (
        <div className="mt-6 flex justify-center items-center gap-4">
            <button
                disabled={!prevPageUrl}
                onClick={() => prevPageUrl && onPageChange(prevPageUrl)}
                className={`custom-button primary-button 
                        ${prevPageUrl
                        ? "hover:opacity-90"
                        : "!cursor-not-allowed opacity-60"
                    }`}
            >
                <MdNavigateBefore size={20} />
            </button>

            <span className="text-lg font-medium text-[var(--text-primary-color)]">
                {currentPage}
            </span>

            <button
                disabled={!nextPageUrl}
                onClick={() => nextPageUrl && onPageChange(nextPageUrl)}
                className={`custom-button primary-button 
                        ${nextPageUrl
                        ? "hover:opacity-90"
                        : "!cursor-not-allowed opacity-60"
                    }`}
            >
                <MdNavigateNext size={20} />
            </button>
        </div>
    );
};
