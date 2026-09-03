import { useState } from "preact/hooks";

//create components
const candidates = [
	{ name: "Candidate A", party: "Orange Party" },
	{ name: "Candidate B", party: "Purple Party" },
	{ name: "Candidate C", party: "Purple Party" },
	{ name: "Candidate D", party: "Yellow Party" },
	{ name: "Candidate E", party: "Orange Party" },
	{ name: "Candidate F", party: "Orange Party" },
];

//create components
const Ballots = () => {
	const [oldSelected, setOldSelected] = useState<string | null>(null);
	const [newSelected, setNewSelected] = useState<Record<string, boolean>>({});

	const newCount = Object.values(newSelected).filter(Boolean).length;

	const toggleOld = (name: string) => {
		setOldSelected((prev) => (prev === name ? null : name));
	};

	const toggleNew = (name: string) => {
		setNewSelected((prev) => ({ ...prev, [name]: !prev[name] }));
	};

return (
		<div className="bg-purple text-white pt-12 lg:pt-16 pb-14">
			<div className="max-w-[1120px] m-auto px-8">
				<div className="font-bold text-tan">SEE IT IN ACTION</div>
				<h2 className="text-white">Same ballot. One sentence changes everything.</h2>
				<div className="static max-w-full mt-9">
					<p className="text-base text-white/85 lg:font-normal">
						Try marking both ballots below with candidates you'd
						support in a six-way primary, mirroring a California
						voter-nominated primary where every candidate from every
						party appears together on one ballot. Notice how the first
						ballot forces a choice and how the second one <span className="italic">doesn't.</span>
					</p>
				</div>

				<div className="mt-9">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* OLD BALLOT — choose one */}
						<div className="bg-schist-lower text-black rounded-md p-6">
							<span className="inline-block text-xs font-bold uppercase tracking-wide bg-tan text-orange px-3 py-1 rounded-full mb-4">
								Today: Choose One
							</span>
							<h4 className="mb-1">Vote for one</h4>
							<p className="text-lg text-schist-high mb-4">
								Selecting a second candidate is not allowed.
							</p>
							{candidates.map((c) => {
								const marked = oldSelected === c.name;
								return (
									<div
										key={c.name}
										onClick={() => toggleOld(c.name)}
										className="flex items-center gap-3 py-2 px-1 rounded cursor-pointer hover:bg-schist-low"
									>
										<div
											className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
												marked
													? "bg-orange border-orange text-white"
													: "bg-white border-schist-medium text-transparent"
											}`}
										>
											✕
										</div>
										<div className="flex-1 text-bsm font-medium">
											{c.name}{" "}
											<span className="block text-sm uppercase text-schist-high">
												{c.party}
											</span>
										</div>
										<div className="text-xs font-mono text-schist-high">
											{marked ? "1 vote" : "0"}
										</div>
									</div>
								);
							})}
							<div className="mt-4 pt-3 border-t border-dashed border-schist text-bsm text-schist-higher">
								{oldSelected ? (
									<>
										You marked <b className="text-green">{oldSelected}</b>. Your
										support for anyone else on the ballot is invisible to the count.
									</>
								) : (
									"Voters who back multiple candidates are divided across two or three names each, even when they would be satisfied with more than one."
								)}
							</div>
						</div>

						{/* NEW BALLOT — approve all you support */}
						<div className="bg-schist-lower text-black rounded-md p-6">
							<span className="inline-block text-xs font-semibold uppercase tracking-wide bg-orange text-white px-3 py-1 rounded-full mb-4">
								The Fix: Approve All You Support
							</span>
							<h4 className="mb-1">
								Vote for AS MANY as you approve of
							</h4>
							<p className="text-lg text-schist-high mb-4">
								No limit. Support as many as you genuinely want.
							</p>
							{candidates.map((c) => {
								const marked = !!newSelected[c.name];
								return (
									<div
										key={c.name}
										onClick={() => toggleNew(c.name)}
										className="flex items-center gap-3 py-2 px-1 rounded cursor-pointer hover:bg-schist-low"
									>
										<div
											className={`w-6 h-6 shrink-0 rounded border-2 flex items-center justify-center text-sm font-bold ${
												marked
													? "bg-orange border-orange text-white"
													: "bg-white border-schist-medium text-transparent"
											}`}
										>
											✓
										</div>
										<div className="flex-1 text-bsm font-medium">
											{c.name}{" "}
											<span className="block text-sm uppercase text-schist-high">
												{c.party}
											</span>
										</div>
										<div className="text-xs font-mono text-schist-high">
											{marked ? "1 approval" : "0"}
										</div>
									</div>
								);
							})}
							<div className="mt-4 pt-3 border-t border-dashed border-schist text-bsm text-schist-higher">
								{newCount > 0 ? (
									<>
										You approved <b className="text-green">{newCount} candidate{newCount > 1 ? "s" : ""}</b>. Each one counted fully, with no tradeoff.
									</>
								) : (
									"Overlapping support among candidates now adds up instead of dividing."
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="static max-w-full mt-9">
					<p className="italic text-base lg:font-normal">
						In our current system, needing to guess who's 
						&ldquo;electable" can pressure any voter to abandon 
						their favorite candidates, even when they have
						no competition for their party's support. 
						Approval Voting removes that pressure everywhere.
					</p>
				</div>
			</div>
		</div>
	);
};

//make this component available to the app
export default Ballots;
