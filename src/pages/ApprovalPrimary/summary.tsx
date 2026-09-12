import orangeCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Orange-Circle-w-Check-RGB-KO.svg";
import yellowCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Yellow-Circle-w-Check-RGB-KO.svg";

const doesNot = [
	"Does not restrict who can run or who can vote",
	"Does not change the ballot layout or how the general election works",
	"Does not require new voting machines or software",
	"Does not add cost for counties to administer",
];

const does = [
	"Gives voters the freedom to mark every candidates they support",
	"Reveals how much support each candidates really has, instead of hiding it",
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
					<h2 className="text-tan py-2">
						The simplest change that works.
					</h2>
					<p className="text-large text-white/85 py-2 leading-snug">
						Every candidate for state and congressional office still 
						appears on one familiar ballot. Every registered voter 
						can still vote for any of them. This reform simply gives 
						voters the freedom to support all the candidates they 
						like in the primary. Nothing else about how elections 
						are run has to change, and nothing new has to be bought, 
						built, or learned.
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
