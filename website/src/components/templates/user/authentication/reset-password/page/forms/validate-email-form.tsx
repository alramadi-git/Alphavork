"use client";

import { useTranslations } from "next-intl";

import { useId, useRef } from "react";

import {
  tValidateEmailCredentials,
  zValidateEmailCredentials,
} from "@/validations/validate-email-credentials";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";

import { tFieldEmailRef, FieldEmail } from "@/components/blocks/fields";

export default function ValidateEmailForm() {
  const tValidateEmailForm = useTranslations(
    "app.user.authentication.reset-password.page.forms.validate-email-form",
  );

  const id = useId();

  const emailRef = useRef<tFieldEmailRef>(null);

  const { control, handleSubmit } = useForm<tValidateEmailCredentials>({
    resolver: zodResolver(zValidateEmailCredentials),
  });

  async function onSubmit(credentials: tValidateEmailCredentials) {}

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="email"
        render={({
          field: { onChange: setValue },
          fieldState: { invalid, error },
        }) => (
          <Field data-invalid={invalid}>
            <FieldLabel htmlFor={`${id}-email`} className="max-w-fit">
              {tValidateEmailForm("email.label")}
            </FieldLabel>
            <FieldContent>
              <FieldEmail
                ref={emailRef}
                id={`${id}-email`}
                isInvalid={invalid}
                isRequired
                placeholder={tValidateEmailForm("email.placeholder")}
                onValueChange={setValue}
              />
            </FieldContent>
            <FieldError errors={[error]} />
          </Field>
        )}
      />

      
    </form>
  );
}
