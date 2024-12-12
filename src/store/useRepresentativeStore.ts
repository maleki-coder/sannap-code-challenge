import { create } from "zustand";

export interface RepresentativeRegistration {
  address: string; // "آدرس"
  agency_type: string; // "نوع نمایندگی"
  agent_code: string; // "کد نمایندگی"
  city_code: string; // "کد شهر (کد تلفن ثابت)"
  county_code: string; // "شهر"
  first_name: string; // "نام"
  insurance_branch: string; // "آیدی شعبه بیمه گر"
  last_name: string; // "نام خانوادگی"
  phone: string; // "تلفن ثابت"
  phone_number: string; // "09000000009"
  province: string; // "آیدی استان انتخاب شده"
  name: string; // "نام نمایندگی اگر حقوقی بود"
}

interface RepresentativeStore {
  representative: RepresentativeRegistration;
  setRepresentative: (data: RepresentativeRegistration) => void;
  updateRepresentative: (updates: Partial<RepresentativeRegistration>) => void;
}

export const useRepresentativeStore = create<RepresentativeStore>((set) => ({
  representative: {
    address: "",
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
    county_code: ""
  },

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
}));
