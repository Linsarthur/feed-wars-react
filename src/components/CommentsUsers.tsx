import { Comments as commentsType } from "@/App";
import { useEffect, useState } from "react";
import { ExcludesButton } from "./ExcludesButton";
import { Button } from "./ui/button";

export type User = {
  id: number;
  name: string;
  role: string;
  profileUrl: string;
};

export type Post = {
  id: number;
  userId: number;
  content: string;
  hashtags: string[];
  publishedAt: string;
  comments?: Comment[];
};

export function CommentsUsers(
  props: CommentsType & {
    postId: number;
    onDeleteComment: (postId: number, commentId: number) => void;
  }
) {
  const [user, setUser] = useState<User | null>(null);
  const [likes, setLikes] = useState(0);

  async function getUser() {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${props.userId}`
      );
      const data: User = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="w-full h-full flex items-center gap-1 mt-10">
        <div className="flex w-24 h-full items-center">
          <img
            src={user?.profileUrl}
            alt="User"
            className="h-20 w-20 rounded my-10"
          />
        </div>
        <div className="gap-3 my-5 flex flex-col h-3/5 w-full justify-center bg-zinc-700 rounded-xl">
          <div className="m-5 pt-5">
            <div className="flex flex-col w-full gap-1">
              <p className="text-zinc-200">{user?.name}</p>
              <p className="text-zinc-400 w-10 h-full">{user?.role}</p>
              <p className="text-white">{props.content}</p>
            </div>
            <div className="flex relative justify-end items-start bottom-20">
            <ExcludesButton
              commentId={props.id}
              postId={props.postId}
              onDelete={props.onDeleteComment}
            />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <Button
          className="text-zinc-400 ml-20"
          onClick={() => setLikes(likes + 1)}
        >
          Curtir: {likes}
        </Button>
      </div>
    </>
  );
}
