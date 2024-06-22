import { Pagination } from "@/app/shared/domain/pagination";
import { PaginationResult } from "@/app/shared/domain/pagination.result";
import { AuthBearer } from "@/app/shared/util/authBearer";
import { httpRequest } from "@/app/shared/util/httpRequest";
import { UserProps } from "../domain/user.props";

export function UserRepository() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return {
    getUsers: async (pagination: Pagination, accessToken: string) => {
      const params = new URLSearchParams();
      params.append("page", pagination.page.toString());
      params.append("limit", pagination.limit.toString());

      if (pagination.search) {
        params.append("search", pagination.search);
      }
      console.log(params.toString());
      const response = await fetch(baseUrl + `/user/?${params}`, {
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
  };
}
