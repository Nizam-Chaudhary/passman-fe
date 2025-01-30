import { Store } from "@/types/store";
import { StateCreator } from "zustand";

type AuthStates = {
  isAuthenticated: boolean | null;
  isEmailVerified: boolean | null;
  isMasterPasswordSet: boolean | null;
  userKey?: CryptoKey | null;
  masterKey?: CryptoKey | null;
  openRecoveryKeyDialog: boolean;
  recoveryKey: string;
};

type AuthActions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsEmailVerified: (isVerified: boolean | null) => void;
  setIsMasterPasswordSet: (isSet: boolean | null) => void;
  setUserKey: (key: CryptoKey | null) => void;
  setMasterkey: (key: CryptoKey | null) => void;
  setOpenRecoveryKeyDialog: (open: boolean) => void;
  setRecoveryKey: (key: string) => void;
};

const initialState: AuthStates = {
  isAuthenticated: null,
  isEmailVerified: null,
  isMasterPasswordSet: false,
  openRecoveryKeyDialog: false,
  recoveryKey: "",
};

export type AuthSlice = AuthStates & AuthActions;

export const createAuthSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  AuthSlice
> = (set) => ({
  ...initialState,
  setIsAuthenticated: (isAuthenticated) =>
    set((state) => {
      state.isAuthenticated = isAuthenticated;
    }),
  setUserKey: (key) =>
    set((state) => {
      state.userKey = key;
    }),
  setIsEmailVerified: (isVerified) =>
    set((state) => {
      state.isEmailVerified = isVerified;
    }),
  setIsMasterPasswordSet: (isSet) =>
    set((state) => {
      state.isMasterPasswordSet = isSet;
    }),
  setMasterkey: (key) =>
    set((state) => {
      state.masterKey = key;
    }),
  setOpenRecoveryKeyDialog: (open) =>
    set((state) => {
      state.openRecoveryKeyDialog = open;
    }),
  setRecoveryKey: (key) =>
    set((state) => {
      state.recoveryKey = key;
    }),
});
