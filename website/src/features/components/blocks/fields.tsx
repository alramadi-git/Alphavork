"use client";

import { useTranslations } from "next-intl";

import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { defaultCountries, FlagImage } from "react-international-phone";

import {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  useEffect,
} from "react";

import { IconChevronDown, IconCheck, IconPhone } from "@tabler/icons-react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

import { Button } from "../ui/button";

type tCountry = {
  iso: string;
  "country-code": string;
};
