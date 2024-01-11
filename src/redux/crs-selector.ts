import { RootState } from "@/redux/store";

export const selectCRS = (state: RootState) => state.crs.isClient;
