import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserProps } from "../user/domain/user.props";

export type WorkspaceMembers = {
  members: UserProps[];
  setMembers: (members: UserProps[]) => void;
  addMember: (user: UserProps) => void;
};

export const workspaceMembersSlice: StateCreator<
  WorkspaceMembers,
  [["zustand/persist", unknown]]
> = (set, get) => ({
  members: [],
  setMembers: (members) => set(() => ({ members })),
  addMember: (user) => set((state) => ({ members: [...state.members, user] })),
});

export const useWorkspaceMembersStore = create<WorkspaceMembers>()(
  persist(workspaceMembersSlice, {
    name: "members-storage",
    storage: createJSONStorage(() => sessionStorage),
  })
);
