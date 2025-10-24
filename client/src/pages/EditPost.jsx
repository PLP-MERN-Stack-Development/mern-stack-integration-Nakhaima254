import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPost, updatePost } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import PostForm from "@/components/PostForm";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const data = await getPost(id);
      setInitialData({
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        featuredImage: data.featuredImage,
        category: data.category?._id,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load post",
        variant: "destructive",
      });
      navigate("/");
    }
    setIsLoading(false);
  };

  const handleSubmit = async (data) => {
    try {
      await updatePost(id, data);

      toast({
        title: "Success!",
        description: "Your post has been updated successfully",
      });

      navigate(`/post/${id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!initialData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to={`/post/${id}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Post
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Edit Post
        </h1>
        <PostForm
          initialData={initialData}
          onSubmit={handleSubmit}
          submitLabel="Update Post"
        />
      </div>
    </div>
  );
};

export default EditPost;
