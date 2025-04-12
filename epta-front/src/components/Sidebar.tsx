import { HomeIcon, ChartBarIcon } from "@heroicons/react/16/solid";
import { useLocation, useNavigate } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  return (
    <aside className="h-screen border-r border-gray-200">
      <nav className="flex flex-col gap-2">
        <h2 className="mb-3 ml-10 text-2xl">Navegação</h2>
        <div className="mr-1 ml-8 flex flex-col gap-4 text-xl">
          <a
            onClick={() => navigate("/dashboard")}
            className={`flex w-2xs items-center rounded-3xl p-3 ${
              currentPath === "/dashboard"
                ? "bg-gray-200 text-blue-500"
                : "text-gray-700"
            } hover:bg-gray-200`}
          >
            <HomeIcon className="mr-2 h-5 w-5" />
            Dashboard
          </a>
          <a
            className={`flex w-2xs items-center rounded-3xl p-3 ${
              currentPath === "/relatorios"
                ? "bg-gray-200 text-blue-500"
                : "text-gray-700"
            } hover:bg-gray-200`}
            onClick={() => navigate("/relatorios")}
          >
            <ChartBarIcon className="mr-2 h-5 w-5" />
            Relatórios
          </a>
        </div>
      </nav>
    </aside>
  );
}
