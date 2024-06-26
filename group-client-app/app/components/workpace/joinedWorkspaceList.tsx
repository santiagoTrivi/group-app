import React, { useState } from "react";
import { WorkspaceProps } from "@/app/workspace/domain/workspace.props";
import { useJoinedWorkspaceStore } from "@/app/hooks/joinedworkspace";
import { useRouter } from "next/navigation";

type Props = {
  workspaces: WorkspaceProps[];
};

export default function JoinedWorkspaceList({ workspaces }: Props) {
  const router = useRouter();
  const { joined_workspace_selected, setJoinedWorkspace } =
    useJoinedWorkspaceStore();
  const [isHidden, setIsHidden] = useState(false);
  const HandleHidden = () => {
    setIsHidden(!isHidden);
  };

  console.log(joined_workspace_selected);

  const handleSelectWorkspace = async (workspace: WorkspaceProps) => {
    setJoinedWorkspace(workspace);
    router.push("/chat/");
  };

  return (
    <>
      <button
        id="multiLevelDropdownButton"
        data-dropdown-toggle="multi-dropdown"
        className="flex items-center p-2 text-sm text-blue-800 bg-blue-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        type="button"
        onClick={HandleHidden}
      >
        Mi Participacion
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="multi-dropdown"
        className={`z-10 ${
          isHidden ? "" : "hidden"
        } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="multiLevelDropdownButton"
        >
          {workspaces.map((workspace) => (
            <li key={workspace.id}>
              <button
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleSelectWorkspace(workspace)}
              >
                {workspace.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
