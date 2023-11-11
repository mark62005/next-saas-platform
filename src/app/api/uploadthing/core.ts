import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";
import { TRPCError } from "@trpc/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

/**
 * 	Uploading process:
 * 	1. User submit request
 * 	2. middleware -> make sure user is authenticated
 * 	3. webhook (onUploadComplete) ->
 */

const f = createUploadthing();

export const uploadRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			const { getUser } = getKindeServerSession();
			const user = await getUser();

			if (!user || !user.id) throw new TRPCError({ code: "UNAUTHORIZED" });

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			const createdFile = await db.file.create({
				data: {
					key: file.key,
					name: file.name,
					userId: metadata.userId,
					url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
					uploadStatus: "PROCESSING",
				},
			});
			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
		}),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
