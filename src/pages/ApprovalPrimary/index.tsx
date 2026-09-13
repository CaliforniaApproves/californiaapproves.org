import Ballots from "./ballots";
import Hero from "./hero";
import PledgeForm from "./pledge-form";
import Problem from "./problem";
import Proof from "./proof";
import Solution from "./solution";
import Summary from "./summary";

// create a component
export function ApprovalPrimary() {
	return (
		<div className="approval-primary">
			<title>Approval Primary Reform - California Approves</title>
			<Hero />
			<Ballots />
			<Solution />
			<Problem />
			<Proof />
			<Summary />
			<PledgeForm />
		</div>
	);
}
