"use client";

import React, { useState, useEffect } from "react";
import useHttpClient from "@/app/api/httpClient";
import endpoints from "@/app/api/endpoints";
import useToast from "@/app/api/toast";
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';

export default function RequestPasswordReset() {
  const [email, setEmail] = useState("");
  const { post } = useHttpClient();
  const showToast = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { data, error } = await post(endpoints.requestPasswordReset(), {
      user: { email },
    });

    if (!error) {
      setIsSubmitting(false);
      showToast(
        "Un email de réinitialisation a été envoyé. Vérifiez votre boîte de réception.", "success"
      );
    } else {
      setIsSubmitting(false);
      showToast("Une erreur est survenue. Veuillez réessayer.", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <p className="text-gray-600 text-md">
          Enter your address email to receive a password reset link.
        </p>
      </div>
      <form onSubmit={handleRequestReset}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter your email"
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
          {isSubmitting ? "Demande en cours..." : " Send Reset Link"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-700">
          Remember your password?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}