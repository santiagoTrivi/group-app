import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useWorkspaceStore } from "@/app/hooks/store";
export default function SessionMenu() {
  const [isHidden, setIsHidden] = useState(false);
  const { removeworkspace } = useWorkspaceStore();
  const { data: session } = useSession();
  const HandleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div>
      <button
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdownAvatar"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        type="button"
        onClick={HandleHidden}
      >
        <span className="sr-only">Open user menu</span>{" "}
        <Image
          src="/99df05b4-d55b-4277-9c89-9da815ff34ca.jpg"
          alt="user"
          width={40}
          height={40}
        />
      </button>

      <div
        id="dropdownAvatar"
        className={`z-20 ${
          isHidden ? "" : "hidden"
        } right-5 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{session?.data?.firstName + " " + session?.data?.lastName}</div>
          <div className="font-medium truncate">{session?.data?.email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownUserAvatarButton"
        >
          <li>
            <Link
              href="/dashboard"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </Link>
          </li>
        </ul>
        <div className="py-2">
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            onClick={() => {
              removeworkspace();
              signOut();
            }}
          >
            Cerrar Sesion
          </button>
        </div>
      </div>
    </div>
  );
}
