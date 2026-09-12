import Background from "../../assets/images/Group-39.svg";
import strongArm from "../../assets/images/Strong-Arm 1.webp";
import SupportCTA from "./support-cta";

// create a component
const Banner = () => {
	return (
		<div
			className="caa-home-page-banner w-full flex flex-col lg:flex-row items-center justify-center py-[30px]"
			style={{
				backgroundImage: `url(${Background})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="m-auto px-8 pb-14 lg:pb-0">
				<img
					src={strongArm}
					alt="strong arm"
					width="338"
					height="316"
					className="aspect-169/158"
				/>
				<h1 className="text-green banner-drop-shadow">
					Approval Voting <br class="hidden lg:inline"></br>
					Unites Us
				</h1>
			</div>
			<div className="hidden py-8 px-5 lg:block lg:px-8 max-w-full lg:max-w-[40%] m-auto bg-purple lg:bg-transparent ">
				<SupportCTA />
			</div>
		</div>
	);
};

//make this component available to the app
export default Banner;
