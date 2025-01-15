import { Store } from "@/lib/types/store";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createVaultSlice } from "./vault.slice";
export const useStore = create<Store>()(
    devtools(
        subscribeWithSelector(
            immer((...a) => ({
                ...createVaultSlice(...a),
            }))
        )
    )
);
