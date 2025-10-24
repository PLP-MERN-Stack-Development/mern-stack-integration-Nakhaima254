import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Eye } from "lucide-react";
import { format } from "date-fns";

const PostCard = ({
  id,
  title,
  excerpt,
  featuredImage,
  categoryName,
  createdAt,
  views,
}) => {
  return (
    <Link to={`/post/${id}`} className="block h-full">
      <Card className="h-full overflow-hidden border-border hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1">
        {featuredImage && (
          <div className="aspect-video overflow-hidden">
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          {categoryName && (
            <Badge className="w-fit mb-2 bg-gradient-to-r from-primary to-accent">
              {categoryName}
            </Badge>
          )}
          <h3 className="text-xl font-bold line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(createdAt), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{views}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostCard;
