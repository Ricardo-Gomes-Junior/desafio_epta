import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../assets/epta-logo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { api } from "../services/api";

const registerSchema = z
  .object({
    name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await api.post("/registerUser", data);

      toast.success("Conta criada com sucesso!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "Erro ao cadastrar usuário:",
        error.response?.data || error.message,
      );
      toast.error("Erro ao criar conta. Verifique os dados.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-4xl bg-gray-100 p-8">
        <img src={logo} alt="logo" className="h-[44px] w-[157px]" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-sm flex-col"
        >
          <h3 className="mt-2 mb-10 text-center text-sm text-gray-500">
            Crie sua conta. É rápido e fácil!
          </h3>

          <label className="mb-1 block text-sm font-semibold" htmlFor="name">
            Nome completo
          </label>
          <input
            {...register("name")}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="text"
            placeholder="Digite seu nome"
          />
          {errors.name && (
            <span className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </span>
          )}

          <label
            className="mt-5 mb-1 block text-sm font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email")}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="email"
            placeholder="Digite seu email"
          />
          {errors.email && (
            <span className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </span>
          )}

          <label
            className="mt-5 mb-1 block text-sm font-semibold"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            {...register("password")}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="password"
            placeholder="Crie uma senha"
          />
          {errors.password && (
            <span className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </span>
          )}

          <label
            className="mt-5 mb-1 block text-sm font-semibold"
            htmlFor="confirmPassword"
          >
            Confirmar senha
          </label>
          <input
            {...register("confirmPassword")}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="password"
            placeholder="Confirme a senha"
          />
          {errors.confirmPassword && (
            <span className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}

          <button
            type="submit"
            className="mt-6 mb-20 w-full rounded-lg bg-blue-600 py-2 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700"
          >
            Criar conta
          </button>

          <h3 className="text-center text-sm text-gray-700">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-blue-600">
              Entrar
            </Link>
          </h3>
        </form>
      </div>
    </div>
  );
}
