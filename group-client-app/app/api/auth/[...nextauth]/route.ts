import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthRepository } from "../service/auth.repository";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await AuthRepository().login(
          credentials?.email as string,
          credentials?.password as string
        );
        if (user.statusCode === 401) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const data = await AuthRepository().getMe(token.accessToken as string);
      token.data = data;
      return { ...token, ...user };
    },
    async session({ session, token }) {
      const { data, ...rest } = token;
      session.user = rest as any;
      session.data = data as any;

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
