import { Heart, HeartPulse, Soup } from "lucide-react";
import React, { useState } from "react";

const getTwoValuesFromArray = (arr) => {
  return [arr[0], arr[1]];
};

const RecipeCard = ({ recipe, bg, badge }) => {
  const healthLabels = getTwoValuesFromArray(recipe.healthLabels);
  const [isFavorites, setIsFavorites] = useState(
    localStorage.getItem("favorites")?.includes(recipe.label)
  );

  const addRecipesToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeAlreadyInFavorites = favorites.some(
      (fav) => fav.label === recipe.label
    );

    if (isRecipeAlreadyInFavorites) {
      favorites = favorites.filter((fav) => fav.label !== recipe.label);
      setIsFavorites(false);
    } else {
      favorites.push(recipe);
      setIsFavorites(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div
      className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}
    >
      <a
        href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`}
        target="_blank"
        className="relative h-32"
      >
        <img
          src={recipe.image}
          alt="recipe img"
          className="rounded-md w-full h-full object-cover cursor-pointer"
        />
        <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
          <Soup size={16} /> {recipe.yield} Servings
        </div>

        <div
          className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            addRecipesToFavorites();
          }}
        >
          {!isFavorites && <Heart size={20} className="hover:fill-red-500 hover:text-red-500" />}
         {isFavorites && <Heart size={20} className="fill-red-500 text-red-500" />}
        </div>
      </a>

      <div className="flex mt-1">
        <p className="font-bold tracking-wide">{recipe.label}</p>
      </div>
      <p className="my-2">
        {recipe.cuisineType[0].charAt(0).toUpperCase() +
          recipe.cuisineType[0].slice(1)}{" "}
        Kitchen
      </p>

      <div className="flex gap-2 mt-auto">
        {healthLabels.map((label, index) => (
          <div
            key={index}
            className={`flex gap-1 ${badge} items-center p-1 rounded-md`}
          >
            <HeartPulse size={16} />
            <span className="text-sm tracking-tighter font-semibold">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
