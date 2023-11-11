import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { UploadRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing } = generateReactHelpers<UploadRouter>();
