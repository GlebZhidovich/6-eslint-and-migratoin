import { UpdateIcon } from "@/shared/ui/ui-icons";
import clsx from "clsx";
import { FC, useState } from "react";
import { UpdateEditorsModal } from "./update-editors-modal";
import { BoardPartial } from "@/entities/board";

type UpdateEditorsButtonProps = {
  className?: string;
  board: BoardPartial;
};

export const UpdateEditorsButton: FC<UpdateEditorsButtonProps> = ({
  board,
  className,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={clsx(className)} onClick={() => setOpen(true)}>
        <UpdateIcon className="w-8 h-8 text-teal-600" />
      </button>
      {open && (
        <UpdateEditorsModal board={board} onClose={() => setOpen(false)} />
      )}
    </>
  );
};
