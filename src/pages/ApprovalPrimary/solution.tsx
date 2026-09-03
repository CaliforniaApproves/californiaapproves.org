import orangeCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Orange-Circle-w-Check-RGB-KO.svg";

const steps = [
	{
		num: "01",
		title: "Mark every candidate you approve of",
		body: "No limit. Just vote your conscience — mark everyone you genuinely want to support. Every registered voter can still vote for any candidate, regardless of party affiliation.",
	},
	{
		num: "02",
		title: "Approvals add up, they don't divide",
		body: "Supporting a second or third candidate never takes anything away from your first choice, and never helps candidates you don't want to advance. Overlapping support among candidates gets counted instead of split apart.",
	},
	{
		num: "03",
		title: "The most-approved candidates advance",
		body: "Same general election California already runs. The only change is more choice in the primary — so the candidates with the widest genuine voter support actually advance, and the winner arrives with a real mandate to represent more than just their base.",
	},
];

const checklist = [
	{
		title: "No Tradeoffs",
		body: "You never have to abandon your favorite to block who you fear most",
	},
	{
		title: "Nothing New to Learn",
		body: "Just mark all the candidates you approve of",
	},
	{
		title: "No Counting Delays",
		body: "Simply sum every marking for each candidate, just as we do today",
	},
	{
		title: "Delivers Accurate Results",
		body: "Reveals each candidate's full breadth of support within the electorate",
	},
];

const Solution = () => {
	return (
		<div className="bg-purple text-white py-16 lg:py-20">
			<div className="max-w-[1120px] m-auto px-8">
				<div className="max-w-full">
					<div className="font-bold text-tan text-small">THE SOLUTION</div>
					<h2 className="text-white mt-2">
						An election should measure how much support a candidate actually has.
					</h2>
					<p className="text-large text-white/85 mt-3">
						Approval Voting does exactly that and it changes nothing else
						about how Californians vote.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
					{steps.map((step) => (
						<div key={step.num} className="border-t-2 border-tan pt-4">
							<div className="font-mono text-tan text-sm font-semibold">
								{step.num}
							</div>
							<h4 className="text-white mt-2 mb-2">
								{step.title}
							</h4>
							<p className="text-white/85 text-base leading-tight">
								{step.body}
							</p>
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 mt-11 pt-8 border-t border-white/25">
					{checklist.map((item) => (
						<div key={item.title} className="flex items-start gap-3.5">
							<img
								src={orangeCircleCheck}
								alt="orange check"
								width="24"
								height="16"
								className="aspect-169/158 shrink-0 mt-0.5"
							/>
							<div>
								<b className="block text-white text-base font-bold mb-0.5">
									{item.title}
								</b>
								<span className="text-base text-white/85 leading-[1]">
									{item.body}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Solution;