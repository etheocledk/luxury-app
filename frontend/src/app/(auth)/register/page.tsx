
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useHttpClient from "@/app/api/httpClient";
import endpoints from "@/app/api/endpoints";
import useToast from "@/app/api/toast";
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";

export default function Register() {

  const { post } = useHttpClient();
  const showToast = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      showToast("Veuillez remplir tous les champs.", "error");
      setIsSubmitting(false);
      return;
    }

    const { data, error }: { data?: any, error?: any } = await post(endpoints.register(), { user: { email, password, password_confirmation: confirmPassword, role_id:2 } });
    if (data) {
      setIsSubmitting(false);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      showToast("Nous avons envoyé un e-mail de confirmation. Veuillez vérifier votre boîte de réception et suivre les instructions pour activer votre compte.", "success");
    } else {
      setIsSubmitting(false);
      if (error && error.status && error.status.errors) {
        showToast(error.status.errors[0], "error");
      } else {
        showToast("Une erreur est survenue. Veuillez réessayer.", "error");
      }
    }
  };


  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <p className="text-gray-600 text-lg">Create your account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {isSubmitting ? "Enegistrement en cours..." : "S'inscrire"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
