export const metadata = {
  title: "PDF Summary and PDF Chatting Tool",
  description:
    "The PDF Summary AI - Your Ultimate PDF Summarization Tool and chatting tool",
};
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";
import CheckLoginProvider from "@/Components/CheckLoginProvider";
import NavbarWrapper from "@/Components/NavbarWrapper";

import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <CheckLoginProvider />{" "}
          {/*it will check weateher the user is login or not  */}
          <NavbarWrapper />{" "}
          {/*inside this the header and MobileHeader is present */}
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </StoreProvider>
      </body>
    </html>
  );
}
