"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SessionMenu from "../user/sessionMenu";

export default function Header() {
  const { data: session } = useSession();
  const currentPage = usePathname();

  return (
    <nav className={`top-0 z-50 transition-shadow ${"shadow-none"}`}>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          href="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Groups</span>
        </a>

        <div className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {session?.user ? (
            <>
              <SessionMenu />
            </>
          ) : (
            <>
              {currentPage === "/auth/login" && (
                <>
                  <a
                    className="mr-5 hover:text-gray-900"
                    href="https://github.com/santiagoTrivi/group-app"
                  >
                    Repo
                  </a>
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                  >
                    Registrate
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </>
              )}
              {(currentPage === "/auth/register" || currentPage === "/") && (
                <>
                  <a
                    className="mr-5 hover:text-gray-900"
                    href="https://github.com/santiagoTrivi/group-app"
                  >
                    Repo
                  </a>
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                  >
                    Iniciar
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
