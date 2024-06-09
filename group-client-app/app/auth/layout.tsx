import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2">
      <div>{children}</div>
    </main>
  );
};

export default AuthLayout;
