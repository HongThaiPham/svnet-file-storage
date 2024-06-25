"use client";
import { useQuery } from "convex/react";
import React, { useState } from "react";
import { api } from "../../convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Doc } from "../../convex/_generated/dataModel";
import NoDataPlaceholder from "./NoDataPlaceholder";
import { Loader2 } from "lucide-react";

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
  if (files?.length === 0) {
    return <NoDataPlaceholder />;
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
      {true && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Loader2 className="h-16 w-16 animate-spin text-muted-foreground" />
          <div className="text-2xl">Loading your files...</div>
        </div>
      )}
    </div>
  );
};

export default FileBrowser;
