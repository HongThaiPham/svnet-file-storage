import React from "react";
import Image from "next/image";
import UploadFileButton from "./UploadFileButton";
type Props = {};

const NoDataPlaceholder: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <Image
        alt="an image of a picture and directory icon"
        width="150"
        height="150"
        src="/assets/empty-data.svg"
      />
      <div className="text-2xl">You have no files, upload one now</div>
      <UploadFileButton />
    </div>
  );
};

export default NoDataPlaceholder;
