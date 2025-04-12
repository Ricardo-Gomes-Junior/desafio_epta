import { Card } from "./Card";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { CreateOrEditVehicle } from "../components/CreateOrEditVehicle";
import { useVehicle } from "../context/vehicleContext";

export function DashboardContent() {
  const { dashboard, fetchDashboard } = useVehicle();

  const username = localStorage.getItem("username") ?? "Olá, Usuário";

  return (
    <div className="px-4 py-6">
      <h1 className="pb-2 text-2xl font-medium md:text-3xl">Olá, {username}</h1>
      <h2 className="pb-8 text-sm text-gray-400 md:text-base">
        Cadastre e gerencie seus veículos:
      </h2>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-4">
        <Card imageType="check" nome="Total" total={dashboard.totalVehicles} />
        <Card
          imageType="active"
          nome="Ativos"
          total={dashboard.activeVehicles}
        />
        <Card
          imageType="inactive"
          nome="Inativos"
          total={dashboard.inactiveVehicles}
        />
      </div>

      <div className="mt-6">
        <CreateOrEditVehicle onSuccess={fetchDashboard}>
          <button className="flex w-full items-center justify-center gap-2 rounded-3xl bg-blue-500 px-4 py-2 text-white shadow-md transition hover:bg-blue-600 sm:w-[220px]">
            <PlusCircleIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Cadastrar Veículo</span>
          </button>
        </CreateOrEditVehicle>
      </div>
    </div>
  );
}
