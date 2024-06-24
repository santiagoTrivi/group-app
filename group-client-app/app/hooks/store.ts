import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { WorkspaceProps } from "../workspace/domain/workspace.props";

export type WorkspaceStore = {
  workspace_stored: WorkspaceProps | null;
  setworkspace: (workspace: WorkspaceProps) => void;
  removeworkspace: () => void;
};

export const workspaceSlice: StateCreator<
  WorkspaceStore,
  [["zustand/persist", unknown]]
> = (set, get) => ({
  workspace_stored: null,
  setworkspace: (newWorkspace) =>
    set(() => ({ workspace_stored: newWorkspace })),
  removeworkspace: () => set(() => ({ workspace_stored: null })),
});

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(workspaceSlice, {
    name: "workspace-storage",
    storage: createJSONStorage(() => sessionStorage),
  })
);
