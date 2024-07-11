import { PaginationResult } from "@/app/shared/domain/pagination.result";
import { UserProps } from "@/app/user/domain/user.props";
import React, { useState } from "react";
import Image from "next/image";
import { WorkspaceRepository } from "@/app/workspace/service/workspace.respository";
import { useWorkspaceStore } from "@/app/hooks/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  users: UserProps[];
};

export default function UsersList({ users }: Props) {
  const { workspace_stored, setworkspace } = useWorkspaceStore();
  const [errors, setErrors] = useState<string>("");
  const [newOne, setNewOne] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();
  const handleAddMember = async (userId: string) => {
    setErrors("");
    if (!workspace_stored) {
      setErrors("No hay un workspace activo");
      return;
    }
    const res = await WorkspaceRepository().addMember(
      workspace_stored.id,
      userId,
      session?.user?.accessToken as string
    );

    if (!res.ok) {
      const apiRes = await res.json();
      console.log(apiRes);
      if (apiRes.statusCode)
        setErrors("algo salio mal, por favor intenta de nuevo");
      return;
    }
    setNewOne(!newOne);
  };

  return (
    <div>
      <div>
        {errors ? (
          <div>
            <div className="relative">
              <input
                type="text"
                id="outlined_error"
                aria-describedby="outlined_error_help"
                className="block px-2.5 pb-2.5  w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                placeholder=" "
              />
            </div>
            <p
              id="outlined_error_help"
              className="mt-2 text-xs text-red-600 dark:text-red-400"
            >
              <span className="font-medium">Oh,</span> {errors}
            </p>
          </div>
        ) : null}
      </div>
      <ul className="max-w-[2000px] divide-y divide-gray-200 dark:divide-gray-700">
        {users.map((user) => (
          <li className="py-3 sm:py-4" key={user.id}>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-blue-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-blue-800 dark:text-gray-300">
                    {user.firstName[0].toLocaleUpperCase() +
                      user.lastName[0].toLocaleUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <button
                  onClick={() => {
                    handleAddMember(user.id);
                  }}
                  className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <span className="px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Añadir
                  </span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {newOne ? (
        <div
          id="alert-3"
          className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium">
            Nuevo usuario añadido exitosamente a {workspace_stored?.name}
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-3"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
