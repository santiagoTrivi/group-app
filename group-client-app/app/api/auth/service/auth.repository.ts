import { AuthBearer } from "@/app/shared/util/authBearer";
import { httpRequest } from "@/app/shared/util/httpRequest";

export function AuthRepository() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return {
    signUp: async (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => {
      const response = await fetch(baseUrl + "/authentication/signup", {
        method: httpRequest.post,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      });

      return response;
    },

    login: async (email: string, password: string) => {
      const response = await fetch(baseUrl + "/authentication/login", {
        method: httpRequest.post,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      return await response.json();
    },

    getMe: async (token: string) => {
      const response = await fetch(baseUrl + "/authentication/me", {
        method: httpRequest.get,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: AuthBearer(token),
        },
      });

      return await response.json();
    },
  };
}
