import Image from "next/image";
import React from "react";
import { toast, ToastOptions } from "react-toastify";

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
