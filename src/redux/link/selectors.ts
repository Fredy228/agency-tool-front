import { RootState } from "@/redux/store";

export const selectListLink = (state: RootState) => state.links.list;
export const selectActionLink = (state: RootState) => state.links.current;
