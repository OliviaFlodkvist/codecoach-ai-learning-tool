import React from "react";

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function PrimaryButton({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={
        `font-michroma inline-flex items-center justify-center rounded-full bg-[#174914] px-8 py-3 text-[#FFF08B] ` +
        `hover:opacity-90 disabled:opacity-60 transition ` +
        className
      }
    >
      {children}
    </button>
  );
}
