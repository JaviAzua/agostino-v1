import React from "react";
import { Logo } from "../Logo";
import CloseButton from "../close-button";

function VisualOerlayTop({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className="w-full flex max-h-[10vh] justify-between items-center px-4 lg:px-6">
      <p className="hidden lg:block flex-1 font-darker-grotesque text-2xl tracking-widest font-semibold text-night">
        vision into visuals
      </p>
      <Logo
        underline={false}
        color="#121619"
        className="w-full lg:h-full lg:w-full p-2 flex-1"
      />
      <p className="flex-1 text-end p-4">
        <CloseButton setIsOpen={setIsOpen} />
      </p>
    </div>
  );
}

export default VisualOerlayTop;
