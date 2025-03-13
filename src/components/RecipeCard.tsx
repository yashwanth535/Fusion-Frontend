import React from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon } from 'lucide-react';
import { formatDate, cn } from '../lib/utils';

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  views: number;
  imageURL: string;
  _createdAt: string;
  author?: {
    _id: string;
    name: string;
    image: string;
  };
}

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = recipe;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          {author && (
            <Link to={`/user/${author?._id}`}>
              <p className="text-16-medium line-clamp-1">{author?.name}</p>
            </Link>
          )}
          <Link to={`/recipe/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        {author && (
          <Link to={`/user/${author?._id}`}>
            <img
              src={author?.image}
              alt={author?.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
        )}
      </div>

      <Link to={`/recipe/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt={title} className="startup-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link to={`/recipes?category=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Link to={`/recipe/${_id}`} className="startup-card_btn">
          Details
        </Link>
      </div>
    </li>
  );
};

export const RecipeCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index.toString())}>
        <div className="startup-card_skeleton"></div>
      </li>
    ))}
  </>
);

export default RecipeCard; 