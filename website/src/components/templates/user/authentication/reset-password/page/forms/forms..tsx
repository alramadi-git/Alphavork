"use client";

import { Stepper, StepperContent, StepperNext } from "@/components/ui/stepper";

import ValidateEmailForm from "./validate-email-form";

export default function Forms() {
  return (
    <Stepper defaultValue="validate-email-form">
      <StepperContent value="validate-email-form">
        <ValidateEmailForm />
      </StepperContent>
      {/* <StepperContent value="otp-form">
        <OtpForm />
      </StepperContent>
      <StepperContent value="reset-password-form">
        <ResetPasswordForm />
      </StepperContent>
      <StepperContent value="reset-password-confirmed-form">
        <ResetPasswordConfirmedForm />
      </StepperContent> */}
    </Stepper>
  );
}
