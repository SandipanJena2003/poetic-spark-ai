import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, User, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface PoemCardProps {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    display_name?: string;
    username?: string;
  };
  category: string;
  likes_count: number;
  created_at: string;
  isLiked?: boolean;
  onLike?: () => void;
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
}

const PoemCard: React.FC<PoemCardProps> = ({
  id,
  title,
  content,
  author,
  category,
  likes_count,
  created_at,
  isLiked = false,
  onLike,
  className,
  variant = 'default'
}) => {
  const truncatedContent = content.length > 200 
    ? content.substring(0, 200) + '...' 
    : content;

  const displayName = author.display_name || author.username || 'Anonymous';

  const cardVariants = {
    default: "hover:shadow-poetry transition-all duration-300 hover:-translate-y-1",
    featured: "ring-2 ring-poetry-gold shadow-poetry bg-gradient-card",
    compact: "hover:shadow-card transition-all duration-200"
  };

  return (
    <Card className={cn(
      "bg-white/90 backdrop-blur-sm border-poetry-lavender",
      cardVariants[variant],
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link 
              to={`/poem/${id}`}
              className="block group"
            >
              <h3 className={cn(
                "font-serif font-bold text-primary group-hover:text-primary/80 transition-colors leading-tight",
                variant === 'featured' ? "text-xl" : "text-lg"
              )}>
                {title}
              </h3>
            </Link>
            
            <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
              <User className="h-3 w-3" />
              <Link 
                to={`/author/${author.id}`}
                className="font-serif hover:text-primary transition-colors"
              >
                {displayName}
              </Link>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span className="font-serif">
                  {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="ml-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-serif bg-poetry-lavender text-primary">
              {category}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Poem Content */}
        <Link to={`/poem/${id}`} className="block group">
          <div className={cn(
            "font-poetry text-foreground leading-relaxed mb-4 group-hover:text-foreground/80 transition-colors",
            variant === 'compact' ? "text-sm" : "text-base"
          )}>
            {truncatedContent.split('\n').map((line, index) => (
              <div key={index} className="mb-1">
                {line || <br />}
              </div>
            ))}
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Like Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onLike}
              className={cn(
                "flex items-center space-x-1 text-muted-foreground hover:text-red-500 transition-colors",
                isLiked && "text-red-500"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
              <span className="text-sm font-serif">{likes_count}</span>
            </Button>

            {/* Comments */}
            <Link to={`/poem/${id}#comments`}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-serif">Comment</span>
              </Button>
            </Link>

            {/* Share */}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: title,
                    text: `Check out this beautiful poem: "${title}" by ${displayName}`,
                    url: `${window.location.origin}/poem/${id}`
                  });
                } else {
                  navigator.clipboard.writeText(`${window.location.origin}/poem/${id}`);
                }
              }}
            >
              <Share2 className="h-4 w-4" />
              <span className="text-sm font-serif">Share</span>
            </Button>
          </div>

          {/* Read More */}
          <Link to={`/poem/${id}`}>
            <Button variant="outline" size="sm" className="font-serif">
              Read More
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PoemCard;