"use client";

import { useLocale, useTranslations } from "next-intl";

import { localeEnum } from "@/features/i18n/enums/locale";
import { DateFormatterLibrary } from "@/features/formats/libraries/date-formatter-library";

import { useRouter } from "@/features/i18n/navigation";
import { useId, useRef } from "react";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/features/user/validators/register-credentials";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useAuthentication from "@/features/user/hooks/authentication";

import { toast } from "sonner";

import {
  IconUser,
  IconMap,
  IconRoad,
  IconLoader,
  IconBuilding,
  IconMapPin,
} from "@tabler/icons-react";

import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";

import {
  tFieldInputRef,
  tFieldPhoneNumberRef,
  tFieldEmailRef,
  tFieldPasswordRef,
  tFieldNumberRef,
  FieldInput,
  FieldPhoneNumber,
  FieldEmail,
  FieldPassword,
  FieldNumber,
} from "@/components/blocks/fields";

import {
  tFieldDatePickerRef,
  FieldDatePicker,
} from "@/components/blocks/date-pickers";

import {
  tFieldFileUploadRef,
  FieldFileUpload,
} from "@/components/blocks/file-uploads";

import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/blocks/links";

export default function Form() {
  const tForm = useTranslations("app.user.authentication.register.page.form");

  const locale = useLocale() as localeEnum;
  const clsDateFormatter = new DateFormatterLibrary(locale);

  const id = useId();
  const router = useRouter();

  const avatarRef = useRef<tFieldFileUploadRef>(null);

  const usernameRef = useRef<tFieldInputRef>(null);
  const birthdayRef = useRef<tFieldDatePickerRef>(null);

  const countryRef = useRef<tFieldInputRef>(null);
  const cityRef = useRef<tFieldInputRef>(null);
  const streetRef = useRef<tFieldInputRef>(null);

  const latitudeRef = useRef<tFieldNumberRef>(null);
  const longitudeRef = useRef<tFieldNumberRef>(null);

  const phoneNumberRef = useRef<tFieldPhoneNumberRef>(null);

  const emailRef = useRef<tFieldEmailRef>(null);
  const passwordRef = useRef<tFieldPasswordRef>(null);

  const {
    formState,
    control,
    reset: handleReset,
    handleSubmit,
  } = useForm<tRegisterCredentials>({
    defaultValues: {
      avatar: null,
      rememberMe: false,
    },
    resolver: zodResolver(zRegisterCredentials),
  });

  const { register } = useAuthentication();

  function onReset() {
    handleReset();

    avatarRef.current?.reset();

    usernameRef.current?.reset();
    birthdayRef.current?.reset();

    phoneNumberRef.current?.reset();

    countryRef.current?.reset();
    cityRef.current?.reset();
    streetRef.current?.reset();

    latitudeRef.current?.reset();
    longitudeRef.current?.reset();

    emailRef.current?.reset();
    passwordRef.current?.reset();
  }

  async function onSubmit(credentials: tRegisterCredentials) {
    const isSuccess = await register(credentials);

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
      <FieldGroup className="grid gap-3 sm:grid-cols-2">
        <Controller
          control={control}
          name="avatar"
          render={({
            field: { onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={`${id}-avatar`} className="max-w-fit">
                {tForm("avatar.label")}
              </FieldLabel>
              <FieldContent className="size-full">
                <FieldFileUpload
                  ref={avatarRef}
                  id={`${id}-avatar`}
                  isInvalid={invalid}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errors={[error]} />
            </Field>
          )}
        />
        <FieldGroup className="gap-3">
          <Controller
            control={control}
            name="username"
            render={({
              field: { onChange: setValue },
              fieldState: { invalid, error },
            }) => (
              <Field data-invalid={invalid}>
                <FieldLabel htmlFor={`${id}-username`} className="max-w-fit">
                  {tForm("username.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldInput
                    ref={usernameRef}
                    id={`${id}-username`}
                    icon={<IconUser className="size-4" />}
                    isInvalid={invalid}
                    isRequired
                    placeholder={tForm("username.placeholder")}
                    onValueChange={setValue}
                  />
                </FieldContent>
                <FieldError errors={[error]} />
              </Field>
            )}
          />
          <Controller
            control={control}
            name="birthday"
            render={({
              field: { onChange: setValue },
              fieldState: { invalid, error },
            }) => (
              <Field data-invalid={invalid}>
                <FieldLabel htmlFor={`${id}-birthday`} className="max-w-fit">
                  {tForm("birthday.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldDatePicker
                    ref={birthdayRef}
                    id={`${id}-birthday`}
                    isInvalid={invalid}
                    isRequired
                    placeholder={
                      tForm.rich("birthday.placeholder", {
                        date: () =>
                          clsDateFormatter.format(
                            new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() - 18,
                              ),
                            ),
                          ),
                      }) as string
                    }
                    onValueChange={setValue}
                  />
                </FieldContent>
                <FieldError errors={[error]} />
              </Field>
            )}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({
              field: { onChange: setValue },
              fieldState: { invalid, error },
            }) => (
              <Field data-invalid={invalid}>
                <FieldLabel
                  htmlFor={`${id}-phone-number`}
                  className="max-w-fit"
                >
                  {tForm("phone-number.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldPhoneNumber
                    ref={phoneNumberRef}
                    id={`${id}-phone-number`}
                    isInvalid={invalid}
                    isRequired
                    onValueChange={setValue}
                  />
                </FieldContent>
                <FieldError errors={[error]} />
              </Field>
            )}
          />
        </FieldGroup>
      </FieldGroup>
      <FieldGroup className="grid grid-cols-2 gap-3">
        <Controller
          control={control}
          name="location.country"
          render={({
            field: { onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel
                htmlFor={`${id}-location-country`}
                className="max-w-fit"
              >
                {tForm("location.country.label")}
              </FieldLabel>
              <FieldContent>
                <FieldInput
                  ref={countryRef}
                  icon={<IconMap className="size-4" />}
                  id={`${id}-location-country`}
                  isInvalid={invalid}
                  isRequired
                  placeholder={tForm("location.country.placeholder")}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errors={[error]} />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="location.city"
          render={({
            field: { onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={`${id}-location-city`} className="max-w-fit">
                {tForm("location.city.label")}
              </FieldLabel>
              <FieldContent>
                <FieldInput
                  ref={cityRef}
                  icon={<IconBuilding className="size-4" />}
                  id={`${id}-location-city`}
                  isInvalid={invalid}
                  isRequired
                  placeholder={tForm("location.city.placeholder")}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errors={[error]} />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="location.street"
          render={({
            field: { onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid} className="col-span-2">
              <FieldLabel
                htmlFor={`${id}-location-street`}
                className="max-w-fit"
              >
                {tForm("location.street.label")}
              </FieldLabel>
              <FieldContent>
                <FieldInput
                  ref={streetRef}
                  icon={<IconRoad className="size-4" />}
                  id={`${id}-location-street`}
                  isInvalid={invalid}
                  isRequired
                  placeholder={tForm("location.street.placeholder")}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errors={[error]} />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="location.latitude"
          render={({
            field: { onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel
                htmlFor={`${id}-location-latitude`}
                className="max-w-fit"
              >
                {tForm("location.latitude.label")}
              </FieldLabel>
              <FieldContent>
                <FieldNumber
                  ref={latitudeRef}
                  icon={<IconMapPin className="size-4" />}
                  id={`${id}-location-latitude`}
                  isInvalid={invalid}
                  isRequired
                  placeholder={tForm("location.latitude.placeholder")}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errors={[error]} />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="location.longitude"
          render={({
            field: { onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel
                htmlFor={`${id}-location-longitude`}
                className="max-w-fit"
              >
                {tForm("location.longitude.label")}
              </FieldLabel>
              <FieldContent>
                <FieldNumber
                  ref={longitudeRef}
                  icon={<IconMapPin className="size-4" />}
                  id={`${id}-location-longitude`}
                  isInvalid={invalid}
                  isRequired
                  placeholder={tForm("location.longitude.placeholder")}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errors={[error]} />
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup className="grid grid-cols-2 gap-3">
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
              <FieldLabel htmlFor={`${id}-password`} className="max-w-fit">
                {tForm("password.label")}
              </FieldLabel>
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
        {tForm.rich("terms-and-privacy", {
          "terms-of-service": (chunk) => (
            <Link
              href="/terms-of-service"
              className="text-sm text-white hover:underline"
            >
              {chunk}
            </Link>
          ),
          "privacy-policy": (chunk) => (
            <Link
              href="/privacy-policy"
              className="text-sm text-white hover:underline"
            >
              {chunk}
            </Link>
          ),
        })}
      </p>
      <p className="text-muted-foreground">
        {tForm.rich("login", {
          link: (chunk) => (
            <Link
              href="/authentication/login"
              className="text-card-foreground hover:underline"
            >
              {chunk}
            </Link>
          ),
        })}
      </p>
    </form>
  );
}
