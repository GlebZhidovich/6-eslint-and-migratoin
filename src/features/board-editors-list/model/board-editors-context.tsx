import { BoardPartial } from "@/entities/board";
import { createStrictContext, useStrictContext } from "@/shared/lib/react";

type BoardEditorsActions = {
  canUpdateBoardEditors: (board: BoardPartial) => boolean;
};

export const BoardEditorsContext = createStrictContext<BoardEditorsActions>();

export const useBoardEditors = () => useStrictContext(BoardEditorsContext);
