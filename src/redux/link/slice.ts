import { createSlice } from "@reduxjs/toolkit";
import { LinkInterface } from "@/interfaces/link";

type LinkReduxType = {
  list: LinkInterface[];
  current: LinkInterface | null;
};

const initialState: LinkReduxType = {
  list: [],
  current: null,
};

export const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    setListLink: (
      state,
      {
        payload,
      }: {
        payload: LinkInterface[];
      },
    ) => {
      state.list = payload;
    },
    addLink: (
      state,
      {
        payload,
      }: {
        payload: LinkInterface;
      },
    ) => {
      state.list = [...state.list, payload];
    },
    updateLink: (
      state,
      {
        payload,
      }: {
        payload: Partial<LinkInterface>;
      },
    ) => {
      state.list = state.list.map((i) => {
        if (i.id !== payload.id) return i;
        return {
          id: i.id,
          image: payload.image ? payload.image : i.image,
          name: payload.name ? payload.name : i.name,
          url: payload.url ? payload.url : i.url,
          description: payload.description
            ? payload.description
            : i.description,
        };
      });
    },
    deleteLink: (state, { payload }: { payload: number }) => {
      state.list = state.list.filter((item) => item.id !== payload);
    },
    actionLink: (state, { payload }: { payload: LinkInterface | null }) => {
      state.current = payload;
    },
  },
});

export const { setListLink, updateLink, actionLink, deleteLink, addLink } =
  linksSlice.actions;

export default linksSlice.reducer;
