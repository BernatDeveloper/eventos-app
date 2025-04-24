import React from "react";
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
                className={`px-4 py-2 rounded transition ${prevPageUrl
                        ? "bg-gray-300 hover:bg-gray-400"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
            >
                ⏮
            </button>

            <span className="text-lg font-medium text-gray-700">
                {currentPage}
            </span>

            <button
                disabled={!nextPageUrl}
                onClick={() => nextPageUrl && onPageChange(nextPageUrl)}
                className={`px-4 py-2 rounded transition ${nextPageUrl
                        ? "bg-gray-300 hover:bg-gray-400"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
            >
                ⏭
            </button>
        </div>
    );

};
