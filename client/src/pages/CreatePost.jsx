import { useNavigate } from "react-router-dom";
import { createPost } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import PostForm from "@/components/PostForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data) => {
    try {
      await createPost(data);

      toast({
        title: "Success!",
        description: "Your post has been created successfully",
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Create New Post
        </h1>
        <PostForm onSubmit={handleSubmit} submitLabel="Publish Post" />
      </div>
    </div>
  );
};

export default CreatePost;
