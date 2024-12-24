import { create } from "zustand";
type State = {
  currentStep: number;
};
type Actions = {
  setCurrentStep: (step: number) => void;
};
export const useStepperStore = create<State & Actions>((set) => ({
  currentStep: 1,
  setCurrentStep: (step: number) => set({ currentStep: step }),
}));
