import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "LuxTays",
  // description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <div className="container mx-auto py-6 px-4 md:px-36 flex justify-between items-center">
            <div>
              <Image
                src="/images/logo.png"
                alt="Logo"
                className="cursor-pointer w-48"
                width={500}
                height={500}
              />
            </div>
            {/* <button onClick={confirmLogout} className="bg-red-500 px-5 py-2 rounded-[5px] text-white hover:bg-red-600">Logout</button> */}
          </div>
          <hr />
          {children}
        </div>
      </body>
    </html>
  );
}
