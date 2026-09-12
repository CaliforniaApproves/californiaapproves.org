import orangeCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Orange-Circle-w-Check-RGB-KO.svg";
import whiteCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-White-Circle-w-Check-RGB-KO.svg";
import yellowCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Yellow-Circle-w-Check-RGB-KO.svg";
import { NavButton } from "../../components/common/buttons";

const checkmarks = [
	{ icon: whiteCircleCheck, label: "More Choice" },
	{ icon: orangeCircleCheck, label: "Fair Competition" },
	{ icon: yellowCircleCheck, label: "Better Representation" },
];

// create a component
const PrimaryCallout = () => {
	return (
		<section
			aria-label="Our primary reform"
			className="bg-purple text-white text-center px-8 py-16 lg:py-24"
		>
			<div className="max-w-[760px] mx-auto flex flex-col items-center gap-5">
				<h4 className="text-tan">OUR PRIMARY REFORM</h4>
				<h2 className="text-white">
					Fix California's primaries with one sentence on the ballot
				</h2>
				<p className="text-base text-white/85 max-w-[620px]">
					Choose-one primaries split the vote and send forward candidates most
					voters never wanted. The Approval Primary Act lets voters support
					every candidate they approve of — no limit, nothing new to learn.
				</p>
				<div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-1">
					{checkmarks.map((p) => (
						<div key={p.label} className="flex items-center gap-2">
							<img
								src={p.icon}
								alt=""
								width="24"
								height="16"
								className="aspect-169/158"
							/>
							<span className="text-small font-bold whitespace-nowrap">
								{p.label}
							</span>
						</div>
					))}
				</div>
				<div className="flex flex-col sm:flex-row gap-4 mt-5">
					<NavButton
						variant="solid"
						color="orange"
						size="lg"
						link="/our-reforms/approval-primary#pledge"
						className="w-auto! whitespace-nowrap px-10"
					>
						Pledge your support
					</NavButton>
					<NavButton
						variant="outlined"
						color="orange"
						size="lg"
						link="/our-reforms/approval-primary"
						className="w-auto! whitespace-nowrap px-10 text-white"
					>
						See the plan
					</NavButton>
				</div>
			</div>
		</section>
	);
};

//make this component available to the app
export default PrimaryCallout;
