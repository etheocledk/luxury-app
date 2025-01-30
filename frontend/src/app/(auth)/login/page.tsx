"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useHttpClient from "@/app/api/httpClient";
import endpoints from "@/app/api/endpoints";
import useToast from "@/app/api/toast";
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";

export default function Login() {
  const { post } = useHttpClient();
  const showToast = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token != null) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (!email.trim() || !password.trim()) {
      showToast("Veuillez remplir tous les champs.", "error");
      setIsSubmitting(false);
      return;
    }
    const { data, error }: { data?: any, error?: any } = await post(endpoints.login(), { user: { email, password } });
    if (data) {
      setIsSubmitting(false);
      localStorage.setItem("token", data.status.data.token);
      showToast("Connexion effectuée avec succès !", "success");
      setEmail("");
      setPassword("");
      router.push("/");
    } else {
      setIsSubmitting(false);
      if (error) {
        showToast(error, "error");
      } else {
        showToast("Une erreur est survenue. Veuillez réessayer.", "error");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <p className="text-gray-600 text-lg">Connectez-vous à votre compte</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Entrez votre email"
          />
        </div>
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="block text-gray-700">
              Mot de passe
            </label>
            <a
              href="/request-password-reset"
              className="text-blue-600 text-sm hover:underline"
            >
              Mot de passe oublié ?
            </a>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Entrez votre mot de passe"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded-lg text-white ${isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
            }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-700">
          Vous n'avez pas de compte ?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Inscrivez-vous
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
