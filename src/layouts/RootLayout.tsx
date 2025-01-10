import { Outlet } from "react-router-dom";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const RootLayout = () => {
  return (
    <>
      <Outlet />
      <WhatsAppButton />
    </>
  );
};