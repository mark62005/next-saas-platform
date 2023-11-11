import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "./ui/use-toast";
import Dropzone from "react-dropzone";
import { Cloud, File, Loader2 } from "lucide-react";
import { Progress } from "./ui/progress";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

type onDropProps = <T extends File>(acceptedFiles: T[]) => void;

const UploadDropzone = () => {
	const router = useRouter();

	const [isUploading, setIsUploading] = useState<boolean>(true);
	const [uploadProgress, setUploadProgress] = useState<number>(0);

	const { mutate: startPollingFile } = trpc.getFile.useMutation({
		onSuccess: (file) => {
			router.push(`/dashboard/${file.id}`);
		},
		retry: true,
		retryDelay: 500,
	});

	const { toast } = useToast();
	const { startUpload } = useUploadThing("pdfUploader");

	const startSimulateProgress = (): NodeJS.Timeout => {
		setUploadProgress(0);

		const interval = setInterval(() => {
			setUploadProgress((prevProgress) => {
				if (prevProgress >= 90) {
					clearInterval(interval);
					return prevProgress;
				}

				return prevProgress + 5;
			});
		}, 500);

		return interval;
	};

	const handleOnDrop: onDropProps = async (acceptedFiles) => {
		setIsUploading(true);
		console.log(acceptedFiles);

		const progressInterval = startSimulateProgress();

		// handle file uploading
		const res = await startUpload(acceptedFiles);

		if (!res) {
			return toast({
				title: "Something went wrong",
				description: "Please try again",
				variant: "destructive",
			});
		}

		const [fileResponse] = res;
		const key = fileResponse?.key;

		if (!key) {
			return toast({
				title: "Something went wrong",
				description: "Please try again",
				variant: "destructive",
			});
		}

		clearInterval(progressInterval);
		setUploadProgress(100);

		startPollingFile({ key });
	};

	return (
		<Dropzone
			multiple={false}
			onDrop={handleOnDrop}
		>
			{({ getRootProps, getInputProps, acceptedFiles }) => (
				<div
					className="h-64 m-4 border border-dashed border-gray-300 rounded-lg"
					{...getRootProps()}
				>
					<div className="flex justify-center items-center h-full w-full">
						<label
							htmlFor="dropzone-file"
							className="
                flex flex-col justify-center items-center 
                w-full h-full rounded-lg cursor-pointer 
                bg-gray-50 hover:bg-gray-100
              "
						>
							<div className="flex flex-col justify-center items-center pt-5 pb-6">
								<Cloud className="h-6 w-6 text-zinc-500 mb-2" />
								<p className="mb-2 text-sm text-zinc-700">
									<span className="font-semibold">Click to upload</span> or drag
									and drop
								</p>
								<p className="text-xs text-zinc-500">PDF (up to 4MB)</p>
							</div>

							{acceptedFiles && acceptedFiles[0] ? (
								<div
									className="
                    max-w-xs bg-white flex items-center rounded-md overflow-hidden 
                    outline oultine-[1px] outline-zinc-200 divide-x divide-zinc-200
                  "
								>
									<div className="px-3 py-2 h-full grid place-items-center">
										<File className="h-4 w-4 text-blue-500" />
									</div>
									<div className="px-3 py-2 h-full text-sm truncate">
										{acceptedFiles[0].name}
									</div>
								</div>
							) : null}

							{isUploading ? (
								<div className="w-full max-w-xs mt-4 mx-auto">
									<Progress
										value={uploadProgress}
										className="h-1 w-full bg-zinc-200"
										indicatorColor={
											uploadProgress === 100 ? "bg-green-500" : ""
										}
									/>
									{uploadProgress === 100 ? (
										<div className="flex gap-1 justify-center items-center text-sm text-zinc-700 text-center p-2">
											<Loader2 className="h-3 w-3 animate-spin" />
										</div>
									) : null}
								</div>
							) : null}

							<input
								type="file"
								name=""
								id="dropzone-file"
								className="hidden"
								{...getInputProps()}
							/>
						</label>
					</div>
				</div>
			)}
		</Dropzone>
	);
};
export default UploadDropzone;
