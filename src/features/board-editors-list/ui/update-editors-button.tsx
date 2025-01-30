import { UpdateIcon } from "@/shared/ui/ui-icons";
import clsx from "clsx";
import { FC, useState } from "react";

type UpdateEditorsButtonProps = {
  className?: string;
};

export const UpdateEditorsButton: FC<UpdateEditorsButtonProps> = ({
  className,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={clsx(className)} onClick={() => setOpen(true)}>
        <UpdateIcon className="w-8 h-8 text-teal-600" />
      </button>
      {/* {open && (
        <UpdateBoardModal board={board} onClose={() => setOpen(false)} />
      )} */}
    </>
  );
};
