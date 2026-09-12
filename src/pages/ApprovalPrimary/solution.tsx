import orangeCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Orange-Circle-w-Check-RGB.svg";

const steps = [
	{
		num: "01",
		title: "Mark every candidate you approve of",
		body: "No limit, and no obligation. Just vote your conscience — mark one candidate or several, whoever you genuinely want to support.",
	},
	{
		num: "02",
		title: "Approvals add up, they don't divide",
		body: "Overlapping support among candidates gets counted instead of split apart. Candidates with real, broad appeal are no longer penalized just because their support overlaps with others.",
	},
	{
		num: "03",
		title: "The most-approved candidates advance",
		body: "Because voters have unrestricted choice in the primary, the candidates with the widest genuine voter support actually advance, and the winner arrives with a real mandate to represent more than just their base.",
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
		<section aria-label="The solution">
			<div className="max-w-[1120px] m-auto px-8">
				<div className="max-w-full">
					<img
						src={orangeCircleCheck}
						alt="orange check"
						width="24"
						height="16"
						className="aspect-169/158 shrink-0 pt-0.5"
					/>
					<h2 className="text-green py-2">
						An election should measure how much support a candidate actually
						has.
					</h2>
					<p className="text-large py-2">
						Approval Voting does exactly that. By measuring overlapping support,
						it provides more choice, creates fair competition for broad support,
						and delivers better representation.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-6">
					{steps.map((step) => (
						<div key={step.num} className="border-t-2 border-orange-accent py-4">
							<div className="font-mono text-orange-accent text-sm font-semibold">
								{step.num}
							</div>
							<h4 className="text-green py-2">{step.title}</h4>
							<p className="text-base leading-tight">
								{step.body}
							</p>
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 mt-2 py-6 border-t border-schist">
					{checklist.map((item) => (
						<div key={item.title} className="flex items-start gap-3.5">
							<img
								src={orangeCircleCheck}
								alt="orange check"
								width="24"
								height="16"
								className="aspect-169/158 shrink-0 pt-0.5"
							/>
							<div>
								<b className="block text-green text-base font-bold mb-0.5">
									{item.title}
								</b>
								<span className="text-base text-schist-higher leading-[1]">
									{item.body}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Solution;
