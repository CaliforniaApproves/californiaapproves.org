import { ActionButton } from "../../components/common/buttons";

const MidCTA = () => {
	const scrollToPledge = () => {
		document.getElementById("pledge")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="bg-orange text-center py-16 lg:py-20">
			<div className="max-w-[700px] m-auto px-8">
				<h2 className="text-white">
					Ready to bring Approval Voting to California?
				</h2>
				<p className="text-large text-white/85 mt-3">
					Pledge your support and we'll follow up with next
					steps. Still have questions? Answers to the
					ones we hear most are just below.
				</p>
				<ActionButton
					color="green"
					variant="solid"
					className="mx-auto whitespace-nowrap px-20 mt-9 bg-green hover:bg-green-high"
					size="lg"
					onClick={scrollToPledge}
				>
					ADD MY PLEDGE
				</ActionButton>
			</div>
		</div>
	);
};

export default MidCTA;