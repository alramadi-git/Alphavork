"use client";

import { useTranslations } from "next-intl";

import { useId, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  tNewsletterCredentials,
  zNewsletterCredentials,
} from "@/features/user/validators/newsletter-credentials";

import { NewsletterSubscriptionService } from "@/features/user/services/newsletter-subscription";

import { toast } from "sonner";

import { IconLoader } from "@tabler/icons-react";

import {
  Field,
  FieldTitle,
  FieldGroup,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { tFieldEmailRef, FieldEmail } from "@/components/blocks/fields";

import { Button } from "@/components/ui/button";

export default function Newsletter() {
  const tNewsletter = useTranslations("app.user.layout.footer.newsletter");

  const id = useId();

  const {
    formState,
    control,
    reset: handleReset,
    handleSubmit,
  } = useForm<tNewsletterCredentials>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(zNewsletterCredentials),
  });

  const emailRef = useRef<tFieldEmailRef>(null);

  function reset() {
    handleReset();
    emailRef.current?.reset();
  }

  const newsletterService = new NewsletterSubscriptionService();
  async function onSubmit(newsletter: tNewsletterCredentials) {
    const response = await newsletterService.subscribe(newsletter);

    reset();

    if (!response.isSuccess) {
      toast.error(tNewsletter("alerts.error"));
      return;
    }

    toast.success(tNewsletter("alerts.success"));
  }

  return (
    <form className="space-y-3 md:max-w-96" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="xs:grid-cols-3 grid items-center gap-3">
        <Controller
          control={control}
          name="email"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
            formState,
          }) => (
            <Field data-invalid={invalid} className="col-span-2">
              <FieldLabel htmlFor={`${id}-email`}>
                {tNewsletter("email.label")}
              </FieldLabel>
              <FieldContent>
                <FieldEmail
                  ref={emailRef}
                  id={`${id}-email`}
                  isInvalid={invalid}
                  isDisabled={formState.isSubmitting}
                  isRequired
                  placeholder={tNewsletter("email.placeholder")}
                  defaultValue={value}
                  onValueChange={setValue}
                />
                {!error ? (
                  <FieldDescription>
                    {tNewsletter("email.description")}
                  </FieldDescription>
                ) : (
                  <FieldError errors={[error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
        <Button
          disabled={formState.isSubmitting}
          type="submit"
          className="w-full"
        >
          {formState.isSubmitting ? (
            <IconLoader className="size-4 animate-spin" />
          ) : (
            tNewsletter("actions.subscribe")
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
