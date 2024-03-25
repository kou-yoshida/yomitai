"use client";

import { instance } from "@/src/lib/fetch";

export default function Profile() {
  const putProfile = async () => {
    const result = await instance.put("/profile", {
      body: JSON.stringify({
        isPrivate: true,
        githubUrl: "https://github.com/kuo-yoshida",
      }),
    });
  };
  return (
    <div>
      <button onClick={() => putProfile()}>プロフィール更新</button>
    </div>
  );
}
