import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Cone } from "lucide-react";
import { Button } from "./ui/button";

export function FormComents({
  postId,
  onCommentAdded,
}: {
  postId: number;
  onCommentAdded: () => void;
}) {
  const [comment, setComment] = useState("");

  async function handleAddComment(){
    if(!comment.trim()){
      alert("O comentário não pode ser vazio")
      return;
    }
    try {
      const newComment = {
        userId: 0,
        content: comment,
        publishedAt: new Date().toISOString(),
        likes: 0,
        postId,
      };
      const response = await fetch("http://localhost:3000/comments", {
        method: "Post",
        headers:{
           "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment)
      });
      if(response.ok){
        setComment("")
        onCommentAdded();
      }else{
        console.log("Erro ao adicionar comentário")
      }
    } catch (error) {
      console.log("Erro ao conectar ao servidor", error)
      
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <textarea value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full h-20 p2 border rounded bg-transparent text-white"
        placeholder="Deixe seu comentário aqui"
        />
        <Button onClick={handleAddComment} className="bg-sky-500 w-2/12">Enviar</Button>
      </div>
    </>
  );
}
