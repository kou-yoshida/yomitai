import { Button } from "@/src/components/button/Button";
import Tab from "@/src/components/tab/Tab";
import React from "react";

const PostList = () => {
  const posts = [
    {
      id: 1,
      title: "Post 1",
      content: "This is the content of Post 1",
      thumbnail: "https://placehold.jp/150x150.png",
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      title: "Post 2",
      content: "This is the content of Post 2",
      thumbnail: "https://placehold.jp/150x150.png",
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: 3,
      title: "Post 3",
      content: "This is the content of Post 3",
      thumbnail: "https://placehold.jp/150x150.png",
      createdAt: new Date().toLocaleDateString(),
    },
  ];

  return (
    <div className="bg-gray-100 py-8">
      <div className="flex justify-end">
        <Button color="primary" className="text-text-sub">
          追加する
        </Button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Post List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-500">{post.createdAt}</p>
              <div className="flex justify-end mt-2">
                <Button color="primary" className="text-text-sub mr-2">
                  Edit
                </Button>
                <Button color="primary" className="text-text-sub">
                  Detail
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Tab />
    </div>
  );
};

export default PostList;
