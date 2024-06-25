import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { WorkspaceProps } from "../workspace/domain/workspace.props";

export type JoinedWorkspaceStore = {
  joined_workspace_selected: WorkspaceProps | null;
  setJoinedWorkspace: (workspace: WorkspaceProps) => void;
  removeJoinedWorkspace: () => void;
};

export const joinedWorkspaceSlice: StateCreator<
  JoinedWorkspaceStore,
  [["zustand/persist", unknown]]
> = (set, get) => ({
  joined_workspace_selected: null,
  setJoinedWorkspace: (newWorkspace) =>
    set(() => ({ joined_workspace_selected: newWorkspace })),
  removeJoinedWorkspace: () => set(() => ({ joined_workspace_selected: null })),
});

export const useJoinedWorkspaceStore = create<JoinedWorkspaceStore>()(
  persist(joinedWorkspaceSlice, {
    name: "joined-workspace-selected-storage",
    storage: createJSONStorage(() => sessionStorage),
  })
);
