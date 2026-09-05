import { ActionButton } from "../../components/common/buttons";
import Input from "../../components/common/input";

// create a component
const HeroPledge = () => {
	return (
		<div className="bg-white border-orange rounded-[50px] border-[6px] p-5 lg:p-12 text-center flex flex-col items-center gap-3">
			<h3 className="text-green">
				Pledge Your Support
			</h3>
			<p className="text-small mt-2">
				Add your name now, and we'll follow up once 
				the official petition is ready to sign.
			</p>
			<div className="w-full">
				<form
					action="https://californiaapproves.us5.list-manage.com/subscribe/post?u=b4aa7540a62457c043ff00e36&id=dddf3d641c&f_id=004f43edf0"
					method="post"
					id="mc-embedded-subscribe-form-hero"
					name="mc-embedded-subscribe-form"
					className="validate"
					target="_self"
				>
					<div id="mc_embed_signup_scroll-hero" className="flex flex-col gap-2">
						<div className="flex gap-2">
							<div id="mc-fname-input-wrapper-hero" className="mc-field-group w-full">
								<Input
									color="orange"
									label="first name"
									labelHidden={true}
									type="text"
									name="FNAME"
									placeholder="First name"
									className="w-full"
									id="mce-FNAME-hero"
								/>
							</div>
							<div id="mc-lname-input-wrapper-hero" className="mc-field-group w-full">
								<Input
									color="orange"
									label="last name"
									labelHidden={true}
									type="text"
									name="LNAME"
									placeholder="Last name"
									className="w-full"
									id="mce-LNAME-hero"
								/>
							</div>
						</div>
						<div id="mc-email-input-wrapper-hero" className="mc-field-group">
							<Input
								color="orange"
								label="email"
								labelHidden={true}
								type="email"
								name="EMAIL"
								placeholder="Enter your email"
								className="w-full required email"
								id="mce-EMAIL-hero"
								required
							/>
							<span id="mce-EMAIL-HELPERTEXT-hero" className="helper_text"></span>
						</div>
						<div className="flex gap-2">
							<div id="mc-zip-input-wrapper-hero" className="mc-field-group w-full">
								<Input
									color="orange"
									label="zip code"
									labelHidden={true}
									type="text"
									name="ZIP"
									placeholder="Zip code"
									className="w-full"
									id="mce-ZIP-hero"
								/>
							</div>
							<div id="mc-phone-input-wrapper-hero" className="mc-field-group w-full">
								<Input
									color="orange"
									label="phone number"
									labelHidden={true}
									type="text"
									name="PHONE"
									placeholder="Phone number"
									className="w-full"
									id="mce-PHONE-hero"
								/>
							</div>
						</div>

						{/* Auto-tags every submission through this form as "Approval Primary Pledge" */}
						<input type="hidden" name="tags" value="4527864" />

						<div id="mce-responses-hero" className="clear">
							<div className="response" id="mce-error-response-hero"></div>
							<div
								className="response"
								id="mce-success-response-hero"
								style={{ display: "none" }}
							></div>
						</div>

						{/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
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
						<div>
							<label className="flex items-start gap-2 mt-4 mb-1 cursor-pointer">
								<input
									type="checkbox"
									name="group[384917][16]"
									id="mce-group-384917-0-hero"
									className="mt-1 shrink-0 w-4 h-4 accent-orange cursor-pointer"
								/>
								<span className="text-bsm text-schist-higher leading-snug">
									I'm interested in volunteering to help gather signatures
								</span>
							</label>
						</div>
						<div className="mt-4 flex flex-col gap-2">
							<ActionButton
								color="orange"
								variant="outlined"
								className="text-orange mx-auto whitespace-nowrap px-20"
								size="lg"
								name="subscribe"
								id="mc-embedded-subscribe-hero"
								type="submit"
							>
								ADD MY PLEDGE
							</ActionButton>
							<p className="italic text-bsm mt-2">
								By subscribing you agree to with our Privacy Policy and provide consent
								to receive updates from our organization.
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

//make this component available to the app
export default HeroPledge;
