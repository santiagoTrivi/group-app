"use client";
import { WorkspaceRepository } from "@/app/workspace/service/workspace.respository";
import { useSession } from "next-auth/react";
import { useState } from "react";
const CreateWorkpaceModal = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const { data: session } = useSession();
  const HandleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await WorkspaceRepository().create(
      name,
      session?.user?.accessToken as string
    );

    if (!res.ok) {
      const apiRes = await res.json();
      console.log(apiRes);
      if (apiRes.statusCode)
        setErrors(
          Array.isArray(apiRes.message) ? apiRes.message : [apiRes.message]
        );
      return;
    }

    setIsHidden(!isHidden);
  };

  return (
    <>
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="block text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        type="button"
        onClick={HandleHidden}
      >
        Nuevo grupo
      </button>
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={` ${
          isHidden ? "" : "hidden"
        } fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Crea tu grupo, de manera facil!! 🎯
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={HandleHidden}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre del grupo
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="backend-dev"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div className="flex justify-between"></div>
                <button
                  type="submit"
                  className="w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Crear grupo
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateWorkpaceModal;
