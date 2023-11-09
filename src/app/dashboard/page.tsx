import { FC } from "react";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";
import Dashboard from "@/components/Dashboard";

const AUTH_CALLBACK_PATH: string = "/auth-callback?origin=dashboard";

const Page: FC = async () => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	// Check if user has logged in
	if (!user || !user.id) redirect(AUTH_CALLBACK_PATH);

	// Check if user exists in db
	const dbUser = await db.user.findFirst({
		where: {
			id: user.id,
		},
	});
	if (!dbUser) redirect(AUTH_CALLBACK_PATH);

	return <Dashboard />;
};
export default Page;
