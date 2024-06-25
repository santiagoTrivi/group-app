import { useWorkspaceStore } from "@/app/hooks/store";
import { Pagination } from "@/app/shared/domain/pagination";
import { UserProps } from "@/app/user/domain/user.props";
import { WorkspaceRepository } from "@/app/workspace/service/workspace.respository";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Props = {
  title: string;
};

export const MyWorkspaceMembers = ({ title }: Props) => {
  const [isHidden, setIsHidden] = useState(false);
  const [members, setMembers] = useState<UserProps[]>([]);
  const { workspace_stored } = useWorkspaceStore();
  const { data: session } = useSession();
  const HandleHidden = () => {
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        const res = await WorkspaceRepository().getMembers(
          new Pagination({ page: 1, limit: 30 }),
          workspace_stored?.id as string,
          session?.user?.accessToken as string
        );
        console.log(res);
        setMembers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getWorkspaces();
  }, [session, workspace_stored]);

  return (
    <>
      <button
        id="multiLevelDropdownButton"
        data-dropdown-toggle="multi-dropdown"
        className="flex items-center p-2 text-sm text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        type="button"
        onClick={HandleHidden}
      >
        {title}
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
          {members.map((member) => (
            <li key={member.id}>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {member.firstName}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
