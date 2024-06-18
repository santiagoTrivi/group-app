import { ReactNode } from "react";

export default function Auth({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        {children}
      </div>
    </div>
  );
}
