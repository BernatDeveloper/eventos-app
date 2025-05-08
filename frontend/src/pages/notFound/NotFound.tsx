import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

export const NotFound = () => {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center h-100 text-center px-4">
            <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-gray-700 mb-6">
                The page you’re looking for doesn’t exist.
            </p>
            <button
                onClick={() => navigate(ROUTES.home)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
            >
                Go Back
            </button>
        </div>
    );
};
