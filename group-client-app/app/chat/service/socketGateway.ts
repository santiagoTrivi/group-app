import { Pagination } from "@/app/shared/domain/pagination";
import { PaginationResult } from "@/app/shared/domain/pagination.result";
import { AuthBearer } from "@/app/shared/util/authBearer";
import { httpRequest } from "@/app/shared/util/httpRequest";
import io from "Socket.IO-client";

export function WebSocketGateway() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return {
    connect: async (accessToken: string) => {
      const socket = clientSocket(accessToken);
      socket.on("connect", () => {
        console.log("connected");
      });
      return socket;
    },
  };
}

const clientSocket = (token: string) => {
  return io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3030", {
    extraHeaders: {
      Authorization: token,
    },
  });
};
