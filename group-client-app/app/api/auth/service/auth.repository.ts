import { httpRequest } from "@/app/shared/util/httpRequest";

export function AuthRepository() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return {
    signUp: async (
      email: string,
      password: string,
      fistName: string,
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
          fistName,
          lastName,
        }),
      });

      return await response.json();
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
  };
}
