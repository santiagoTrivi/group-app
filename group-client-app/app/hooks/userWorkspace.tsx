import { create } from "zustand";
import { WorkspaceProps } from "../workspace/domain/workspace.props";

type UserWorkspaceStore = {
  userWorkspace: WorkspaceProps[];
  setUserWorkspace: (userWorkspace: WorkspaceProps) => void;
};

export const userWorkspaceStore = create<UserWorkspaceStore>()((set) => ({
  userWorkspace: [],
  setUserWorkspace: (workspace) =>
    set((state) => ({ userWorkspace: [...state.userWorkspace, workspace] })),
}));
