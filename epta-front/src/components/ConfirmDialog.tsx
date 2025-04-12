import * as Dialog from "@radix-ui/react-dialog";
import { VehicleResponse } from "./Table";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useState } from "react";

type ConfirmDialogProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  vehicle: VehicleResponse;
  type: "archive" | "delete" | "unarchive";
  onConfirm: () => void;
};

export function ConfirmDialog({
  title,
  description,
  children,
  vehicle,
  onConfirm,
  type,
}: ConfirmDialogProps) {
  async function handleAction() {
    if (type === "delete") {
      const response = await api.delete(
        `http://localhost:3333/deleteVehicle/${vehicle.id}`,
      );
      if (response.status === 204) {
        toast.success("Veículo excluído com sucesso!");
        onConfirm?.();
        setOpen(false);
      }
      return;
    }
    if (vehicle.status === "ativo") {
      const response = await api.patch(
        `http://localhost:3333/archiveVehicle/${vehicle.id}`,
      );
      if (response.status === 200) {
        toast.success("Veículo inativado com sucesso!");
        onConfirm?.();
        setOpen(false);
      }
    } else {
      const response = await api.patch(
        `http://localhost:3333/unarchiveVehicle/${vehicle.id}`,
      );
      if (response.status === 200) {
        toast.success("Veículo reativado com sucesso!");
        onConfirm?.();
        setOpen(false);
      }
    }
  }

  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
          <Dialog.Title className="mb-4 text-lg font-semibold">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-6 text-gray-700">
            {description}
          </Dialog.Description>
          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Cancelar
              </button>
            </Dialog.Close>

            <button
              onClick={handleAction}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Confirmar
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
