const doesNot = [
	"Does not bring back closed, party primaries",
	"Does not restrict who can run or who can vote",
	"Does not touch the ballot layout or how the general election works",
	"Does not require new voting machines or software",
];

const does = [
	"Gives primary voters the freedom to choose all candidates they like",
	"Reveals overlapping support that choose-one voting hides",
	"Advances the most widely approved candidates",
	"Gives winners a stronger mandate to represent more voters",
];

const Summary = () => {
	return (
		<div className="bg-purple text-white py-16 lg:py-20">
			<div className="max-w-[1120px] m-auto px-8">
				<div className="max-w-full">
					<div className="font-bold text-tan">NOT A RADICAL DEPARTURE</div>
					<h2 className="text-white mt-2">
						This finishes the job California's open primary already started.
					</h2>
					<p className="text-base text-white/85 mt-3 leading-snug">
						Every candidate for state and congressional office still appears
						on one familiar ballot. Every registered voter, regardless of
						party affiliation, can still vote for any of them. This reform
						simply gives voters the freedom to support all the candidates
						they like in the primary. Nothing else about how California 
						elects its leaders changes.
					</p>
					<p className="font-semibold text-base text-white mt-3 leading-snug">
						By measuring overlapping support, Approval Voting provides more
						choice, creates fair competition for broad support, and delivers
						better representation.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 mt-11 border border-white/25 rounded-md overflow-hidden">
					<div className="bg-purple-soft p-7">
						<h4 className="text-purple mb-3">
							What this act does not do
						</h4>
						<ul className="list-disc pl-5 space-y-2">
							{doesNot.map((item) => (
								<li key={item} className="font-semibold text-lg text-green leading-tight">
									{item}
								</li>
							))}
						</ul>
					</div>
					<div className="bg-white p-7">
						<h4 className="text-purple mb-3">
							What this act does
						</h4>
						<ul className="list-disc pl-5 space-y-2">
							{does.map((item) => (
								<li key={item} className="font-semibold text-lg text-green leading-tight">
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Summary;