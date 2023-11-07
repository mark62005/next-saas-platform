import { FC, Fragment } from "react";

import Link from "next/link";
import MaxWidthContainer from "./MaxWidthContainer";
import { buttonVariants } from "./ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";

const Navbar: FC = () => {
	return (
		<header
			className="
        sticky h-14 inset-x-0 top-0 z-30 w-full 
        border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all
      "
		>
			<MaxWidthContainer>
				<div className="flex h-14 items-center justify-between border-b border-zinc-200">
					{/* LOGO */}
					<Link
						href="/"
						className="flex z-40 font-semibold"
					>
						<span>LOGO</span>
					</Link>

					{/* TODO: Add mobile navbar */}

					<div className="hidden items-center space-x-4 sm:flex">
						<Fragment>
							<Link
								href="/pricing"
								className={buttonVariants({
									variant: "ghost",
									size: "sm",
								})}
							>
								Pricing
							</Link>

							{/* Auth */}
							{/* https://kinde.com/ */}
							<LoginLink
								className={buttonVariants({
									variant: "ghost",
									size: "sm",
								})}
							>
								Sign In
							</LoginLink>
							<RegisterLink
								className={buttonVariants({
									size: "sm",
								})}
							>
								Get Started <ArrowRight className="ml-1.5 h-5 w-5" />
							</RegisterLink>
						</Fragment>
					</div>
				</div>
			</MaxWidthContainer>
		</header>
	);
};
export default Navbar;
