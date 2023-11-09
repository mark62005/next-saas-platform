import { MouseEventHandler } from "react";
import Link from "next/link";
import { $Enums } from "@prisma/client";
import { format } from "date-fns";
import { Plus, MessageSquare, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

type File = {
	userId: string | null;
	id: string;
	name: string;
	uploadStatus: $Enums.UploadStatus;
	url: string;
	key: string;
	createdAt: string;
	updatedAt: string;
};

type FileCardProps = {
	file: File;
	onDeleteButtonClick: MouseEventHandler<HTMLButtonElement>;
	currentlyDeletingFileId: string | null;
};

const FileCard = ({
	file,
	onDeleteButtonClick,
	currentlyDeletingFileId,
}: FileCardProps) => {
	return (
		<li
			key={file.id}
			className="col-span-1 divide-y-0 divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
		>
			<Link
				href={`/dashboard/${file.id}`}
				className="flex flex-col gap-2"
			>
				<div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
					{/* Decoration */}
					<div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
					{/* File name */}
					<div className="flex-1 truncate">
						<div className="flex items-center space-x-3">
							<h3 className="truncate text-lg font-medium text-zinc-900">
								{file.name}
							</h3>
						</div>
					</div>
				</div>
			</Link>

			<div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
				{/* Created At */}
				<div className="flex items-center gap-2">
					<Plus className="h-4 w-4" />
					Created At: {format(new Date(file.createdAt), "MMM yyyy")}
				</div>

				{/* Message */}
				<div className="flex items-center gap-2">
					<MessageSquare className="h-4 w-4" />
					Mocked
				</div>

				{/* Delete Button */}
				<Button
					size="sm"
					variant="destructive"
					className="w-full"
					onClick={onDeleteButtonClick}
				>
					{currentlyDeletingFileId === file.id ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						<Trash className="h-4 w-4" />
					)}
				</Button>
			</div>
		</li>
	);
};
export default FileCard;
