import { PasswordSlice } from "@/store/password.slice";
import { SidebarSlice } from "@/store/sidebar.slice";
import { VaultSlice } from "@/store/vault.slice";

export type Store = VaultSlice & SidebarSlice & PasswordSlice;
