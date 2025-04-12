import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { registerVehicle } from "../services/vehicle";
import { toast } from "react-toastify";
import { VehicleResponse } from "../components/Table";
import { useEffect } from "react";
import { api } from "../services/api";
import { useVehicle } from "../context/vehicleContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const plateRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

const vehicleSchema = z.object({
  plate: z
    .string()
    .toUpperCase()
    .regex(plateRegex, "Placa inválida. Use o formato ABC1234 ou ABC1D23"),
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
});

type LoginFormData = z.infer<typeof vehicleSchema>;

interface DialogCreateOrEditVehicleProps {
  children: React.ReactNode;
  vehicle?: VehicleResponse;
  onSuccess?: () => void;
}

export function CreateOrEditVehicle({
  children,
  vehicle,
  onSuccess,
}: DialogCreateOrEditVehicleProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      plate: vehicle?.plate,
      name: vehicle?.name,
    },
    resolver: zodResolver(vehicleSchema),
  });

  useEffect(() => {
    if (vehicle) {
      reset({
        plate: vehicle.plate,
        name: vehicle.name,
      });
    }
    return () => {};
  }, [reset, vehicle]);

  const { fetchVehicles } = useVehicle();
  const onSubmit = async (data: LoginFormData) => {
    try {
      if (vehicle) {
        await api.put(`/editVehicle/${vehicle.id}`, {
          plate: data.plate.toUpperCase(),
          name: data.name.toUpperCase(),
        });
        toast.success("Veículo editado com sucesso!");
        onSuccess?.();

        return;
      } else {
        await registerVehicle({
          plate: data.plate.toUpperCase(),
          name: data.name.toUpperCase(),
        });
      }

      toast.success("Veículo cadastrado com sucesso!");
      fetchVehicles();

      reset();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar veículo.");
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
          <Dialog.Title className="mb-2 text-lg font-bold">
            {vehicle ? "Editar Veículo" : "Cadastrar Veículo"}
          </Dialog.Title>
          <div className="text-sm text-gray-500">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="block text-sm font-semibold">
                  Nome do veículo:
                </label>
                <input
                  {...register("name")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  type="text"
                  placeholder="Ford Ka"
                  required
                />
                <span className="text-xs text-red-500">
                  {errors.name?.message}
                </span>
              </div>

              <div>
                <label className="block text-sm font-semibold">Placa:</label>
                <input
                  {...register("plate")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  type="text"
                  placeholder="QYY1234"
                  required
                />
                <span className="text-xs text-red-500">
                  {errors.plate?.message}
                </span>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700"
              >
                {vehicle ? "Editar" : "Cadastrar"}
              </button>
            </form>
          </div>
          <Dialog.Close className="absolute top-4 right-4 text-sm text-gray-400 hover:text-black">
            Fechar
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
