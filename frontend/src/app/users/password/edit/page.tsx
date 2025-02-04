"use client";
import Image from "next/image";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useHttpClient from "@/app/api/httpClient";
import useToast from "@/app/api/toast";
import endpoints from "@/app/api/endpoints";
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";

export default function ResetPassword() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const resetPasswordToken = searchParams?.get("reset_password_token");

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const showToast = useToast();

    const { put } = useHttpClient();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { data, error }: { data?: any; error?: any } = await put(endpoints.resetPassword(), {
            user: {
                reset_password_token: resetPasswordToken,
                password: password,
                password_confirmation: passwordConfirmation,
            },
        });

        if (data) {
            setIsSubmitting(false);
            showToast(
                "Mot de passe changé avec succès !", "success"
            );
            setTimeout(() => {
                router.push("/login");
            }, 2000);
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
        <div className="bg-[#f9f9f9] min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className='flex justify-center mb-5'>
                    <Image src="/images/logo.png" alt="Logo" className="cursor-pointer w-48" width={500} height={500} />
                </div>
                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <div className="text-center mb-6">
                        <p className="text-gray-600 text-md">
                            Set your new password below
                        </p>
                    </div>
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-4">
                            <label className="block text-gray-700">New Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter your new password"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700">Confirm New Password</label>
                            <input
                                type="password"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Confirm your new password"
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
                            {isSubmitting ? "Changement en cours..." : " Reset Password"}
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
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
