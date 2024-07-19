import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "~/components/toast/toastStyles.css";
import "~/styles/toastify.scss";
import "#/fonts/roboto-mono/style.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Head from "next/head";
import { ModalContainer, ModalProvider } from "~/hooks/useModal";
import Layout from "~/containers/layout";
import { ToastContainer } from "react-toastify";
import { store } from "~/state/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

function InnerApp({ Component, pageProps }: any) {
  const headContent = (
    <Head>
      {/* <!-- Allow web app to be run in full-screen mode - iOS. --> */}
      <meta name="apple-mobile-web-app-capable" content="yes" />

      {/* <!-- Allow web app to be run in full-screen mode - Android. --> */}
      <meta name="mobile-web-app-capable" content="yes" />

      {/* <!-- Make the app title different from the page title - iOS. --> */}
      <meta name="apple-mobile-web-app-title" content="Mobile web app title" />

      {/* <!-- Make the app title different from the page title and configure icons - Android. --> */}

      {/* <!-- IE configuration for icons and colors is in browserconfig.xml --> */}

      {/* <!-- Configure the status bar - iOS. --> */}
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      <meta name="theme-color" content="#0b0c13" />

      <link rel="manifest" href="/manifest.json" />

      {/* <!-- Set the viewport. --> */}
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, viewport-fit=cover"
      />

      {/* <!-- Disable automatic phone number detection. --> */}
      <meta name="format-detection" content="telephone=no" />

      <link rel="icon" href="/fav/favicon.ico" sizes="any" />
    </Head>
  );

  return (
    <>
      {headContent}
      <ModalContainer />
      <div>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            autoClose={7000}
            newestOnTop={true}
            draggable={false}
            hideProgressBar={true}
          />
        </Layout>
      </div>
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <InnerApp {...props} />
        </ModalProvider>
      </QueryClientProvider>
    </Provider>
  );
}
