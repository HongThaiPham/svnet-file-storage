import FileBrowser from "@/components/FileBrowser";
import React from "react";

type Props = {};

const TrashPage: React.FC<Props> = ({}) => {
  return (
    <div>
      <FileBrowser title="Trash" deletedOnly />
    </div>
  );
};

export default TrashPage;
