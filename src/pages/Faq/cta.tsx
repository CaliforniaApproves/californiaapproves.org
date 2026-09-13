import { NavButton } from "../../components/common/buttons";

const CTA = () => {
	const jumpToPledge = () => {
		document.getElementById("pledge")?.scrollIntoView({ behavior: "smooth" });
	};
	const jumpToPlan = () => {
		document.getElementById("plan")?.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<section aria-label="Call to action" className="bg-orange text-center">
			<div className="max-w-[700px] m-auto px-16 py-16 flex flex-col gap-2">
				<h2 className="text-white">
					Ready to bring Approval Voting to California?
				</h2>
				<p className="text-base text-white/85 pt-3">
					Pledge your support and we'll follow up with next steps. Still have
					questions about our reform? Answers to the ones we hear most are just 
					below.
				</p>
				<span className="flex gap-8 justify-center">
					<NavButton
						color="green"
						variant="solid"
						link="/our-reforms/approval-primary#pledge"
						className="mx-auto whitespace-nowrap px-20 mt-9 bg-green hover:bg-green-high"
						size="lg"
						onClick={jumpToPledge}
					>
						ADD MY PLEDGE
					</NavButton>
					<NavButton
						color="purple"
						variant="solid"
						link="/our-reforms/approval-primary"
						className="mx-auto whitespace-nowrap px-20 mt-9"
						size="lg"
						onClick={jumpToPlan}
					>
						SEE THE PLAN
					</NavButton>
				</span>
			</div>
		</section>
	);
};

export default CTA;
