"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/src/components/button/Button";

const LoginPage: React.FC = () => {
  const responseGoogle = (response: any) => {
    // Handle the Google login response here
    console.log(response);
  };

  const searchParams = useSearchParams();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">
          googleログインして読みたい記事を保存しましょう！
        </h1>

        <Button
          onClick={() => {
            signIn("google", {
              callbackUrl: searchParams.get("callbackUrl") || "/",
            });
          }}
        >
          ログインする
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
