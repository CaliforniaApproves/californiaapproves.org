import orangeCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Orange-Circle-w-Check-RGB.svg";
import purpleCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Purple-Circle-w-Check-RGB.svg";
import yellowCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Yellow-Circle-w-Check-RGB.svg";
import Background from "../../assets/images/Group-39.svg";
import HeroCTA from "./cta-hero";
import { ActionButton } from "../../components/common/buttons";


const Hero = () => {
	const scrollToPledge = () => {
		document.getElementById("pledge")?.scrollIntoView({ behavior: "smooth" });
	};
	return (
		// The banner reads in mobile order: heading + value props, then the CTA,
		// then the explanatory paragraphs. A grid puts them
		// together on desktop, where the heading and paragraphs share the
		// left column and the CTA spans both rows on the right.
		//
		// On mobile the three cells stack and each carries its own section-sized
		// vertical padding (py-16) so the orange CTA band in particular reads as a
		// full section; the outer edges are trimmed to 0 because the <section>'s
		// own padding-block already supplies them. From lg up the cells only pad
		// the gap between the two left-column rows.
		<section
			aria-label="Introduction"
			className="caa-home-page-banner w-full grid grid-cols-1 lg:content-center bg-orange md:bg-white"
			style={{
				backgroundImage: `url(${Background})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
			id="top"
		>
			<div className="max-w-[900px] m-auto px-8 flex flex-col gap-4">
				<div className="bg-white border-orange rounded-[50px] border-[6px] p-12 lg:p-12 text-center flex flex-col items-center gap-8">
					<h4 className="text-green uppercase">Our primary reform</h4>
					<h2 className="text-green">Improve California's primaries with one sentence on the ballot</h2>
					<p className="text-base">
						The Approval Voting for Primary Elections Act finds where Californians 
						agree by giving voters the freedom to support every candidate they 
						approve of. Pledge your support now, and we'll follow up when the 
						official petition is ready to sign.
					</p>
					<div className="flex flex-wrap justify-center gap-3">
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
					<ActionButton
						color="orange"
						variant="outlined"
						className="text-orange mx-auto whitespace-nowrap px-25"
						size="lg"
						onClick={scrollToPledge}
					>
						PLEDGE YOUR SUPPORT
					</ActionButton>
				</div>
			</div>
		</section>
	);
};

//make this component available to the app
export default Hero;
