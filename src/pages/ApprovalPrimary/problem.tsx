const Problem = () => {
	return (
		<div className="py-16 lg:py-20">
			<div className="max-w-[1120px] m-auto px-8">
				<div className="max-w-full">
					<div className="font-bold text-orange">THE PROBLEM</div>
					<h2 className="text-green mt-2">
						Choose-one voting can't tell the difference between &ldquo;unpopular" and &ldquo;divided."
					</h2>
					<p className="text-base mt-3">
						When several appealing candidates run, choose-one voting splits
						their support instead of adding it up. Voters abandon candidates
						they actually prefer for whoever seems most &ldquo;electable," and the
						general election ends up reflecting who voters feared losing to, 
						not who they wanted.
					</p>
				</div>

				<p className="font-semibold text-base text-green mt-8 mb-6">
					This isn't hypothetical. St. Louis, Missouri lived this exact
					problem before switching to Approval Voting, and the numbers
					show it plainly.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-schist border border-schist rounded-md overflow-hidden">
					<div className="bg-white p-6">
						<div className="font-mono text-4xl font-semibold text-orange">
							32%
						</div>
						<p className="text-[20px] text-schist-high mt-2 leading-tight">
							was enough to win St. Louis's 2017 choose-one mayoral primary outright,
							with support fractured across three other candidates.
						</p>
					</div>
					<div className="bg-white p-6">
						<div className="font-mono text-4xl font-semibold text-orange">
							1 in 3
						</div>
						<p className="text-[20px] text-schist-high mt-2 leading-tight">
							St. Louis primary voters approved more than one candidate in
							2025, proof that &ldquo;just pick one" was never the whole
							story of what voters wanted.
						</p>
					</div>
					<div className="bg-white p-6">
						<div className="font-mono text-4xl font-semibold text-orange">
							84%
						</div>
						<p className="text-[20px] text-schist-high mt-2 leading-tight">
							of voters who supported lesser-known 2025 St. Louis candidates also
							approved of at least one other candidate — preferences
							choose-one voting would have erased entirely.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Problem;