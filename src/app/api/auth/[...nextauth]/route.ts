import { config } from "@/src/auth";
import NextAuth from "next-auth";

const api = NextAuth(config);

export { api as GET, api as POST };
