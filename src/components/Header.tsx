import {
  OrganizationSwitcher,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";

type Props = {};

const Header: React.FC<Props> = ({}) => {
  return (
    <div className="border-b py-4 bg-gray-50">
      <div className="flex container mx-auto justify-between items-center">
        <div className="">SVNet File Drive</div>
        <div>
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
  );
};

export default Header;
