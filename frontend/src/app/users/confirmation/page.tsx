"use client";
import React, { useState, useEffect } from "react";
import useHttpClient from "@/app/api/httpClient";
import endpoints from "@/app/api/endpoints";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheck, FaTimes } from 'react-icons/fa'; 

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const confirmation_token = searchParams?.get("confirmation_token");

  const [statusContent, setStatusContent] = useState("Validation en cours...");
  const [status, setStatus] = useState("pending");
  const [attempts, setAttempts] = useState(0);
  const { get } = useHttpClient();

  useEffect(() => {
    let isRequestSent = false;

    const confirmEmail = async () => {
      if (isRequestSent || attempts >= 1) return;
      isRequestSent = true;

      setAttempts((prevAttempts) => prevAttempts + 1);

      const { data, error }: { data?: any; error?: any } = await get(
        endpoints.confirmation(confirmation_token)
      );

      if (data) {
        setStatus("success");
        setStatusContent(
          "Email confirmé avec succès ! Vous serez redirigé vers la page de connexion..."
        );
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } else {
        setStatus("failed");
        setStatusContent(
          "Validation échouée après plusieurs tentatives. Actualisez la page pour réessayer."
        );
      }
    };

    confirmEmail();

    return () => {
      isRequestSent = false;
    };
  }, [confirmation_token, attempts, get, router]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4">
          {status === "failed" ? (
            <FaTimes className="text-red-500 text-4xl" />
          ) : status === "success" ? (
            <FaCheck className="text-green-500 text-4xl" />
          ) : (
            ""
          )}
        </div>

        <p>{statusContent}</p>
      </div>
    </div>
  );
}
