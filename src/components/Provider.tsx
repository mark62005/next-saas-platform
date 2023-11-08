"use client";
import { FC, PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";
import { httpBatchLink } from "@trpc/client";
import { getBaseUrl } from "@/lib/utils";

const Provider: FC = ({ children }: PropsWithChildren) => {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					/**
					 * If you want to use SSR, you need to use the server's full URL
					 * @link https://trpc.io/docs/ssr
					 **/
					url: `${getBaseUrl()}/api/trpc`,
					// You can pass any HTTP headers you wish here
					async headers() {
						return {
							// authorization: getAuthCookie(),
						};
					},
				}),
			],
		})
	);

	return (
		<trpc.Provider
			client={trpcClient}
			queryClient={queryClient}
		>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
};
export default Provider;
