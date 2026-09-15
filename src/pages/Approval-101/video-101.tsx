import Video from "../../components/common/video";

// create a component
const Video101 = () => {
	return (
		<div className="flex flex-col px-8 py-10 bg-purple">
			<div className="flex flex-col lg:flex-row items-center">
				<div className="lg:w-1/2">
					<Video embedId={"K7kDlctGsQM"} title={"What Is Approval Voting?"} />
				</div>
				<div className="lg:w-1/2 px-8 my-auto">
					<span className="text-4xl text-white font-semibold">
						Today, when you enter the polling booth, you can only vote for one
						candidate. That single choice can cause lots
						of problems:
					</span>
					<ul className="list-disc pl-10 pt-4 text-base text-white/85">
						<li>
							<span className="font-semibold">You can't vote your conscience. </span>
							If your favorite isn’t the front runner, voting for them risks
							helping the candidate you like least win. This is called
							“the spoiler effect”.
						</li>
						<li>
							<span className="font-semibold">Winners without broad support. </span>
							Winning candidates often don’t represent a broad base of voters.
							It is common for candidates to win with far less than 50% of the vote.
						</li>
						<li>
							<span className="font-bold">A two-party lock. </span>
							The system rewards whoever's already dominant, leaving little room for 
							new ideas to break through.
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

//make this component available to the app
export default Video101;
