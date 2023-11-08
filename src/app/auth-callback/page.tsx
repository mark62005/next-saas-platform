import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { trpc } from "../_trpc/client";

const AuthCallback: FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const origin = searchParams.get("origin");

	const { data, isLoading } = trpc.test.useQuery();

	return <div>AuthCallback</div>;
};
export default AuthCallback;
