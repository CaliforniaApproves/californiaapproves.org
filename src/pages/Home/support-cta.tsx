import { NavButton } from "../../components/common/buttons";

const SupportCTA = () => {
	return (
		<div className="bg-white border-purple rounded-[50px] border-[6px] p-5 lg:p-12 text-center flex flex-col items-center gap-5">
			<h2 className="text-green">Our Primary Reform</h2>
			<p className="text-base">
				The Approval Voting for Primary Elections Act finds where Californians
				agree by letting voters support every candidate they approve of. Pledge
				your support now, and we'll follow up when the official petition is
				ready to sign.
			</p>
			<div className="flex flex-col gap-4">
				<NavButton
					variant="solid"
					color="orange"
					size="lg"
					link="/our-reforms/approval-primary#pledge"
					className="w-[200px] whitespace-nowrap px-10"
				>
					Pledge your support
				</NavButton>
				<NavButton
					variant="outlined"
					color="orange"
					size="lg"
					link="/our-reforms/approval-primary"
					className="w-[200px] whitespace-nowrap px-10 text-orange"
				>
					See the plan
				</NavButton>
			</div>
		</div>
	);
};

//make this component available to the app
export default SupportCTA;
