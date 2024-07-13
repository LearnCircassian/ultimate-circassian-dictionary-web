import clsx, { ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  // ↓ Override elements from the default config
  //   It has the same shape as the `extend` object, so we're going to skip it here.
  override: {},
  // ↓ Extend values from the default config
  extend: {
    // ↓ Add values to existing theme scale or create a new one
    theme: {},
    // ↓ Add values to existing class groups or define new ones
    classGroups: {},
    // ↓ Here you can define additional conflicts across class groups
    conflictingClassGroups: {},
    // ↓ Define conflicts between postfix modifiers and class groups
    conflictingClassGroupModifiers: {},
  },
});

export const cn = (...classes: ClassValue[]) => customTwMerge(clsx(...classes));
