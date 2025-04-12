import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerVehicle = async (req: Request, res: Response) => {
  const { plate, name, status } = req.body;
  console.log(req.body);

  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        plate,
        name,
        status,
      },
    });

    res.status(201).json(vehicle);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao cadastrar veiculo" });
  }
};

export const listVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      select: {
        id: true,
        plate: true,
        name: true,
        status: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(vehicles);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao buscar veiculos" });
  }
};

export const editVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { plate, name, status } = req.body;

  try {
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        plate,
        name,
        status,
      },
    });

    res.status(200).json(vehicle);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao editar veículo" });
  }
};

export const archiveVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: { status: "inativo" },
    });

    res.status(200).json(vehicle);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao arquivar veiculo" });
  }
};

export const unarchiveVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: { status: "ativo" },
    });

    res.status(200).json(vehicle);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao desarquivar veiculo" });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.vehicle.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao remover veiculo" });
  }
};

export const vehiclesDashboard = async (req: Request, res: Response) => {
  try {
    const totalVehicles = await prisma.vehicle.count();
    const activeVehicles = await prisma.vehicle.count({
      where: { status: "ativo" },
    });
    const inactiveVehicles = await prisma.vehicle.count({
      where: { status: "inativo" },
    });

    res.status(200).json({
      totalVehicles,
      activeVehicles,
      inactiveVehicles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao buscar veiculos" });
  }
};
