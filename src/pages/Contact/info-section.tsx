import bridge from "../../assets/images/bridge.webp";
import { SocialLinks } from "../../components/SocialLinks";

// create a component
const InfoSection = () => {
	return (
		<div className="flex flex-col lg:flex-row px-8 py-10 bg-purple text-white">
			<div className="lg:w-1/2 flex flex-col justify-around my-auto">
				<h2>How can you help?</h2>
				<br />
				<p className="text-base">
					Currently we need volunteers for launching campaigns in localities.
					Many places could potentially adopt Approval Voting, but need a local
					voter to initiate the process. Additionally, we would like to expand
					awareness to local people who may not be as passionate about voting
					reform. We have need of people of various skillsets, but these two are
					the simplest way you can make an impact.
				</p>
				<br />
				<h3>Have any questions? Reach out!</h3>
				<br />
				<div className="flex flex-col lg:flex-row justify-start">
					<div className="lg:mr-8">
						<h5>EMAIL</h5>
						<p className="text-base">info@californiaapproves.org</p>
					</div>
					<br />
					<div>
						<h5>SOCIAL</h5>
						<SocialLinks color="orange" />
					</div>
				</div>
			</div>
			<div className="lg:w-1/2 mt-10 lg:mt-0">
				<img className="rounded-2xl" src={bridge} alt="san francisco bridge" />
			</div>
		</div>
	);
};

//make this component available to the app
export default InfoSection;
