import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
	// /auth-callback: GET
	authCallback: publicProcedure.query(async () => {
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user.id || !user.email) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		// TODO: Check if user exists in the database

		return { success: true };
	}),
});

export type AppRouter = typeof appRouter;
