"use client";
import { FC, useState } from "react";
import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import { Ghost } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import FileCard from "./FileCard";

/**
 * Functions:
 * 1. List all files
 * 2. Upload a file
 * 3. Delete a file
 */

const Dashboard: FC = () => {
	const [currentlyDeletingFileId, setCurrentlyDeletingFileId] = useState<
		string | null
	>(null);

	const trpcUtils = trpc.useUtils();

	// client-side utility --> use client
	const { data: files, isLoading } = trpc.getFilesOfAUser.useQuery(undefined, {
		onSuccess: () => {},
		onError: () => {},
	});

	const { mutate: deleteFile } = trpc.deleteFile.useMutation({
		onMutate({ id }) {
			setCurrentlyDeletingFileId(id);
		},
		onSuccess: () => {
			trpcUtils.getFilesOfAUser.invalidate();
		},
		onSettled() {
			setCurrentlyDeletingFileId(null);
		},
	});

	return (
		<main className="mx-auto max-w-7xl md:p-10">
			<div
				className="
          flex flex-col items-start justify-between gap-4 
          border-b border-gray-200 mt-8 pb-5
          sm:flex-row sm:items-center sm:gap-0
        "
			>
				<h1 className="mb-3 font-bold text-5xl text-gray-900">My Files</h1>

				<UploadButton />
			</div>

			{/* Display all files of a user */}
			{files && files?.length !== 0 ? (
				<ul className="mt-8 grid grid-cols-1 gap-6 divide-y-0 divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
					{files
						.sort(
							(a, b) =>
								new Date(b.createdAt).getTime() -
								new Date(a.createdAt).getTime()
						)
						.map((file) => (
							<FileCard
								key={file.id}
								file={file}
								onDeleteButtonClick={() => deleteFile({ id: file.id })}
								currentlyDeletingFileId={currentlyDeletingFileId}
							/>
						))}
				</ul>
			) : isLoading ? (
				// Loading
				<Skeleton
					height={100}
					className="my-2"
					count={3}
				/>
			) : (
				// No files
				<div className="mt-16 flex flex-col items-center gap-2">
					<Ghost className="h-8 w-8 text-zinc-800" />
					<h3 className="font-semibold text-xl">Pretty empty around here.</h3>
					<p>Let&apos;s upload your first PDF.</p>
				</div>
			)}
		</main>
	);
};
export default Dashboard;
