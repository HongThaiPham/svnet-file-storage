import FileBrowser from "@/components/FileBrowser";
import React from "react";

type Props = {};

const FavoritePage: React.FC<Props> = ({}) => {
  return (
    <div>
      <FileBrowser title="Trash" deletedOnly />
    </div>
  );
};

export default FavoritePage;
