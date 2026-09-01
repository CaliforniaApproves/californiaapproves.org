import orangeCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Orange-Circle-w-Check-RGB.svg";
import purpleCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Purple-Circle-w-Check-RGB.svg";
import yellowCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Yellow-Circle-w-Check-RGB.svg";
import Background from "../../assets/images/Group-39.svg";
import HeroPledge from "./pledge-form-hero";

// create a component
const Hero = () => {
	return (
		<div
			className="caa-home-page-banner w-full flex flex-col lg:flex-row items-center justify-center pt-[30px]"
			style={{
				backgroundImage: `url(${Background})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="m-auto px-8 pb-14 lg:pb-0">
				<div className="flex items-center gap-2">
					<img
						src={purpleCircleCheck}
						alt="purple check"
						width="24"
						height="16"
						className="aspect-169/158"
					/>
					<span className="font-bold text-[16px]">More Choice</span>
					<img
						src={orangeCircleCheck}
						alt="orange check"
						width="24"
						height="16"
						className="aspect-169/158"
					/>
					<span className="font-bold text-[16px]">Fair Competition</span>
					<img
						src={yellowCircleCheck}
						alt="yellow check"
						width="24"
						height="16"
						className="aspect-169/158"
					/>
					<span className="font-bold text-[16px]">Better Representation</span>
				</div>
				<h2 className="text-green banner-drop-shadow pt-4">
					Approve every candidate you support. 
					Not just one.
				</h2>
				<div className="static max-w-[650px] mt-9">
					<p className="text-large-bold lg:font-normal">
						When primary elections force voters to choose 
						only one candidate, voters often settle — or 
						risk “wasting” their vote — and the candidates 
						who advance to the general election are not 
						always the ones who best represent the electorate. 
					</p>
					<p className="text-large-bold lg:font-normal pt-8">
						<span className="font-bold">
							Approval Voting simply eliminates the 
							choose-one rule, 
						</span>
						{" "}giving voters the freedom to choose all the candidates 
						they like and forcing candidates to earn broad support 
						to advance. Whoever reaches the general has earned it, 
						not benefitted from a divided field.
					</p>
				</div>
			</div>
			<div className="py-8 px-5 lg:px-8 max-w-full lg:max-w-[50%] m-auto bg-orange lg:bg-transparent ">
				<HeroPledge />
			</div>
		</div>
	);
};

//make this component available to the app
export default Hero;
