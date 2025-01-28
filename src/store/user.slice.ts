import { Store } from "@/types/store";
import { JwtUserData } from "@/types/user";
import { StateCreator } from "zustand";

type UserStates = {
  userData: JwtUserData | null;
  userEmail: string | null;
};

type UserActions = {
  setUserData: (data: JwtUserData | null) => void;
  setUserEmail: (email: string) => void;
};

const initialState: UserStates = {
  userData: null,
  userEmail: null,
};

export type UserSlice = UserStates & UserActions;

export const createUserSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  ...initialState,
  setUserData: (data) =>
    set((state) => {
      state.userData = data;
    }),
  setUserEmail: (email) =>
    set((state) => {
      state.userEmail = email;
    }),
});
