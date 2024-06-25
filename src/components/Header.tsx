import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { FileIcon, Server } from "lucide-react";

type Props = {};

const Header: React.FC<Props> = ({}) => {
  return (
    <div className="relative z-10 border-b py-4 bg-gray-50">
      <div className="items-center container mx-auto justify-between flex">
        <Link href="/" className="flex gap-2 items-center text-xl text-black">
          {/* <Image src="/logo.png" width="50" height="50" alt="file drive logo" /> */}
          <Server className="w-8 h-8 text-blue-500" />
          <h1 className="uppercase font-bold text-foreground">SVNet Drive</h1>
        </Link>
        <div className="flex gap-3">
          <SignedIn>
            <Button variant={"outline"}>
              <Link href="/dashboard/files">Your Files</Link>
            </Button>
          </SignedIn>

          <div className="flex gap-2">
            <OrganizationSwitcher />
            <UserButton />
            <SignedOut>
              <SignInButton>
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
