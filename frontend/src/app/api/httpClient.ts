import { useState } from "react";
import axios, { Method } from "axios";
import useToast from "./toast";
import baseUrl from "./baseUrl";

type HttpClientConfig = {
  BASE_URL?: string;
  headers?: {
    "Content-Type"?: string;
    Authorization?: string;
    "Access-Control-Allow-Origin"?: string;
    Accept?: string;
  };
};

// const showToast = useToast();

const useHttpClient = (
  config: HttpClientConfig = { BASE_URL: baseUrl }
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const token = localStorage.getItem("token");

  // if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  // }

  const request = async <T>(
    url: string,
    method: Method = "GET",
    body: any = null
  ) => {
    setLoading(true);
    setError(null);
    let data: T | null = null;

    try {
      const response = await axios.request<T>({
        url,
        method,
        baseURL: config.BASE_URL,
        headers: config.headers,
        data: body,
      });
      data = response.data;
    } catch (e: any) {
      const errorMessage =
        e.response?.data || e;
      // showToast(errorMessage, "error");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }

    return { data, error, loading };
  };

  const get = async <T>(url: string) => {
    return await request<T>(url, "GET");
  };

  const post = async <T>(url: string, body: any) => {
    return await request<T>(url, "POST", body);
  };

  const put = async <T>(url: string, body: any) => {
    return await request<T>(url, "PUT", body);
  };

  const del = async <T>(url: string) => {
    return await request<T>(url, "DELETE");
  };

  const patch = async <T>(url: string, body: any) => {
    return await request<T>(url, "PATCH", body);
  };

  return { get, post, put, del, patch, loading, error };
};

export default useHttpClient;