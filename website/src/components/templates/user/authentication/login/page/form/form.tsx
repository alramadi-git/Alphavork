"use client";

import { useTranslations } from "next-intl";

import { useId, useRef } from "react";
import { useRouter } from "@/features/i18n/navigation";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/login-credentials";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useAuthentication from "@/features/user/hooks/authentication";

import { toast } from "sonner";

import { IconLoader } from "@tabler/icons-react";

import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
  FieldSeparator,
} from "@/components/ui/field";

import {
  tFieldEmailRef,
  tFieldPasswordRef,
  FieldEmail,
  FieldPassword,
} from "@/components/blocks/fields";

import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/blocks/links";
import Providers from "./providers";

export default function Form() {
  const tForm = useTranslations("app.user.authentication.login.page.form");

  const id = useId();
  const router = useRouter();

  const emailRef = useRef<tFieldEmailRef>(null);
  const passwordRef = useRef<tFieldPasswordRef>(null);

  const {
    formState,
    control,
    reset: handleReset,
    handleSubmit,
  } = useForm<tLoginCredentials>({
    defaultValues: {
      rememberMe: false,
    },
    resolver: zodResolver(zLoginCredentials),
  });

  const { login } = useAuthentication();

  function onReset() {
    handleReset();

    emailRef.current?.reset();
    passwordRef.current?.reset();
  }

  async function onSubmit(credentials: tLoginCredentials) {
    const isSuccess = await login(credentials);

    if (!isSuccess) {
      toast.error(tForm("alerts.error"));

      return;
    }

    toast.success(tForm("alerts.success"));

    router.push("/");
  }

  return (
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <form
      aria-disabled={formState.isSubmitting}
      className="space-y-3"
      onReset={onReset}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldGroup className="gap-3">
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={`${id}-email`} className="max-w-fit">
                {tForm("email.label")}
              </FieldLabel>
              <FieldContent>
                <FieldEmail
                  ref={emailRef}
                  id={`${id}-email`}
                  isInvalid={invalid}
                  isRequired
                  placeholder={tForm("email.placeholder")}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errors={[error]} />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <div className="flex items-center justify-between gap-3">
                <FieldLabel htmlFor={`${id}-password`} className="max-w-fit">
                  {tForm("password.label")}
                </FieldLabel>
                <Link
                  href="/authentication/reset-password"
                  className="text-sm hover:underline"
                >
                  {tForm("password.forgot-password")}
                </Link>
              </div>
              <FieldContent>
                <FieldPassword
                  ref={passwordRef}
                  id={`${id}-password`}
                  isInvalid={invalid}
                  isRequired
                  placeholder={tForm("password.placeholder")}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errors={[error]} />
            </Field>
          )}
        />
      </FieldGroup>
      <Controller
        control={control}
        name="rememberMe"
        render={({
          field: { onChange: setValue },
          fieldState: { invalid, error },
        }) => (
          <Field data-invalid={invalid}>
            <FieldContent>
              <FieldLabel
                htmlFor={`${id}-remember-me`}
                className="hover:bg-accent/50 w-full cursor-pointer flex-row items-start gap-2 rounded border p-3"
              >
                <Checkbox id={`${id}-remember-me`} onCheckedChange={setValue} />
                <div className="grid gap-2">
                  <p className="leading-4">{tForm("remember-me.label")}</p>
                  <p className="text-muted-foreground text-xs">
                    {tForm("remember-me.description")}
                  </p>
                </div>
              </FieldLabel>
            </FieldContent>
            <FieldError errors={[error]} />
          </Field>
        )}
      />
      <FieldGroup className="grid grid-cols-3 gap-3">
        <Button
          type="submit"
          className="col-span-3 justify-start gap-1 sm:col-span-2"
        >
          {formState.isSubmitting && (
            <IconLoader className="size-4 animate-spin" />
          )}
          {tForm("actions.submit")}
        </Button>
        <Button
          type="reset"
          variant="outline"
          className="col-span-3 justify-start gap-1 sm:col-span-1"
        >
          {tForm("actions.reset")}
        </Button>
      </FieldGroup>
      <p className="text-muted-foreground">
        {tForm.rich("create-new-account", {
          link: (chunk) => (
            <Link
              href="/authentication/register"
              className="text-card-foreground hover:underline"
            >
              {chunk}
            </Link>
          ),
        })}
      </p>
      <FieldSeparator className="my-6 *:data-[slot=field-separator-content]:bg-transparent">
        {tForm("separator")}
      </FieldSeparator>
      <Providers />
    </form>
  );
}
