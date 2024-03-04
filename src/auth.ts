import { PrismaAdapter } from "@auth/prisma-adapter";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./db";
import { Adapter } from "next-auth/adapters";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: <Adapter>PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.GCP_CLIENT_ID!,
      clientSecret: process.env.GCP_SECRET!,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      console.log("session callback!!!!!");
      // Send properties to the client, like an access_token and user id from a provider.
      if (token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
