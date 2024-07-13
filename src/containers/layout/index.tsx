import "react-toastify/dist/ReactToastify.css";
import React, { ReactNode } from "react";
import { cn } from "~/utils/classNames";
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
      <div data-test-id="layout-container h-screen" className="flex">
        <div className="relative flex w-full flex-row justify-center">
          <section className={cn("flex flex-col w-full")}>
            <div id="profile-bg" className="absolute inset-x-0 top-0 overflow-hidden" />
            <div id="contribute-bg" className="absolute inset-x-0 top-0 " />
            <div data-test-id="layout">{children}</div>
          </section>
        </div>
      </div>
    </>
  );
}
