import { create } from "zustand";
type State = {
  currentStep: number;
  allowedStep: number;
};
type Actions = {
  setCurrentStep: (step: number) => void;
  setAllowedStep: (step: number) => void 
};
export const useStepperStore = create<State & Actions>((set) => ({
  currentStep: 1,
  allowedStep: 1,
  setCurrentStep: (step: number) => set({ currentStep: step }),
  setAllowedStep: (step) =>
    set((state) => ({
      allowedStep: step > state.allowedStep ? step : state.allowedStep,
    }))
}));
