"use client";
import { FC, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import UploadDropzone from "./UploadDropzone";

const UploadButton: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(isVisible) => {
				if (!isVisible) {
					setIsOpen(isVisible);
				}
			}}
		>
			<DialogTrigger
				onClick={() => setIsOpen(true)}
				asChild
			>
				<Button>Upload PDF</Button>
			</DialogTrigger>

			<DialogContent>
				<UploadDropzone />
			</DialogContent>
		</Dialog>
	);
};
export default UploadButton;
