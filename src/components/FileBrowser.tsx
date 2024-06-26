"use client";
import { useQuery } from "convex/react";
import React, { useMemo, useState } from "react";
import { api } from "../../convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Doc } from "../../convex/_generated/dataModel";
import NoDataPlaceholder from "./NoDataPlaceholder";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import UploadFileButton from "./UploadFileButton";
import { usePathname } from "next/navigation";
import FileCard from "./FileCard";
import SearchBar from "./SearchBar";

import { columns } from "./FileTableColumn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FileTable } from "./FileTable";

type Props = {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
};

const FileBrowser: React.FC<Props> = ({
  title,
  favoritesOnly = false,
  deletedOnly = false,
}) => {
  const pathname = usePathname();
  const organization = useOrganization();
  const user = useUser();
  const [type, setType] = useState<Doc<"files">["type"] | "all">("all");
  const [query, setQuery] = useState("");
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(
    api.files.getFiles,
    orgId
      ? {
          orgId,
          type: type === "all" ? undefined : type,
          query,
          favorites: favoritesOnly,
          deletedOnly,
        }
      : "skip"
  );
  const isLoading = files === undefined;
  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );
  const modifiedFiles = useMemo(() => {
    return (
      files?.map((file) => ({
        ...file,
        isFavorited: (favorites ?? []).some(
          (favorite) => favorite.fileId === file._id
        ),
      })) ?? []
    );
  }, [favorites, files]);

  // if (files?.length === 0 && !pathname.includes("/dashboard/trash")) {
  //   return <NoDataPlaceholder />;
  // }
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="flex items-center gap-2">
          <SearchBar query={query} setQuery={setQuery} />
          <UploadFileButton />
        </div>
      </div>
      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center">
          <TabsList className="mb-2">
            <TabsTrigger value="grid" className="flex gap-2 items-center">
              <GridIcon />
              Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="flex gap-2 items-center">
              <RowsIcon /> Table
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2 items-center">
            <Label htmlFor="type-select">Type Filter</Label>
            <Select
              value={type}
              onValueChange={(newType) => {
                setType(newType as any);
              }}
            >
              <SelectTrigger id="type-select" className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col gap-8 w-full items-center mt-24">
            <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
            <div className="text-2xl">Loading your files...</div>
          </div>
        )}

        <TabsContent value="grid">
          <div className="grid grid-cols-3 gap-4">
            {modifiedFiles?.map((file) => {
              return <FileCard key={file._id} file={file} />;
            })}
          </div>
        </TabsContent>
        <TabsContent value="table">
          <FileTable columns={columns} data={modifiedFiles} />
        </TabsContent>
      </Tabs>
      {files?.length === 0 && !pathname.includes("/dashboard/trash") && (
        <NoDataPlaceholder />
      )}
    </div>
  );
};

export default FileBrowser;
