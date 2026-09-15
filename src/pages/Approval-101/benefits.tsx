import voteMatters from "../../assets/images/vote-matters.webp";

// create a component
const Benefits = () => {
	return (
		<div className="py-12 px-8 flex flex-col lg:flex-row">
			<div className="lg:w-1/2 pb-8 lg:pb-0">
				<img
					className="rounded-2xl"
					src={voteMatters}
					alt="your vote matters"
				/>
			</div>
			<div className="lg:w-1/2 lg:ml-4 my-auto px-4">
				<div className="text-green text-4xl">
					<span className="font-bold">Our elections don't have to be like this! </span>
					Approval Voting is the simple tweak that offers enormous benefits:
				</div>
				<ul className="list-disc pl-10 text-base pt-4">
					<li>
						<span className="font-bold">No more spoiler effect. </span>
						Vote for every candidate you want to support. Approving someone else 
						never helps your least favorite win.
					</li>
					<li>
						<span className="font-bold">More representative winners. </span>
						Because support adds up instead of splitting apart, the winner reflects 
						real, broad agreement, not just whoever survived a divided field.
					</li>
					<li>
						<span className="font-bold">Room for more than two. </span>
						Independent and new candidates can build real support because 
						every voter is free to support them. They only have to earn support,
						not steal it from an established base.
					</li>
				</ul>
			</div>
		</div>
	);
};

//make this component available to the app
export default Benefits;
