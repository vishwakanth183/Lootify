"use client";

import { Poppins } from "next/font/google";
import ".././src/shared/scss/appbar.scss";
import "./globals.css";
import ReduxLayout from "./ReduxLayout";

const poppins = Poppins({
  weight: "200",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxLayout>{children}</ReduxLayout>
      </body>
    </html>
  );
}
