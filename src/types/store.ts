import { AuthSlice } from "@/store/auth.slice";
import { PasswordSlice } from "@/store/password.slice";
import { SidebarSlice } from "@/store/sidebar.slice";
import { UserSlice } from "@/store/user.slice";
import { VaultSlice } from "@/store/vault.slice";

export type Store = VaultSlice &
  SidebarSlice &
  PasswordSlice &
  AuthSlice &
  UserSlice;
