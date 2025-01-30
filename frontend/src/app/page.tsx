"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useHttpClient from "@/app/api/httpClient";
import endpoints from "@/app/api/endpoints";
import useToast from "@/app/api/toast";
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";

export default function Home() {

  const router = useRouter();
  const { del } = useHttpClient();
  const showToast = useToast();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     router.push("/login");
  //   }
  // }, [router]);

  const handleLogout = async () => {

    const response = await del(endpoints.logout());
    if(response){
      localStorage.removeItem("token");
      showToast("Déconnexion effectuée avec succès !", "success");
      router.push("/login");
    }
  };

  const confirmLogout = () => {
    showToast(
      <div>
        <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
        <div className="flex justify-end mt-2">
          <button
            className="mr-2 px-4 py-2 bg-red-600 text-white rounded"
            onClick={handleLogout}
          >
            Oui
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded"
            onClick={() => toast.dismiss()}
          >
            Non
          </button>
        </div>
      </div>,
      "info", 
      { autoClose: false }
    );
  };

  return (
    <div>
      
      <div className="container mx-auto py-4 px-4 md:px-36">
        <h2 className="text-[25px] md:text-[50px] font-[600] mt-10">Discover and Explore <br /> Australia’s Best Accommodation</h2>

        <div className="mt-6 bg-white shadow-md p-2 rounded-[5px] relative">
          <input type="search" placeholder="Try searching for a beach e.g. Narrabeen" className="pl-5 rounded-[5px] border border-transparent h-12 outline-none w-[100%]"></input>
          <div className="bg-black h-10 rounded-[8px] absolute top-[12px] right-[10px] flex justify-center items-center">
            <button className="text-white w-[100%] rounded-[5px] px-2 font-md">Search</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-4 px-4 md:px-36 m-12">
        <h2 className="text-[12px] md:text-[24px] font-[600]">Featured Stays</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          <div>
            <Image src="/images/img1.jpeg" alt="Image" width={500} height={500} className="rounded-[12px] w-full h-[250px] object-cover" />
            <h2 className="font-[600] mt-2">Manly Beach</h2>
            <span className="mt-2">Manly, NSW</span>
          </div>
          <div>
            <Image src="/images/img2.jpeg" alt="Image" width={500} height={500} className="rounded-[12px] w-full h-[250px]" />
            <h2 className="font-[600] mt-2">Manly Beach</h2>
            <span className="mt-2">Manly, NSW</span>
          </div>
          <div>
            <Image src="/images/img3.jpeg" alt="Image" width={500} height={500} className="rounded-[12px] w-full h-[250px]" />
            <h2 className="font-[600] mt-2">Manly Beach</h2>
            <span className="mt-2">Manly, NSW</span>
          </div>
          <div>
            <Image src="/images/img4.jpeg" alt="Image" width={500} height={500} className="rounded-[12px] w-full h-[250px]" />
            <h2 className="font-[600] mt-2">Manly Beach</h2>
            <span className="mt-2">Manly, NSW</span>
          </div>
          <div>
            <Image src="/images/img5.jpeg" alt="Image" width={500} height={500} className="rounded-[12px] w-full h-[250px]" />
            <h2 className="font-[600] mt-2">Manly Beach</h2>
            <span className="mt-2">Manly, NSW</span>
          </div>
          <div>
            <Image src="/images/img6.jpeg" alt="Image" width={500} height={500} className="rounded-[12px] w-full h-[250px]" />
            <h2 className="font-[600] mt-2">Manly Beach</h2>
            <span className="mt-2">Manly, NSW</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}