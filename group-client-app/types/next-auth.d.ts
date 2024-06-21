import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
    };
    data: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      created_at: Date;
      updated_at: Date;
    };
  }
}
