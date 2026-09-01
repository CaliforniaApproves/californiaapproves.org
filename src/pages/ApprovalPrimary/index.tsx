import Hero from "./hero";
import HeroPledge from "./pledge-form-hero";
import Ballots from "./ballots";
import Problem from "./problem";
import Solution from "./solution";
import Proof from "./proof";
import Summary from "./summary";
import Questions from "./questions";
import MidPledge from "./pledge-form-mid";
import FinalPledge from "./pledge-form-final";

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
			<MidPledge />
			<Questions />
			<FinalPledge />
		</div>
	);
}
