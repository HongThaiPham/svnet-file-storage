"use client";
import React, { ReactNode } from "react";
import { Doc } from "../../convex/_generated/dataModel";
import {
  FileArchiveIcon,
  FileIcon,
  FileJsonIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  GanttChartIcon,
  ImageIcon,
  PresentationIcon,
  TextIcon,
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { FileCardActions } from "./FileCardActions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatRelative } from "date-fns";

type Props = {
  file: Doc<"files"> & { isFavorited: boolean; url: string | null };
};

const FileCard: React.FC<Props> = ({ file }) => {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });

  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileIcon />,
    csv: <GanttChartIcon />,
    doc: <FileTextIcon />,
    docx: <FileTextIcon />,
    xls: <FileSpreadsheetIcon />,
    xlsx: <FileSpreadsheetIcon />,
    ppt: <PresentationIcon />,
    pptx: <PresentationIcon />,
    zip: <FileArchiveIcon />,
    txt: <TextIcon />,
    json: <FileJsonIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 text-base font-normal">
          <div className="flex justify-center">{typeIcons[file.type]}</div>{" "}
          {file.name}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardActions isFavorited={file.isFavorited} file={file} />
        </div>
      </CardHeader>
      <CardContent className="h-[200px] flex justify-center items-center">
        {file.type === "image" && file.url && (
          <Image alt={file.name} width="200" height="100" src={file.url} />
        )}

        {file.type === "csv" && <GanttChartIcon className="w-20 h-20" />}
        {file.type === "pdf" && <FileTextIcon className="w-20 h-20" />}
        {file.type === "doc" && <FileTextIcon className="w-20 h-20" />}
        {file.type === "docx" && <FileTextIcon className="w-20 h-20" />}
        {file.type === "xls" && <FileSpreadsheetIcon className="w-20 h-20" />}
        {file.type === "xlsx" && <FileSpreadsheetIcon className="w-20 h-20" />}
        {file.type === "ppt" && <PresentationIcon className="w-20 h-20" />}
        {file.type === "pptx" && <PresentationIcon className="w-20 h-20" />}
        {file.type === "zip" && <FileArchiveIcon className="w-20 h-20" />}
        {file.type === "txt" && <TextIcon className="w-20 h-20" />}
        {file.type === "json" && <FileJsonIcon className="w-20 h-20" />}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className="text-xs text-gray-700">
          Uploaded on {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
