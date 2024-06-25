"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {};

const SideNav: React.FC<Props> = ({}) => {
  const pathname = usePathname();
  return (
    <div className="w-80 flex flex-col gap-4 sm:rounded-sm sm:shadow-md p-3">
      <Link href="/dashboard/files">
        <Button
          variant={"link"}
          className={cn("flex gap-2", {
            "text-blue-500": pathname.includes("/dashboard/files"),
          })}
        >
          <FileIcon /> All Files
        </Button>
      </Link>

      <Link href="/dashboard/favorites">
        <Button
          variant={"link"}
          className={cn("flex gap-2", {
            "text-blue-500": pathname.includes("/dashboard/favorites"),
          })}
        >
          <StarIcon className="text-yellow-500" /> Favorites
        </Button>
      </Link>

      <Link href="/dashboard/trash">
        <Button
          variant={"link"}
          className={cn("flex gap-2", {
            "text-blue-500": pathname.includes("/dashboard/trash"),
          })}
        >
          <TrashIcon className="text-red-500" /> Trash
        </Button>
      </Link>
    </div>
  );
};

export default SideNav;
