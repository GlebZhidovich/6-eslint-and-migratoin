import { useSession } from "@/entities/session";
import { subject, useAbility } from "@/features/auth";
import { Board, BoardActions, useFetchBoard } from "@/features/dnd-board";
import { ComposeChildren } from "@/shared/lib/react";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { useParams } from "react-router-dom";
import {
  BoardDepsProvider,
  BoardStoreProvider,
  TaskEditorProvider,
} from "./providers";

export function BoardPage() {
  const params = useParams<"boardId">();
  const boardId = params.boardId;
  const sesson = useSession((s) => s.currentSession);
  const ability = useAbility();

  const { board } = useFetchBoard(boardId);

  if (!sesson) {
    return <div>Не авторизован</div>;
  }

  if (!board) {
    return <UiPageSpinner />;
  }

  const canViewBoard = ability.can("read", subject("Board", board));

  if (!canViewBoard) {
    return <div>Нет доступа к доске</div>;
  }

  return (
    <ComposeChildren>
      <TaskEditorProvider board={board} />
      <BoardDepsProvider sesson={sesson} />
      <BoardStoreProvider board={board} />
      <div className="flex flex-col py-3 px-4 grow">
        <h1 className="text-3xl mb-4 shrink-0 ">{board?.title}</h1>
        <BoardActions className="shrink-0 mb-2" />
        <Board className="basis-0 grow" />
      </div>
    </ComposeChildren>
  );
}
