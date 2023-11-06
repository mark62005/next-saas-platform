import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const getClassNames = (...inputs: ClassValue[]): string => {
	return twMerge(clsx(inputs));
};
