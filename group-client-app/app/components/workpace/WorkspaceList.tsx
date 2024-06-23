import { PaginationResult } from "@/app/shared/domain/pagination.result";
import { UserProps } from "@/app/user/domain/user.props";
import React from "react";
import Image from "next/image";
import { WorkspaceProps } from "@/app/workspace/domain/workspace.props";

type Props = {
  workspaces: WorkspaceProps[];
};

export default function WorkspaceList({ workspaces }: Props) {
  return (
    <div>
      <ul className="max-w-[2000px] divide-y divide-gray-200 dark:divide-gray-700">
        {workspaces.map((workpace) => (
          <li className="py-3 sm:py-4" key={workpace.id}>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-blue-100 rounded-full dark:bg-gray-600">
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
