import React from "react";
import UploadFileDialog from "./UploadFileDialog";
import { Button } from "./ui/button";
type Props = {};

const UploadFileButton: React.FC<Props> = ({}) => {
  return <UploadFileDialog trigger={<Button>Upload file</Button>} />;
};

export default UploadFileButton;
