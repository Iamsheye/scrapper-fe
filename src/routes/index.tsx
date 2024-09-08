import { Link, createFileRoute } from "@tanstack/react-router";

export const Index = () => {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Link to="/login">
        {({ isActive }) => (
          <button className="p-2 bg-blue-500 text-white rounded-md">
            Login
          </button>
        )}
      </Link>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
