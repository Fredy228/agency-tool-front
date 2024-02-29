import { createSlice } from "@reduxjs/toolkit";
import { OrganizationInterface } from "@/interfaces/organization";

const initialState: Partial<OrganizationInterface> = {
  logoUrl: null,
};

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganization: (_state, { payload }) => {
      if (payload) return { ...payload };
    },
  },
});

export const { setOrganization } = organizationSlice.actions;

export default organizationSlice.reducer;
