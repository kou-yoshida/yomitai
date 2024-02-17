export default async function Example() {
  const res = await fetch("https://api.vercel.app/blog", {
    next: { revalidate: 10 }, // Seconds
  });

  const posts = await res.json();

  // return <div>hello example</div>;

  return posts.map((post: any) => {
    return (
      <div key={post.id}>
        <h2>{post.title}</h2>
      </div>
    );
  });
}
