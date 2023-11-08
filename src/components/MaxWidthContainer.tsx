import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

type MaxWidthContainerProps = {
	className?: string;
	children: ReactNode;
};

const MaxWidthContainer: FC<MaxWidthContainerProps> = ({
	className,
	children,
}) => {
	return (
		<div
			className={cn(
				"mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
				className
			)}
		>
			{children}
		</div>
	);
};
export default MaxWidthContainer;
