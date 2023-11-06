import MaxWidthContainer from "./components/MaxWidthContainer";

export default function Home() {
	return (
		<main>
			<MaxWidthContainer
				className="
					mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center
				"
			>
				<div
					className="
						mx-auto mb-4 max-w-fit flex items-center justify-center space-x-2 overflow-hidden 
						rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all 
						hover:border-gray-300 hover:bg-white/50
					"
				>
					<p className="text-sm font-semibold text-gray-700">
						SaaS Platform is now public!
					</p>
				</div>
			</MaxWidthContainer>
		</main>
	);
}
