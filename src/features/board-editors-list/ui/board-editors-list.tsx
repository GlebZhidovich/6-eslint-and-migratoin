import { Board } from "@/entities/board";
import { AvatarsList, useUsers } from "@/entities/user";
import { FC } from "react";
import { UpdateEditorsButton } from "./update-editors-button";

type BoardEditorsListProps = {
  board: Board;
};

export const BoardEditorsList: FC<BoardEditorsListProps> = ({ board }) => {
  const users = useUsers((s) => s.usersMap());

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl mb-4 shrink-0 ">Редакторы:</h3>
      <div className="flex gap-5">
        <UpdateEditorsButton board={board} />
        <AvatarsList
          avatarsIds={board.editorsIds.map((id) => users[id].avatarId)}
        />
      </div>
    </div>
  );
};
