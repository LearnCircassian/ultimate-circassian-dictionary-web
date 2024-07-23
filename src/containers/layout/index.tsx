import "react-toastify/dist/ReactToastify.css";
import React, { ReactNode } from "react";
import { cn } from "~/utils/classNames";
import Header from "~/containers/header";
import { Footer } from "~/containers/homePage";

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div data-test-id="main-header">
        <Header />
      </div>
      <main className="flex-grow">
        <div data-test-id="layout-container h-screen" className="flex">
          <div className="relative flex w-full flex-row justify-center">
            <section className={cn("flex flex-col w-full")}>
              <div id="profile-bg" className="absolute inset-x-0 top-0 overflow-hidden" />
              <div id="contribute-bg" className="absolute inset-x-0 top-0 " />
              <div data-test-id="layout">{children}</div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
