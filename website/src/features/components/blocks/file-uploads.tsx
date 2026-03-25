"use client";

import { UndefinableType, NullableType } from "@/common/types/nullish.type";

import { useTranslations } from "next-intl";

import {
  useState,
  forwardRef,
  useImperativeHandle,
  Fragment,
  useRef,
} from "react";

import { useDropzone, FileRejection } from "react-dropzone";

import { cn } from "@/lib/utils";

import { toast } from "sonner";

import { IconUpload } from "@tabler/icons-react";

type tFieldFileUploadRef = {
  setValue: (value: UndefinableType<File>) => void;
  reset: (defaultValue?: File) => void;
};

type tFieldFileUploadProps = {
  id?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  defaultValue?: File;
  onValueChange?: (value: UndefinableType<File>) => void;
};

const FieldFileUpload = forwardRef<tFieldFileUploadRef, tFieldFileUploadProps>(
  (
    {
      id,
      isInvalid,
      isDisabled,
      defaultValue,
      onValueChange: onValueChangeProp,
    },
    ref,
  ) => {
    const tFileUpload = useTranslations("components.fields.file-upload");

    const [value, setValue] = useState<NullableType<File>>(defaultValue ?? null);

    const inputRef = useRef<HTMLInputElement>(null);

    const { isDragActive, getRootProps, getInputProps } = useDropzone({
      noClick: true,
      multiple: false,
      maxFiles: 1,
      onDrop: onValueChange,
    });

    function imperativeSetValue(value: UndefinableType<File>) {
      setValue(value ?? null);
    }

    function imperativeReset(defaultValue?: File) {
      setValue(defaultValue ?? null);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeReset,
    }));

    function onError(fileRejections: FileRejection[]) {
      fileRejections.forEach(({ file }) => {
        toast.error(file.name, {
          description: tFileUpload("alerts.error"),
        });
      });
    }

    function onValueChange(
      acceptedFiles: File[],
      fileRejections: FileRejection[],
    ) {
      onError(fileRejections);

      const file = acceptedFiles[0] ?? value;

      setValue(file);
      onValueChangeProp?.(file);
    }

    return (
      <div
        aria-invalid={isInvalid}
        aria-disabled={isDisabled}
        className={cn(
          "aria-invalid:border-destructive border-border flex size-full flex-col items-center justify-center gap-3 rounded border-2 border-dashed p-8 duration-200",
          {
            "aria-invalid:bg-destructive/10 bg-border/60": isDragActive,
          },
        )}
        {...getRootProps()}
      >
        <div
          aria-invalid={isInvalid}
          className="aria-invalid:border-destructive/20 border-muted rounded-full border-2 p-3"
        >
          <IconUpload
            aria-invalid={isInvalid}
            className="aria-invalid:text-destructive/80 text-muted-foreground size-5"
          />
        </div>
        <div className="space-y-1 text-center">
          {value ? (
            <Fragment>
              <p
                aria-invalid={isInvalid}
                className="aria-invalid:text-destructive text-primary font-medium"
              >
                {value.name}
              </p>
              <p
                aria-invalid={isInvalid}
                className="aria-invalid:text-destructive/80 text-muted-foreground text-sm font-medium"
              >
                {tFileUpload("title")}{" "}
                {tFileUpload.rich("help", {
                  trigger: (chunk) => (
                    <label
                      aria-invalid={isInvalid}
                      className="aria-invalid:text-destructive text-primary cursor-pointer hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        inputRef.current?.click();
                      }}
                    >
                      {chunk}
                    </label>
                  ),
                })}
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <p
                aria-invalid={isInvalid}
                className="aria-invalid:text-destructive text-primary font-medium"
              >
                {tFileUpload("title")}
              </p>
              <p
                aria-invalid={isInvalid}
                className="aria-invalid:text-destructive/80 text-muted-foreground text-sm font-medium"
              >
                {tFileUpload.rich("help", {
                  trigger: (chunk) => (
                    <label
                      aria-invalid={isInvalid}
                      className="aria-invalid:text-destructive text-primary cursor-pointer hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        inputRef.current?.click();
                      }}
                    >
                      {chunk}
                    </label>
                  ),
                })}
              </p>
            </Fragment>
          )}
        </div>
        <input
          {...getInputProps({
            ref: inputRef,
            id,
            className: "hidden",
          })}
        />
      </div>
    );
  },
);

FieldFileUpload.displayName = "FieldFileUpload";

export type { tFieldFileUploadRef };

export { FieldFileUpload };
