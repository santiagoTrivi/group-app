import React, { useState } from "react";
import { WorkspaceProps } from "@/app/workspace/domain/workspace.props";
import { useSession } from "next-auth/react";
import { useJoinedWorkspaceStore } from "@/app/hooks/joinedworkspace";

type Props = {
  workspaces: WorkspaceProps[];
};

export default function JoinedWorkspaceList({ workspaces }: Props) {
  const { joined_workspace_selected, setJoinedWorkspace } =
    useJoinedWorkspaceStore();
  const { data: session } = useSession();

  console.log(joined_workspace_selected);

  const handleSelectWorkspace = async (workspace: WorkspaceProps) => {
    setJoinedWorkspace(workspace);
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
                {joined_workspace_selected &&
                joined_workspace_selected.id === workpace.id ? (
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
