import { useStepperStore } from "@store/useStepperStore";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const RegistrationGuard = ({ stepIndex, children }) => {
  const { currentStep, allowedStep } = useStepperStore();
  const navigate = useNavigate();

  // Prevent backward navigation to previous steps
  useEffect(() => {
    if (currentStep === 1) {
      
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = ""; 
        navigate("/register/phonenumber");
      };

      // Attaching the event listener for the back button
      window.addEventListener("beforeunload", handleBeforeUnload);

      // Cleaning up the event listener when the component is unmounted
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [currentStep, navigate]);
  // If the user tries to access a step ahead of their allowed progress
  if (stepIndex > allowedStep) {
    const steps = ["phonenumber", "validateOtp", "fullname", "extraInfo", 'successful'];
    const validPath = `/register/${steps[allowedStep - 1]}`;
    return <Navigate to={validPath} replace />;
  }

  // If the user tries to access a step behind their current step
  if (stepIndex < currentStep) {
    const steps = [
      "phonenumber",
      "validateOtp",
      "fullname",
      "extraInfo",
      "successful",
    ];
    const validPath = `/register/${steps[currentStep - 1]}`;
    return <Navigate to={validPath} replace />;
  }

  return children;
};
