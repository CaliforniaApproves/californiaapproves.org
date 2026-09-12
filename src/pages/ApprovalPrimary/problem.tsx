import orangeCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Orange-Circle-w-Check-RGB-KO.svg";
import yellowCircleCheck from "../../assets/icons/Individual Circles/California-Approves-Logo-Yellow-Circle-w-Check-RGB-KO.svg";

const Problem = () => {
	return (
		<section aria-label="The problem" className="bg-purple text-white/85">
			<div className="max-w-[1120px] m-auto px-8">
				<div className="max-w-full">
					<h2 className="text-white pt-2 flex items-start gap-3">
						<img
							src={yellowCircleCheck}
							alt="yellow check"
							width="43"
							height="32"
							className="aspect-169/158 shrink-0 pt-3.5"
						/>
						<span>
							Your vote should count for who you actually 
							support, not just who you think can win.
						</span>
					</h2>
					<p className="text-large pt-3">
						Too many people vote for whoever seems “safe,” 
						afraid their real favorite doesn’t stand a 
						chance. That fear becomes the reason they 
						lose. The result is a self-fulfilling 
						prophecy: elections that reflect who voters 
						feared losing to, not who they actually wanted.
					</p>
				</div>

				<p className="font-semibold text-large text-white/85 pt-8 mb-6">
					This isn't hypothetical. It happened in St. Louis, 
					Missouri, before the city switched to Approval Voting.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-schist border border-schist rounded-md overflow-hidden">
					<div className="bg-white p-6 flex flex-col gap-2">
						<div className="font-mono text-4xl font-semibold text-orange">
							32%
						</div>
						<p className="text-base text-schist-high leading-tight">
							was enough to win St. Louis's 2017 “choose-one” mayoral primary 
							outright, with support fractured across three other candidates, 
							who together may have reflected what most voters actually wanted.
						</p>
					</div>
					<div className="bg-white p-6 flex flex-col gap-2">
						<div className="font-mono text-4xl font-semibold text-orange">
							1 in 3
						</div>
						<p className="text-base text-schist-high leading-tight">
							St. Louis primary voters approved more than one candidate in 
							2025, proof that “just pick one” never captured the full picture 
							of their support.
						</p>
					</div>
					<div className="bg-white p-6 flex flex-col gap-2">
						<div className="font-mono text-4xl font-semibold text-orange">
							84%
						</div>
						<p className="text-base text-schist-high leading-tight">
							of St. Louis voters who supported a lesser-known 2025 mayoral 
							candidate also approved of someone else — preferences the old 
							system would have never let them show.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Problem;
