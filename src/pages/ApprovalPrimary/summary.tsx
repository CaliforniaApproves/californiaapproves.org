import orangeCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Orange-Circle-w-Check-RGB-KO.svg";
import yellowCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Yellow-Circle-w-Check-RGB-KO.svg";

const doesNot = [
	"Does not bring back closed, party primaries",
	"Does not restrict who can run or who can vote",
	"Does not touch the ballot layout or how the general election works",
	"Does not require new voting machines or software",
];

const does = [
	"Gives primary voters the freedom to choose all candidates they like",
	"Reveals how much support candidates really have, instead of hiding it",
	"Advances the most widely approved candidates",
	"Gives winners a stronger mandate to represent more voters",
];

const Summary = () => {
	return (
		<section
			aria-label="What the reform does and does not do"
			className="bg-purple text-white"
		>
			<div className="max-w-[1120px] m-auto px-8">
				<div className="max-w-full">
					<img
						src={orangeCircleCheck}
						alt="orange check"
						width="24"
						height="16"
						className="aspect-169/158 shrink-0 pt-0.5"
					/>
					<h2 className="text-white py-2">
						This finishes the job California's open primary already started.
					</h2>
					<p className="text-large text-white/85 py-2 leading-snug">
						Every candidate for state and congressional office still appears on
						one familiar ballot. Every registered voter, regardless of party
						affiliation, can still vote for any of them. This reform simply
						gives voters the freedom to support all the candidates they like in
						the primary. Nothing else about how California elects its leaders
						changes.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 mt-11 border border-white/25 rounded-md overflow-hidden">
					<div className="bg-purple-soft p-7">
						<h4 className="text-purple mb-3">What this act does not do</h4>
						<ul className="list-disc pl-5 space-y-2">
							{doesNot.map((item) => (
								<li
									key={item}
									className="font-semibold text-base text-green leading-tight"
								>
									{item}
								</li>
							))}
						</ul>
					</div>
					<div className="bg-white p-7">
						<h4 className="text-purple mb-3">What this act does</h4>
						<ul className="list-disc pl-5 space-y-2">
							{does.map((item) => (
								<li
									key={item}
									className="font-semibold text-base text-green leading-tight"
								>
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="pt-8 text-center">
					<p className="text-3xl font-bold text-white">
						Same ballot. More choice, that's it.
					</p>
					<p className="text-3xl font-bold text-tan">Mark all you support.</p>
				</div>
			</div>
		</section>
	);
};

export default Summary;
