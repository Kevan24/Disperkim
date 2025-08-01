import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center text-red-600 dark:text-red-400">
        <h1 className="text-4xl font-bold mb-4">403 - Unauthorized</h1>
        <p className="mb-6">You do not have permission to view this page.</p>
        <Link
          to="/dashboard"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
