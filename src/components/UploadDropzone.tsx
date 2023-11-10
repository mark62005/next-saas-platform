import { useState } from "react";
import Dropzone from "react-dropzone";
import { Cloud, File } from "lucide-react";
import { Progress } from "./ui/progress";

const UploadDropzone = () => {
	const [isUploading, setIsUploading] = useState<boolean>(true);
	const [uploadProgress, setUploadProgress] = useState<number>(0);

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

	return (
		<Dropzone
			multiple={false}
			onDrop={async (acceptedFiles) => {
				setIsUploading(true);
				console.log(acceptedFiles);

				const progressInterval = startSimulateProgress();

				// handle file uploading
				await new Promise((resolve) => setTimeout(resolve, 500));

				clearInterval(progressInterval);
				setUploadProgress(100);
			}}
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
									/>
								</div>
							) : null}
						</label>
					</div>
				</div>
			)}
		</Dropzone>
	);
};
export default UploadDropzone;
