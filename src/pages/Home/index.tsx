import AboutUs from "./about";
import AboutApproval from "./approval";
import Banner from "./banner";
// import News from './news';
import GetInvolved from "./get-involved";
import PrimaryCallout from "./primary-callout";
import Quotes from "./quotes";
import Video from "./video";

// create a component
export function Home() {
	return (
		<div>
			<title>California Approves</title>
			<Banner />
			<PrimaryCallout />
			<Video />
			<AboutApproval />
			<AboutUs />
			<Quotes />
			{/* <News /> */}
			<GetInvolved />
		</div>
	);
}
