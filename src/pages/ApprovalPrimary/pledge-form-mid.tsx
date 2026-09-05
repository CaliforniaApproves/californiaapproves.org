import { ActionButton } from "../../components/common/buttons";
import Input from "../../components/common/input";

const MidPledge = () => {
	return (
		<div className="bg-orange text-center py-16 lg:py-20">
			<div className="max-w-[700px] m-auto px-8">
				<h2 className="text-white">
					Ready to bring Approval Voting to California?
				</h2>
				<p className="text-large text-white/90 mt-3">
					Pledge your support and we'll follow up with next 
					steps. Still have questions? Answers to the
					ones we hear most are just below.
				</p>

				<div className="bg-schist-low rounded-[24px] p-6 lg:p-10 mt-9 text-left">
					<form
						action="https://californiaapproves.us5.list-manage.com/subscribe/post?u=b4aa7540a62457c043ff00e36&id=dddf3d641c&f_id=004f43edf0"
						method="post"
						id="mc-embedded-subscribe-form-mid"
						name="mc-embedded-subscribe-form-mid"
						className="validate"
						target="_self"
					>
						<div className="flex flex-col gap-2">
							<div className="flex gap-2">
								<div id="mc-fname-input-wrapper-mid" className="mc-field-group w-full">
									<Input
										color="orange"
										label="first name"
										labelHidden={true}
										type="text"
										name="FNAME"
										placeholder="First name"
										className="w-full bg-schist-low"
										id="mce-FNAME-mid"
										inputBg="bg-white"
									/>
								</div>
								<div id="mc-lname-input-wrapper-mid" className="mc-field-group w-full">
									<Input
										color="orange"
										label="last name"
										labelHidden={true}
										type="text"
										name="LNAME"
										placeholder="Last name"
										className="w-full bg-schist-low"
										id="mce-LNAME-mid"
										inputBg="bg-white"
									/>
								</div>
							</div>
							<div id="mc-email-input-wrapper-mid" className="mc-field-group">
								<Input
									color="orange"
									label="email"
									labelHidden={true}
									type="email"
									name="EMAIL"
									placeholder="Enter your email"
									className="w-full bg-schist-low required email"
									id="mce-EMAIL-mid"
									inputBg="bg-white"
									required
								/>
							</div>
							<div className="flex gap-2">
								<div id="mc-zip-input-wrapper-mid" className="mc-field-group w-full">
									<Input
										color="orange"
										label="zip code"
										labelHidden={true}
										type="text"
										name="ZIP"
										placeholder="Zip code"
										className="w-full bg-schist-low"
										id="mce-ZIP-mid"
										inputBg="bg-white"
									/>
								</div>
								<div id="mc-phone-input-wrapper-mid" className="mc-field-group w-full">
									<Input
										color="orange"
										label="phone number"
										labelHidden={true}
										type="text"
										name="PHONE"
										placeholder="Phone number"
										className="w-full bg-schist-low"
										id="mce-PHONE-mid"
										inputBg="bg-white"
									/>
								</div>
							</div>
	
							{/* Auto-tags every submission through this form as "Approval Primary Pledge" */}
							<input type="hidden" name="tags" value="4527864" />

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
									name="group[384917][16]"
									id="mce-group-384917-0-mid"
									className="mt-1 shrink-0 w-4 h-4 accent-orange cursor-pointer"
								/>
								<span className="text-bsm text-schist-higher leading-snug">
									I'm interested in volunteering to help gather signatures
								</span>
							</label>

							<ActionButton
								color="green"
								variant="solid"
								className="mx-auto whitespace-nowrap px-20 mt-3 bg-green hover:bg-green-high"
								size="lg"
								name="subscribe"
								id="mc-embedded-subscribe-mid"
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

export default MidPledge;