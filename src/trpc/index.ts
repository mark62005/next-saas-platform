import { publicProcedure, router } from "./trpc";

export const appRouter = router({
	test: publicProcedure.query(() => {
		return "Hello World";
		// return 3;
	}),
});

export type AppRouter = typeof appRouter;
