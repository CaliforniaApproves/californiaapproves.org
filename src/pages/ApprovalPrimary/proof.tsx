const timeline = [
	{
		year: "2017 · Choose-One",
		num: "32%",
		body: "Winning share of the vote in St. Louis's fractured, seven-candidate mayoral primary.",
	},
	{
		year: "2020 · Reform Passes",
		num: "68%",
		body: "St. Louis voters approved switching their municipal primary elections to Approval Voting.",
	},
	{
		year: "2021 · First Use",
		num: "57%",
		body: "The leading mayoral candidate advanced with broad approval, up from just 30% in the fractured 2017 primary race she didn't win.",
	},
	{
		year: "2021 · Voter Survey",
		num: "81%",
		body: "St. Louis voters appreciated Approval Voting’s simplicity — clear and easy to use, no learning curve.",
	},
];

const Proof = () => {
	return (
		<div className="py-16 lg:py-20">
			<div className="max-w-[1120px] m-auto px-8">
				<div className="max-w-full">
					<div className="font-bold text-orange text-small">PROVEN, NOT THEORETICAL</div>
					<h2 className="text-green mt-2">
						St. Louis already made this switch.
					</h2>
					<p className="text-large mt-3 leading-snug">
						Approval Voting has already been used for municipal and
						legislative offices in Fargo, St. Louis, and Utah's Senate
						District 11. St. Louis in particular also pairs Approval 
						Voting with an 
						open primary that feeds into a top-two general, the same
						structure this reform would bring to California. St. Louis voters
						adopted this structure for municipal elections in 2020. Every
						election since has shown the same pattern: candidates who once
						looked narrowly supported turned out to have much broader
						appeal once the ballot let voters show it.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
					{timeline.map((item) => (
						<div key={item.year}>
							<div className="font-mono text-sm font-semibold text-orange-accent mb-2.5">
								{item.year}
							</div>
							<svg
								viewBox="0 0 24 24"
								className="w-3 h-3 fill-orange-accent mb-2.5"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M12 0 L13.8 8.1 L18.6 1.4 L15.9 9.2 L22.6 5.4 L16.8 10.8 L24 12 L16.8 13.2 L22.6 18.6 L15.9 14.8 L18.6 22.6 L13.8 15.9 L12 24 L10.2 15.9 L5.4 22.6 L8.1 14.8 L1.4 18.6 L7.2 13.2 L0 12 L7.2 10.8 L1.4 5.4 L8.1 9.2 L5.4 1.4 L10.2 8.1 Z" />
							</svg>
							<div className="lg:border-t lg:border-schist lg:pt-3">
								<div className="font-mono text-4xl font-semibold text-orange">
									{item.num}
								</div>
								<p className="text-base leading-normal">
									{item.body}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Proof;