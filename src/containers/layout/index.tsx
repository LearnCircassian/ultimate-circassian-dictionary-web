import "react-toastify/dist/ReactToastify.css";
import React, { ReactNode } from "react";
import Header from "~/containers/header";

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div data-test-id="main-header z-50">
        <div className="z-50 w-full">
          <Header />
        </div>
      </div>
      <div className="bg-image flex h-screen">
        <div className="relative flex w-full flex-row justify-center">{children}</div>
      </div>
    </>
  );
}
