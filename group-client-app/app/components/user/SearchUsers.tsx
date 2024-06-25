import { Pagination } from "@/app/shared/domain/pagination";
import { UserRepository } from "@/app/user/services/user.respository";
import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function SearchUsers({ getSearchResults }: any) {
  const [query, setQuery] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fetchData = async () => {
      const response = await UserRepository().getUsers(
        new Pagination({ page: 1, limit: 100, search: query }),
        session?.user?.accessToken as string
      );
      console.log(response);
      getSearchResults(response.data);
    };
    fetchData();
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center max-w-[2000px] mx-auto"
      >
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Busqueda por nombre..."
            required
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handleSubmit(e);
            }}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-indigo-500 rounded-lg border border-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
    </div>
  );
}
