"use client";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const FloatingChat = () => {
  return (
    <FloatingWhatsApp
      phoneNumber="+447831664124"
      accountName="Xelaris"
      avatar="/logo.png"
      className="text-black"
      statusMessage="Typically responds within 5mins"
    />
  );
};

export default FloatingChat;
