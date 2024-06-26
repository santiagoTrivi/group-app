"use client";
import { ReactNode, useEffect } from "react";
import { useState } from "react";
import { useWorkspaceStore } from "../hooks/store";
import { MyWorkspaceMembers } from "../components/workpace/myWorkspaceMembers";
import { useSession } from "next-auth/react";
import { WorkspaceRepository } from "../workspace/service/workspace.respository";
import { Pagination } from "../shared/domain/pagination";
import JoinedWorkspaceList from "../components/workpace/joinedWorkspaceList";
import { useJoinedWorkspaceStore } from "../hooks/joinedworkspace";
import { UserProps } from "../user/domain/user.props";

const RootChat = ({ children }: { children: ReactNode }) => {
  const [isHidden, setIsHidden] = useState(false);
  const { workspace_stored } = useWorkspaceStore();
  const [joinedworkspaces, setjoinedworkspace] = useState([]);
  const { data: session } = useSession();
  const [members, setMembers] = useState<UserProps[]>([]);
  const { joined_workspace_selected } = useJoinedWorkspaceStore();

  const HandleHidden = () => {
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        const res = await WorkspaceRepository().getMembers(
          new Pagination({ page: 1, limit: 30 }),
          joined_workspace_selected?.id as string,
          session?.user?.accessToken as string
        );
        console.log(res);
        setMembers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getWorkspaces();
  }, [session, joined_workspace_selected]);

  return (
    <div className="">
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={HandleHidden}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <a
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-4"
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

          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="multiLevelDropdownButton"
          >
            {members.map((member) => (
              <li key={member.id}>
                <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {member.firstName} {member.lastName}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {children}
    </div>
  );
};

export default RootChat;
