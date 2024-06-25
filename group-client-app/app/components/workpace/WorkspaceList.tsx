import { PaginationResult } from "@/app/shared/domain/pagination.result";
import { UserProps } from "@/app/user/domain/user.props";
import React, { useState } from "react";
import Image from "next/image";
import { WorkspaceProps } from "@/app/workspace/domain/workspace.props";
import { cookies } from "next/headers";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { useWorkspaceStore } from "@/app/hooks/store";
import { WorkspaceRepository } from "@/app/workspace/service/workspace.respository";
import { Pagination } from "@/app/shared/domain/pagination";
import { useSession } from "next-auth/react";
import { useWorkspaceMembersStore } from "@/app/hooks/workspaceMembers";

type Props = {
  workspaces: WorkspaceProps[];
};

export default function WorkspaceList({ workspaces }: Props) {
  const { workspace_stored, setworkspace } = useWorkspaceStore();
  const { data: session } = useSession();

  console.log(workspace_stored);

  const handleSelectWorkspace = async (workspace: WorkspaceProps) => {
    setworkspace(workspace);

    const res = await WorkspaceRepository().getMembers(
      new Pagination({ page: 1, limit: 50 }),
      workspace_stored?.id as string,
      session?.user?.accessToken as string
    );

    const members: UserProps[] = res.data;
    console.log("got members", members);
  };

  return (
    <div>
      <ul className="max-w-[2000px] divide-y divide-gray-200 dark:divide-gray-700">
        {workspaces.map((workpace) => (
          <li className="py-3 sm:py-4" key={workpace.id}>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-blue-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-blue-800 dark:text-gray-300">
                    {workpace.name[0].toLocaleUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {workpace.name}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {workspace_stored && workspace_stored.id === workpace.id ? (
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                    En uso
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      handleSelectWorkspace(workpace);
                    }}
                    className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  >
                    <span className="px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Abrir
                    </span>
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
