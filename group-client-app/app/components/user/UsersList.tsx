import { PaginationResult } from "@/app/shared/domain/pagination.result";
import { UserProps } from "@/app/user/domain/user.props";
import React from "react";
import Image from "next/image";

type Props = {
  users: UserProps[];
};

export default function UsersList({ users }: Props) {
  return (
    <div>
      <ul className="max-w-[2000px] divide-y divide-gray-200 dark:divide-gray-700">
        {users.map((user) => (
          <li className="py-3 sm:py-4" key={user.id}>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <Image
                  src="/99df05b4-d55b-4277-9c89-9da815ff34ca.jpg"
                  alt="user"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
