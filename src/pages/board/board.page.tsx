import { useSession } from "@/entities/session";
import { subject, useAbility } from "@/features/auth";
import { BoardEditorsList } from "@/features/board-editors-list";
import { Board, BoardActions, useFetchBoard } from "@/features/dnd-board";
import { ComposeChildren } from "@/shared/lib/react";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { useParams } from "react-router-dom";
import {
  BoardDepsProvider,
  BoardListProvider,
  BoardStoreProvider,
  TaskEditorProvider,
} from "./providers";
import { useBoards } from "@/entities/board";
import { isFullBoard } from "@/entities/board";

export function BoardPage() {
  const params = useParams<"boardId">();
  const boardId = params.boardId;
  const sesson = useSession((s) => s.currentSession);
  const ability = useAbility();

  useFetchBoard(boardId);

  const board = useBoards((s) => {
    if (boardId) {
      const board = s.getBoardById(boardId);

      if (isFullBoard(board)) {
        return board;
      }
    }
  });

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
      <BoardListProvider>
        <div className="flex flex-col py-3 px-4 grow">
          <BoardEditorsList board={board} />
          <h1 className="text-3xl mb-4 shrink-0 ">{board?.title}</h1>
          <BoardActions className="shrink-0 mb-2" />
          <Board className="basis-0 grow" />
        </div>
      </BoardListProvider>
    </ComposeChildren>
  );
}
