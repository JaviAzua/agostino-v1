import React from "react";
import { Logo } from "../Logo";
import CloseButton from "../close-button";
import Link from "next/link";
import LeftText from "../left-text";

function VisualOerlayTop({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className="w-full flex max-h-[10vh] justify-between items-center px-4 lg:px-6">
      <LeftText className="hidden lg:block flex-1 font-darker-grotesque text-2xl tracking-widest font-semibold text-night" />
      <Link href="/">
        <Logo
          underline={false}
          color="#121619"
          className="w-full lg:h-full lg:w-full p-2 flex-1"
        />
      </Link>
      <div className="flex-1 text-end p-4">
        <CloseButton setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}

export default VisualOerlayTop;
