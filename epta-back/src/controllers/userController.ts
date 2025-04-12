import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    if (await prisma.user.findUnique({ where: { email } })) {
      res.status(400).json({ error: "Email ja cadastrado" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json(userWithoutPassword);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res.status(201).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao listar usuarios" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao remover usuario" });
  }
};
