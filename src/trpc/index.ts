import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";

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
	getFilesOfAUser: privateProcedure.query(async ({ ctx }) => {
		const { userId } = ctx;

		return await db.file.findMany({
			where: {
				userId,
			},
		});
	}),
});

export type AppRouter = typeof appRouter;
