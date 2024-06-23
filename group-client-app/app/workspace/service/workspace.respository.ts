import { Pagination } from "@/app/shared/domain/pagination";
import { AuthBearer } from "@/app/shared/util/authBearer";
import { httpRequest } from "@/app/shared/util/httpRequest";

export function WorkspaceRepository() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return {
    getMembers: async (
      pagination: Pagination,
      workspaceId: string,
      accessToken: string
    ) => {
      const params = new URLSearchParams();
      params.append("page", pagination.page.toString());
      params.append("limit", pagination.limit.toString());

      if (pagination.search) {
        params.append("search", pagination.search);
      }

      const response = await fetch(
        baseUrl + "/workspace/" + workspaceId + "/",
        {
          method: httpRequest.get,
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthBearer(accessToken),
            accept: "application/json",
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw result;
      }

      return result;
    },
    get: async (pagination: Pagination, accessToken: string) => {
      const params = new URLSearchParams();
      params.append("page", pagination.page.toString());
      params.append("limit", pagination.limit.toString());

      if (pagination.search) {
        params.append("search", pagination.search);
      }

      const response = await fetch(baseUrl + "/workspace/", {
        method: httpRequest.get,
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthBearer(accessToken),
          accept: "application/json",
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw result;
      }

      return result;
    },

    create: async (name: string, accessToken: string) => {
      return await fetch(baseUrl + "/workspace/", {
        method: httpRequest.post,
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthBearer(accessToken),
          accept: "application/json",
        },
        body: JSON.stringify({ name }),
      });
    },

    addMember: async (
      workspaceId: string,
      userId: string,
      accessToken: string
    ) => {
      return await fetch(baseUrl + "/workspace/" + workspaceId + "/", {
        method: httpRequest.post,
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthBearer(accessToken),
          accept: "application/json",
        },
        body: JSON.stringify({ userId }),
      });
    },
  };
}
