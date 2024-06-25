import { PaginationResult } from "@/app/shared/domain/pagination.result";
import { UserProps } from "@/app/user/domain/user.props";
import React, { useState } from "react";
import Image from "next/image";
import { WorkspaceRepository } from "@/app/workspace/service/workspace.respository";
import { useWorkspaceStore } from "@/app/hooks/store";
import { useSession } from "next-auth/react";

type Props = {
  users: UserProps[];
};

export default function UsersList({ users }: Props) {
  const { workspace_stored, setworkspace } = useWorkspaceStore();
  const [errors, setErrors] = useState<string>("");
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
    </div>
  );
}
