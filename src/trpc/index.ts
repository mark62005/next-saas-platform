import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";

export const appRouter = router({
	// /auth-callback: GET
	getAuthCallback: publicProcedure.query(async () => {
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user.id || !user.email) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		// Check if user exists in the database
		const dbUser = await db.user.findFirst({
			where: {
				id: user.id,
			},
		});

		if (!dbUser) {
			// Create new user in db
			await db.user.create({
				data: {
					id: user.id,
					email: user.email,
				},
			});
		}

		return { success: true };
	}),
	getFile: privateProcedure
		.input(z.object({ key: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { userId } = ctx;
			const file = await db.file.findFirst({
				where: {
					key: input.key,
					userId,
				},
			});

			if (!file || !file.id) throw new TRPCError({ code: "NOT_FOUND" });

			return file;
		}),
	getFilesOfAUser: privateProcedure.query(async ({ ctx }) => {
		const { userId } = ctx;

		return await db.file.findMany({
			where: {
				userId,
			},
		});
	}),
	deleteFile: privateProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { userId } = ctx;

			const file = await db.file.findFirst({
				where: {
					id: input.id,
					userId,
				},
			});

			// If file not found
			if (!file) throw new TRPCError({ code: "NOT_FOUND" });

			await db.file.delete({
				where: {
					id: input.id,
					userId,
				},
			});

			return { data: file, success: true };
		}),
});

export type AppRouter = typeof appRouter;
