import {
  PencilSquareIcon,
  ArchiveBoxIcon,
  ArchiveBoxXMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { ConfirmDialog } from "./ConfirmDialog";

import { CreateOrEditVehicle } from "../components/CreateOrEditVehicle";
import { useVehicle } from "../context/vehicleContext";

export interface VehicleResponse {
  id: string;
  name: string;
  plate: string;
  status: "ativo" | "inativo";
}

export function UserTable() {
  const { vehicles, fetchVehicles } = useVehicle();

  return (
    <div className="max-h-[400px] overflow-auto rounded-lg shadow">
      <table className="min-w-full bg-white">
        <thead className="sticky top-0 z-10 bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="p-4">Veículo</th>
            <th className="p-4">Placa</th>
            <th className="p-4">Status</th>
            <th className="p-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr
              key={vehicle.name}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } transition hover:bg-gray-100`}
            >
              <td className="p-4">{vehicle.name}</td>
              <td className="p-4">{vehicle.plate}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      vehicle.status === "ativo"
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  ></span>
                  {vehicle.status === "ativo" ? "Ativo" : "Inativo"}
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <CreateOrEditVehicle
                    vehicle={vehicle}
                    onSuccess={fetchVehicles}
                  >
                    <button className="text-blue-600 hover:text-blue-800">
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                  </CreateOrEditVehicle>
                  <ConfirmDialog
                    type={vehicle.status === "ativo" ? "archive" : "unarchive"}
                    vehicle={vehicle}
                    title={
                      vehicle.status === "ativo"
                        ? "Inativar veículo"
                        : "Reativar veículo"
                    }
                    description={`Deseja ${
                      vehicle.status === "ativo" ? "inativar" : "reativar"
                    } este veículo?`}
                    onConfirm={fetchVehicles}
                  >
                    <button className="text-yellow-600 hover:text-yellow-800">
                      {vehicle.status === "ativo" ? (
                        <ArchiveBoxXMarkIcon className="h-5 w-5" />
                      ) : (
                        <ArchiveBoxIcon className="h-5 w-5" />
                      )}
                    </button>
                  </ConfirmDialog>

                  <ConfirmDialog
                    type="delete"
                    vehicle={vehicle}
                    title="Excluir veículo"
                    description="Deseja excluir permanentemente este veículo?"
                    onConfirm={fetchVehicles}
                  >
                    <button className="text-red-600 hover:text-red-800">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </ConfirmDialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
