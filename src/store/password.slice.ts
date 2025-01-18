import { Store } from "@/lib/types/store";
import { StateCreator } from "zustand";

type PasswordStates = {
    openDeletePasswordDialog: boolean;
    openAddPasswordDialog: boolean;
};

type PasswordActions = {
    setOpenDeletePasswordDialog: (open: boolean) => void;
    setOpenAddPasswordDialog: (open: boolean) => void;
};

const initialState: PasswordStates = {
    openDeletePasswordDialog: false,
    openAddPasswordDialog: false,
};

export type PasswordSlice = PasswordStates & PasswordActions;

export const createPasswordSlice: StateCreator<
    Store,
    [["zustand/immer", never]],
    [],
    PasswordSlice
> = (set) => ({
    ...initialState,
    setOpenDeletePasswordDialog: (open) =>
        set((state) => {
            state.openDeletePasswordDialog = open;
        }),
    setOpenAddPasswordDialog: (open) =>
        set((state) => {
            state.openAddPasswordDialog = open;
        }),
});
