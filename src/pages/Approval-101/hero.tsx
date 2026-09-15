import { useState } from "preact/hooks";
import Background from "../../assets/images/Group-39.svg";

//create components
const candidates = [
	{
		name: "Hero 1",
	},
	{
		name: "Hero 2",
	},
	{
		name: "Acceptable",
	},
	{
		name: "Villain 1",
	},
	{
		name: "Villain 2",
	},
];

//create components
const Hero = () => {
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
		<section 
			aria-label="What is Approval Voting" 
			className="caa-home-page-banner w-full grid grid-cols-1 lg:content-center"
			style={{
				backgroundImage: `url(${Background})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
			id="top"
		>
			<div className="max-w-[1120px] m-auto px-8 py-12 flex flex-col gap-4">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
					{/* OLD BALLOT — choose one */}
					<div className="bg-schist-lower text-black rounded-md px-6 flex flex-col gap-4">
						<h2 className="text-green banner-drop-shadow text-center pb-8">
							What is Approval Voting?
						</h2>
						<p className="max-w-full text-3xl pb-4">
							<span className="font-bold text-green">Approval Voting lets you vote for every candidate you support</span>, 
							not just one. The candidate with the most votes wins. It's as 
							simple as that!
						</p>
						<div className="border-t border-schist py-4 text-center">
							<p className="text-large sm:text-3xl font-extrabold text-orange">
								Same ballot. More choice, that's it.
							</p>
							<p className="text-large sm:text-3xl font-bold text-orange/85">Mark all you support.</p>
						</div>
					</div>

					{/* NEW BALLOT — approve all you support */}
					<div className="border-purple-high border-6 bg-white text-black rounded-md p-6 flex flex-col gap-4">
						<span className="inline-block text-sm font-semibold uppercase tracking-wide bg-orange text-white px-3 py-1 rounded-full">
							Approval Voting Ballot
						</span>
						<h4 className="text-green">Vote for AS MANY as you approve of</h4>
						<p className="text-lg text-schist-higher">
							No limit. Support as many as you genuinely want.
						</p>
						{candidates.map((c) => {
							const marked = !!newSelected[c.name];
							return (
								<button
									type="button"
									key={c.name}
									onClick={() => toggleNew(c.name)}
									className="flex items-center gap-3 py-2 px-1 rounded cursor-pointer hover:bg-schist w-full text-left"
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
										<span className="font-semibold text-schist-high">{c.name} </span>
									</div>
									<div className="text-xs font-mono text-schist-high">
										{marked ? "1 approval" : "0"}
									</div>
								</button>
							);
						})}
						<div className="py-3 border-t border-dashed border-schist text-small text-schist-higher">
							{newCount > 0 ? (
								<>
									You approved{" "}
									<b className="text-schist-higher">
										{newCount} candidate{newCount > 1 ? "s" : ""}
									</b>
									. Each one counted fully, with no tradeoff.
								</>
							) : (
								"Overlapping support among candidates now adds up instead of dividing."
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

//make this component available to the app
export default Hero;
