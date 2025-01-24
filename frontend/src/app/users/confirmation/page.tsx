"use client";
import React, { useState, useEffect } from "react";
import useHttpClient from "@/app/api/httpClient";
import endpoints from "@/app/api/endpoints";
import { useRouter, useSearchParams } from 'next/navigation';

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const confirmation_token = searchParams?.get('confirmation_token');

  const [status, setStatus] = useState('Validation en cours...');
  const { get } = useHttpClient();

  useEffect(() => {
    let isRequestSent = false;

    const confirmEmail = async () => {
      if (isRequestSent) return; 
      isRequestSent = true;

      const { data, error }: { data?: any; error?: any } = await get(endpoints.confirmation(confirmation_token));
      if (data) {
        setStatus('Email confirmé avec succès ! Vous serez redirigé vers la page de connexion...');
        setTimeout(() => {
          router.push('/login');
        }, 5000);
      } else {
        setStatus('Erreur lors de la validation : ' + error.errors[0]);
      }
    };

    confirmEmail();

    return () => {
      isRequestSent = false;
    };
  }, [confirmation_token, get, router]);

  return <div className="h-screen w-full flex justify-center items-center">{status}</div>;
}
