import orangeCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Orange-Circle-w-Check-RGB.svg";
import purpleCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Purple-Circle-w-Check-RGB.svg";
import yellowCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Yellow-Circle-w-Check-RGB.svg";
import Background from "../../assets/images/Group-39.svg";
import HeroCTA from "./cta-hero";

const Hero = () => {
	return (
		// The banner reads in mobile order: heading + value props, then the CTA,
		// then the explanatory paragraphs. A grid puts them
		// together on desktop, where the heading and paragraphs share the
		// left column and the CTA spans both rows on the right.
		<div
			className="caa-home-page-banner w-full grid grid-cols-1 justify-center pt-[30px] lg:grid-cols-[auto_40%] lg:content-center"
			style={{
				backgroundImage: `url(${Background})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
			id="top"
		>
			<div className="px-8 pb-14 lg:pb-0 lg:col-start-1 lg:row-start-1">
				<h2 className="text-green banner-drop-shadow pt-4">
					Approve every candidate you support. Not just one.
				</h2>
				<div className="flex flex-wrap items-center gap-3 pt-9">
					<div className="flex items-center gap-2">
						<img
							src={purpleCircleCheck}
							alt="purple check"
							width="24"
							height="16"
							className="aspect-169/158"
						/>
						<span className="text-small font-bold whitespace-nowrap">
							More Choice
						</span>
					</div>
					<div className="flex items-center gap-2">
						<img
							src={orangeCircleCheck}
							alt="orange check"
							width="24"
							height="16"
							className="aspect-169/158"
						/>
						<span className="text-small font-bold whitespace-nowrap">
							Fair Competition
						</span>
					</div>
					<div className="flex items-center gap-2">
						<img
							src={yellowCircleCheck}
							alt="yellow check"
							width="24"
							height="16"
							className="aspect-169/158"
						/>
						<span className="text-small font-bold whitespace-nowrap">
							Better Representation
						</span>
					</div>
				</div>
			</div>
			<div className="py-8 px-5 lg:px-8 w-full max-w-full bg-orange lg:bg-transparent lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
				<HeroCTA />
			</div>
			<div className="px-8 pb-14 lg:pb-0 lg:col-start-1 lg:row-start-2">
				<div className="static lg:max-w-[650px] mt-9">
					<p className="text-large-bold lg:font-normal">
						When primary elections force voters to choose only one candidate,
						voters often settle — or risk “wasting” their vote — and the
						candidates who advance to the general election are not always the
						ones who best represent the electorate.
					</p>
					<p className="text-large-bold lg:font-normal pt-8 lg:pb-12">
						<span className="font-bold">
							Approval Voting simply eliminates the choose-one rule,
						</span>{" "}
						giving voters the freedom to choose all the candidates they like and
						forcing candidates to earn broad support to advance. Whoever reaches
						the general has earned it, not benefitted from a divided field.
					</p>
				</div>
			</div>
		</div>
	);
};

//make this component available to the app
export default Hero;
