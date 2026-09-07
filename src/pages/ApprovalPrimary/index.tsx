import Hero from "./hero";
import HeroPledge from "./cta-hero";
import Ballots from "./ballots";
import Problem from "./problem";
import Solution from "./solution";
import Proof from "./proof";
import Summary from "./summary";
import Questions from "./questions";
import FinalPledge from "./pledge-form-final";
import MidCTA from "./cta-mid";

// create a component
export function ApprovalPrimary() {
	return (
		<div>
			<title>Approval Primary Reform - California Approves</title>
            <Hero />
			<Ballots />
			<Problem />
			<Solution />
			<Proof />
			<Summary />
			<MidCTA />
			<Questions />
			<FinalPledge />
		</div>
	);
}
