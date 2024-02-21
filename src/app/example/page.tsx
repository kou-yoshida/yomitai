import { getHoge } from "./repository/getHoge";

export default async function Example() {
  // const res = await fetch(`http://localhost:3000/api?message=hello`, {
  //   // next: { revalidate: 10 },
  //   cache: "no-store",
  // });

  // const _res = await

  const result = await getHoge({ cache: "no-store" });

  // return <div>hello example</div>;

  return <div>{result}</div>;
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
