
import { Button } from "./ui/button";

export type User = {
  id: number;
  name: string;
  role: string;
  profileUrl: string;
};

export function ExcludesButton({ commentId, postId, onDelete }: { commentId: number; postId: number; onDelete: (postId: number, commentId: number) => void }) {
  function excluirComentario() {
    onDelete(postId, commentId);
  }
  return (
    
    <Button
      type="button"
      variant={"destructive"}
      className="bg-transparent text-red-500 hover:bg-transparent"
      onClick={excluirComentario}
      
    >
      Excluir
    </Button>
    
  );
}
