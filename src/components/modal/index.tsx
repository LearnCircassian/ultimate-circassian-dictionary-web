import { motion } from "framer-motion";
import React from "react";
import { cn } from "~/utils/classNames";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  padding?: number | string;
  closeOnOutsideClick?: boolean;
  className?: string;
  showClose?: boolean;
  unstyled?: boolean;
  closeButtonStyles?: string;
  containerClassName?: string;
}

export default function Modal({
  children,
  isOpen,
  onClose,
  width = "500px",
  closeOnOutsideClick = true,
  padding = 50,
  className,
  showClose = true,
  unstyled = false,
  closeButtonStyles,
  containerClassName,
}: ModalProps) {
  return (
    <>
      {isOpen && (
        <motion.div className={cn("fixed inset-0 z-9999 overflow-y-auto", containerClassName)}>
          <motion.div
            className={cn(
              "overlay fixed left-0 top-0 z-40 flex h-full w-full",
              "items-center justify-center bg-black-main/70 backdrop-blur-lg",
              "z-900",
            )}
            onClick={closeOnOutsideClick ? onClose : () => {}}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.8 }}
          />
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              translateX: "-50%",
              translateY: "-50%",
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              translateX: "-50%",
              translateY: "-50%",
            }}
            transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.4 }}
            className={cn(
              "fixed top-1/2 left-1/2 z-9999 max-w-full",
              !unstyled &&
                "rounded-2xl border border-solid border-white/2 bg-popupBg p-5 shadow-modal",
              className,
            )}
          >
            <div className="flex size-auto items-center">
              <div
                className={cn("relative h-auto w-full")}
                style={!unstyled ? { width, padding } : {}}
              >
                {showClose && !unstyled && (
                  <button
                    className={cn("absolute bg-none outline-none", closeButtonStyles)}
                    onClick={onClose}
                    style={{
                      top: padding,
                      right: padding,
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.758057 11.243L6.00106 6.00002L11.2441 11.243M11.2441 0.757019L6.00006 6.00002L0.758057 0.757019"
                        stroke="#888A8F"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
