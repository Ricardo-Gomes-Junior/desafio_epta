import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../assets/epta-logo.png";
import carro from "../assets/car-24.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const authContext = useAuth();

  const { setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post("http://localhost:3333/login", data);
      if (response.status !== 200) {
        toast.error("Email ou senha incorretos. Tente novamente!");
        return;
      }

      const { token, name } = response.data;
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("username", name);

      toast.success("Login realizado com sucesso!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "Erro ao fazer login:",
        error.response?.data || error.message,
      );
      toast.error("Email ou senha incorretos. Tente novamente!");
    }
  };

  useEffect(() => {
    if (!!token && authContext.isTokenValid(token)) {
      navigate("/dashboard");
    }
  }, [token, authContext, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="mx-auto flex h-[650px] w-[1080px] content-center rounded-xl">
        <div className="flex w-1/2 flex-col items-center justify-center rounded-l-4xl bg-gray-100 p-8">
          <img src={logo} alt="logo" className="h-[44px] w-[157px]" />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-sm flex-col"
          >
            <h3 className="mt-2 mb-10 text-center text-sm text-gray-500">
              Bem-vindo de volta! Insira seus dados.
            </h3>

            <label className="mb-1 block text-sm font-semibold" htmlFor="email">
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
              placeholder="Digite sua senha"
            />
            {errors.password && (
              <span className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </span>
            )}

            <button
              type="submit"
              className="mt-6 mb-20 w-full rounded-lg bg-blue-600 py-2 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700"
            >
              Entrar
            </button>

            <h3 className="text-center text-sm text-gray-700">
              Não tem uma conta?{" "}
              <Link to="/register" className="text-blue-600">
                Cadastre-se gratuitamente!
              </Link>
            </h3>
          </form>
        </div>
        <div className="flex w-1/2 rounded-r-4xl bg-blue-300">
          <img src={carro} alt="imagem carro" />
        </div>
      </div>
    </div>
  );
}
