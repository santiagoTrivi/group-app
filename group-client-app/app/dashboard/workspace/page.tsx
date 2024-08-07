"use client";
import WorkspaceList from "@/app/components/workpace/WorkspaceList";
import CreateWorkpaceModal from "@/app/components/workpace/createWorkpaceModal";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Pagination } from "@/app/shared/domain/pagination";
import { WorkspaceRepository } from "@/app/workspace/service/workspace.respository";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const Workspace = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        const res = await WorkspaceRepository().get(
          new Pagination({ page: 1, limit: 30 }),
          session?.user?.accessToken as string
        );
        console.log(res);
        setWorkspaces(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getWorkspaces();
  }, [session]);

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <CreateWorkpaceModal
              newone={(result: any) => {
                setWorkspaces(workspaces.concat(result));
              }}
            />
          </div>
          <div className="md:ml-auto flex flex-wrap items-center text-base justify-center"></div>
        </div>

        <div className="my-6">
          <WorkspaceList workspaces={workspaces} />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
