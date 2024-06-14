import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="justify-center content-centercontainer mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <div>{children}</div>
    </main>
  );
};

export default AuthLayout;
