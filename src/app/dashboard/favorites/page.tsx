import FileBrowser from "@/components/FileBrowser";
import React from "react";

type Props = {};

const FavoritePage: React.FC<Props> = ({}) => {
  return (
    <div>
      <FileBrowser title="Favorites" favoritesOnly />
    </div>
  );
};

export default FavoritePage;
