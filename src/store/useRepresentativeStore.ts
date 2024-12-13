import { create } from "zustand";
import { RepresentativeRegistration } from "@/models/index";

interface RepresentativeStore {
  representative: RepresentativeRegistration;
  setRepresentative: (data: RepresentativeRegistration) => void;
  updateRepresentative: (updates: Partial<RepresentativeRegistration>) => void;
  resetRepresentative: () => void;
}

export const useRepresentativeStore = create<RepresentativeStore>((set) => {
  // Define the default state for the representative
  const defaultRepresentative: RepresentativeRegistration = {
    agency_type: "",
    agent_code: "",
    city_code: "",
    first_name: "",
    insurance_branch: "",
    last_name: "",
    phone: "",
    phone_number: "",
    province: "",
    name: "",
    county_code: "",
  };

  return {
    representative: { ...defaultRepresentative },

    // Method to set the whole representative object
    setRepresentative: (data: RepresentativeRegistration) =>
      set({ representative: data }),

    // Method to update one or more fields of the representative object
    updateRepresentative: (updates) =>
      set((state) => ({
        representative: {
          ...state.representative,
          ...updates,
        },
      })),

    // Method to reset the representative object to its default state
    resetRepresentative: () =>
      set({ representative: { ...defaultRepresentative } }),
  };
});
