import { useNavigate } from "react-router-dom";
import logo from "../assets/epta-logo.png";
import { UserIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export function Header() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const username = localStorage.getItem("username") || "Usuário";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <header className="mx-10 my-4 flex h-[44px] items-center justify-between pb-2">
      <img src={logo} alt="logo" className="h-full" />

      <div className="relative">
        <button
          className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-gray-100"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <UserIcon className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold">{username}</span>
          <ChevronDownIcon
            className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="ring-opacity-5 absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
            <div className="py-1">
              <button
                onClick={logout}
                className="block w-full rounded px-4 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Sair
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
