import { auth } from "@/src/auth";
import { instance } from "@/src/lib/fetch";
export default async function Example() {
  const result = await instance.get<any>(
    "/",
    {
      next: {
        revalidate: 10,
      },
    },
    {
      message: "hello",
    }
  );

  // const session = await auth();
  // console.log(session, "サーバーコンポーネントで取得");

  return (
    <div>
      <button>api叩く</button>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// // export const dynamic = "force-dynamic";

// export default function Example() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:3000/api")
//       .then((res) => res.json())
//       .then((data) => setMessage(data.message));
//   }, []);

//   // const res = await fetch("http://localhost:3000/api");

//   // const result = await res.json();

//   // return <div>hello example</div>;

//   return <div>{message}</div>;
// }
