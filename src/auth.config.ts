import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
      if (isAdminRoute) {
        return Boolean(auth?.user && auth.user.role === "ADMIN");
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;