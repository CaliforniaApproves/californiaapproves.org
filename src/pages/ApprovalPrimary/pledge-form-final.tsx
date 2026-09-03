import { ActionButton } from "../../components/common/buttons";
import Input from "../../components/common/input";

const FinalPledge = () => {
	return (
		<div className="bg-green text-center py-16 lg:py-20">
			<div className="max-w-[700px] m-auto px-8">
				<h2 className="text-white">
					Help bring Approval Voting to California.
				</h2>
				<p className="text-base text-white/85 mt-3">
					Every pledge moves this closer to the 2028 ballot. Add your name below.
				</p>

				<div className="bg-white rounded-[24px] p-6 lg:p-10 mt-9 text-left">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							console.log("Form submitted (placeholder - no Mailchimp endpoint yet)");
						}}
						method="post"
						id="mc-embedded-subscribe-form-final"
						name="mc-embedded-subscribe-form-final"
						className="validate"
						target="_self"
					>
						<div className="flex flex-col gap-2">
							<div className="flex gap-2">
								<div id="mc-fname-input-wrapper-final" className="mc-field-group w-full">
									<Input
										color="green"
										label="first name"
										labelHidden={true}
										type="text"
										name="FNAME"
										placeholder="First name"
										className="w-full"
										id="mce-FNAME-final"
									/>
								</div>
								<div id="mc-lname-input-wrapper-final" className="mc-field-group w-full">
									<Input
										color="green"
										label="last name"
										labelHidden={true}
										type="text"
										name="LNAME"
										placeholder="Last name"
										className="w-full"
										id="mce-LNAME-final"
									/>
								</div>
							</div>
							<div id="mc-email-input-wrapper-final" className="mc-field-group">
								<Input
									color="green"
									label="email"
									labelHidden={true}
									type="email"
									name="EMAIL"
									placeholder="Enter your email"
									className="w-full required email"
									id="mce-EMAIL-final"
									required
								/>
							</div>
							<div id="mc-zip-input-wrapper-final" className="mc-field-group">
								<Input
									color="green"
									label="zip code"
									labelHidden={true}
									type="text"
									name="MMERGE5"
									placeholder="Zip code"
									className="w-full"
									id="mce-MMERGE5-final"
								/>
							</div>

							{/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
							<div
								style={{ position: "absolute", left: "-5000px" }}
								aria-hidden="true"
							>
								<input
									type="text"
									name="b_b4aa7540a62457c043ff00e36_dddf3d641c"
									tabIndex={-1}
									defaultValue=""
								/>
							</div>

							<label className="flex items-start gap-2 mt-2 mb-1 cursor-pointer">
								<input
									type="checkbox"
									name="volunteer"
									id="mce-volunteer-final"
									className="mt-1 shrink-0 w-4 h-4 accent-green cursor-pointer"
								/>
								<span className="text-sm text-gray-500 leading-snug">
									I'm interested in volunteering to help gather signatures
								</span>
							</label>

							<ActionButton
								color="green"
								variant="solid"
								className="mx-auto whitespace-nowrap px-20 mt-3 bg-green hover:bg-green-high"
								size="lg"
								name="subscribe"
								id="mc-embedded-subscribe-final"
								type="submit"
							>
								ADD MY PLEDGE
							</ActionButton>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default FinalPledge;