import Benefits from "./benefits";
import CTA from "./cta";
import Hero from "./hero";
import Video101 from "./video-101";

// create a component
export function Approval101() {
	return (
		<div className="approval-101-page">
			<title>What is Approval Voting?</title>
			<Hero />
			<Video101 />
			<Benefits />
			<CTA />
		</div>
	);
}
