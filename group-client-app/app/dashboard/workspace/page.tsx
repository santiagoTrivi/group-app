"use client";
import WorkspaceList from "@/app/components/workpace/WorkspaceList";
import CreateWorkpaceModal from "@/app/components/workpace/createWorkpaceModal";
import { Pagination } from "@/app/shared/domain/pagination";
import { WorkspaceRepository } from "@/app/workspace/service/workspace.respository";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Workspace = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const { data: session } = useSession();

  const getWorkspaces = async () => {
    const res = await WorkspaceRepository().get(
      new Pagination({ page: 1, limit: 30 }),
      session?.user?.accessToken as string
    );
    console.log(res);
    if (res.ok) {
      const apiRes = await res.json();
      setWorkspaces(apiRes.data);
    }
  };

  getWorkspaces();

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <CreateWorkpaceModal />
        <WorkspaceList workspaces={workspaces} />
      </div>
    </div>
  );
};

export default Workspace;
