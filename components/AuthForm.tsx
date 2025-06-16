"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { register as registerUser, login as loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-store";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof formSchema>;

interface AuthFormProps {
  type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      if (type === "register") {
        await registerUser(data);
        toast.success("Register successful! Please log in.");
        router.push("/auth/login");
      } else {
        await loginUser(data);
        toast.success("Login successful!");
        setIsLoggedIn(true);
        router.push("/");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-16 px-8 py-10 bg-white border border-gray-200 shadow-lg rounded-2xl space-y-6"
    >
      <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-4">
        {type === "login" ? "Welcome Back" : "Create an Account"}
      </h2>

      {/* Email */}
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          {...register("password")}
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-60"
      >
        {loading
          ? type === "login"
            ? "Logging in..."
            : "Registering..."
          : type === "login"
          ? "Login"
          : "Register"}
      </button>

      {/* Footer hint */}
      <p className="text-center text-sm text-gray-500 mt-4">
        {type === "login"
          ? "Don't have an account? "
          : "Already have an account? "}
        <span
          onClick={() =>
            router.push(type === "login" ? "/auth/register" : "/auth/login")
          }
          className="text-blue-600 font-medium hover:underline cursor-pointer"
        >
          {type === "login" ? "Register" : "Login"}
        </span>
      </p>
    </form>
  );
}
