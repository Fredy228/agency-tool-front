import { createSlice } from "@reduxjs/toolkit";
import { CollectionInterface } from "@/interfaces/collection";

type CollectionReduxType = {
  list: CollectionInterface[];
  current: CollectionInterface | null;
  idDashboard: number;
};

const initialState: CollectionReduxType = {
  list: [],
  current: null,
  idDashboard: 0,
};

export const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setListCollection: (
      state,
      {
        payload,
      }: {
        payload: {
          list: CollectionInterface[];
          idDashb: number;
        };
      },
    ) => {
      state.list = payload.list;
      state.idDashboard = payload.idDashb;
    },
    addCollection: (
      state,
      {
        payload,
      }: {
        payload: CollectionInterface;
      },
    ) => {
      state.list = [...state.list, payload];
    },
    updateCollection: (
      state,
      {
        payload,
      }: {
        payload: Partial<CollectionInterface>;
      },
    ) => {
      state.list = state.list.map((i) => {
        if (i.id !== payload.id) return i;
        return {
          id: i.id,
          image: payload.image ? payload.image : i.image,
          name: payload.name ? payload.name : i.name,
          imageBuffer: payload.imageBuffer
            ? payload.imageBuffer
            : i.imageBuffer,
        };
      });
    },
    deleteCollection: (state, { payload }: { payload: number }) => {
      state.list = state.list.filter((item) => item.id !== payload);
    },
    actionCollection: (
      state,
      { payload }: { payload: CollectionInterface | null },
    ) => {
      state.current = payload;
    },
  },
});

export const {
  setListCollection,
  addCollection,
  actionCollection,
  deleteCollection,
  updateCollection,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
