import Image from "next/image";
import React from "react";
import { toast, ToastOptions } from "react-toastify";

const toastCustomStyle: React.CSSProperties = {
  padding: 0,
  backdropFilter: "blur(25px)",
  backgroundColor: "rgba(255,255,255,0.01)",
  width: "380px",
  outline: "1px solid rgba(255,255,255,0.25)",
  borderRadius: "8px",
};

const toastCustomBodyStyle: React.CSSProperties = {
  margin: 0,
  padding: "8px",
  width: "405px",
  backgroundColor: "rgba(255,255,255,0.01)",
};

const placeOrderStyle: React.CSSProperties = {
  padding: 0,
  top: 0,
  backdropFilter: "blur(25px)",
  backgroundColor: "rgba(255,255,255,0.01)",
  maxWidth: "403px",
  borderRadius: "16px",
};

const placeOrderBodyStyle: React.CSSProperties = {
  margin: 0,
  padding: "0px !important",
  width: "405px",
  backgroundColor: "rgba(21,24,32,0.7)",
};

export const toastUtil = {
  success: (content: React.ReactNode | string, options?: ToastOptions<{}> | undefined) => {
    toast.success(<ToastContent icon="/toast/toast-success-icon.svg" content={content} />, {
      ...options,
      autoClose: 2500,
      closeButton: false,
      position: "top-center",
    });
  },
  dismiss: () => {
    toast.dismiss();
  },
  customStake: (content: React.ReactNode | string, options?: ToastOptions<{}> | undefined) => {
    toast.dark(content, {
      ...options,
      autoClose: 2500,
      closeButton: false,
      bodyStyle: toastCustomBodyStyle,
      style: toastCustomStyle,
    });
  },
  placeOrder: (content: React.ReactNode | string, options?: ToastOptions<{}> | undefined) => {
    toast.dark(content, {
      ...options,
      autoClose: false,
      closeButton: false,
      closeOnClick: false,
      bodyStyle: placeOrderBodyStyle,
      style: placeOrderStyle,
      position: "bottom-right",
    });
  },
  warn: (content: React.ReactNode | string, options?: ToastOptions<{}> | undefined) => {
    toast.dismiss();
    toast.warn(content, {
      ...options,
      autoClose: 2500,
      closeButton: false,
      position: "top-center",
    });
  },
  error: (content: React.ReactNode | string, options?: ToastOptions<{}> | undefined) => {
    toast.dismiss();
    toast.error(<ToastContent icon="/toast/toast-error-icon.svg" content={content} />, {
      ...options,
      autoClose: 2500,
      closeButton: false,
      position: "top-center",
    });
  },
};

const ToastContent = ({ icon, content }: { icon: string; content: React.ReactNode }) => {
  return (
    <div className="flex gap-3">
      <Image width={24} height={24} src={icon} alt="toast-icon" />
      <span className="flex items-center justify-center font-medium">{content}</span>
    </div>
  );
};
