// context/VehicleContext.tsx
import { createContext, useContext, useState } from "react";
import { api } from "../services/api";

interface Vehicle {
  id: string;
  name: string;
  plate: string;
  status: "ativo" | "inativo";
}

interface DashboardResponse {
  totalVehicles: number;
  activeVehicles: number;
  inactiveVehicles: number;
}

interface VehicleContextData {
  vehicles: Vehicle[];
  fetchVehicles: () => Promise<void>;
  dashboard: DashboardResponse;
  fetchDashboard: () => Promise<void>;
}

const VehicleContext = createContext({} as VehicleContextData);

export function VehicleProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [dashboard, setDashboard] = useState<DashboardResponse>({
    totalVehicles: 0,
    activeVehicles: 0,
    inactiveVehicles: 0,
  });

  async function fetchVehicles() {
    try {
      const response = await api.get("/listVehicles");
      setVehicles(response.data);
      await fetchDashboard();
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    }
  }

  async function fetchDashboard() {
    try {
      const response = await api.get("/vehiclesDashboard");
      setDashboard(response.data);
    } catch (error) {
      console.error("Erro ao buscar dashboard:", error);
    }
  }

  return (
    <VehicleContext.Provider
      value={{ vehicles, fetchVehicles, dashboard, fetchDashboard }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useVehicle = () => useContext(VehicleContext);
