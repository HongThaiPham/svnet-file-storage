import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

const Header: React.FC<Props> = ({}) => {
  return (
    <div className="border-b">
      <div className="container mx-auto justify-between items-center">
        <div className="">SVNet File Drive</div>
        <div>
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
