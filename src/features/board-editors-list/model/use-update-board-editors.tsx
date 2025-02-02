import { BoardPartial, UpdateBoardData, useBoards } from "@/entities/board";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useSession } from "@/entities/session";
import { useBoardEditors } from "./board-editors-context";

export function useUpdateBoardEditors(board?: BoardPartial) {
  const getConfirmation = useGetConfirmation();

  const { canUpdateBoardEditors } = useBoardEditors();

  const ownerId = useSession((s) => s.currentSession?.userId);

  const updateModalRaw = useBoards((s) => s.updateBoard);

  const updateBoardEditors = async (
    data: UpdateBoardData,
    onUpdate: () => void,
  ) => {
    if (!board || !canUpdateBoardEditors(board)) return;

    if (ownerId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description:
          "Вы действительно хотите передать доску другому пользователю?",
      });

      if (!confirmation) return;
    }

    await updateModalRaw(board.id, data);
    onUpdate();
  };

  return { updateBoardEditors };
}
