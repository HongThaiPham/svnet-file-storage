import FileBrowser from "@/components/FileBrowser";
import React from "react";

type Props = {};

const FilePage: React.FC<Props> = ({}) => {
  return (
    <div>
      <FileBrowser title="Your Files" />
    </div>
  );
};

export default FilePage;
