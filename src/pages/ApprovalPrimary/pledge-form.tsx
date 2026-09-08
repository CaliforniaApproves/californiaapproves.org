import type { TargetedSubmitEvent } from "preact";
import { useState } from "preact/hooks";
import { ActionButton } from "../../components/common/buttons";
import Input from "../../components/common/input";
import {
	submitSubscription,
	TurnstileField,
	useTurnstile,
} from "../../components/common/turnstile";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const FALLBACK_EMAIL = "pledge@californiaapproves.org";

const PledgeForm = () => {
	const turnstile = useTurnstile("pledge");
	const { token, reset } = turnstile;
	const [status, setStatus] = useState<SubmitStatus>("idle");
	const [message, setMessage] = useState("");

	const handleSubmit = async (event: TargetedSubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (status === "submitting") return;
		if (turnstile.status === "unavailable") {
			setStatus("error");
			setMessage(
				`Verification couldn't load, so we can't accept your pledge. Email ${FALLBACK_EMAIL} and we'll add you.`,
			);
			return;
		}
		if (!token) {
			setStatus("error");
			setMessage("Please complete the verification challenge and try again.");
			return;
		}

		const formEl = event.currentTarget;
		setStatus("submitting");
		setMessage("");
		const result = await submitSubscription("pledge", formEl, token);
		setStatus(result.ok ? "success" : "error");
		setMessage(result.message);
		if (result.ok) formEl.reset();
		reset();
	};

	return (
		<div className="bg-green text-center py-16 lg:py-20" id="pledge">
			<div className="max-w-[700px] m-auto px-8">
				<h2 className="text-white">
					Help bring Approval Voting to California.
				</h2>
				<p className="text-base text-white/85 mt-3">
					Every pledge moves this closer to the 2028 ballot. Add your name
					below, and we'll follow up once the official petition is ready to
					sign.
				</p>

				<div className="bg-white rounded-[24px] p-6 lg:p-10 mt-9 text-left">
					{/* No native action: submissions go through /api/subscribe, which
					    verifies the Turnstile token before forwarding to Mailchimp. A
					    Mailchimp action here would let anyone post around that check. */}
					<form
						id="mc-embedded-subscribe-form-final"
						name="mc-embedded-subscribe-form-final"
						className="validate"
						onSubmit={handleSubmit}
					>
						<div className="flex flex-col gap-2">
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
							<div className="flex gap-2">
								<div
									id="mc-fname-input-wrapper-final"
									className="mc-field-group w-full"
								>
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
								<div
									id="mc-lname-input-wrapper-final"
									className="mc-field-group w-full"
								>
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
							<div
								id="mc-zip-input-wrapper-final"
								className="mc-field-group w-full"
							>
								<Input
									color="green"
									label="zip code"
									labelHidden={true}
									type="text"
									name="ZIP"
									placeholder="Zip code"
									className="w-full"
									id="mce-ZIP-final"
								/>
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

							{/* value="16" is required, not decorative: a checkbox with no
							    value attribute submits "on", but Mailchimp identifies the
							    interest group by its id (the 16 in the field name). Without
							    it the volunteering opt-in is silently dropped.

							    Known limitation: this is additive only. Ticking the box adds
							    the interest; leaving it unticked does NOT remove it from
							    someone who already has it, because an unchecked checkbox
							    submits no field at all and Mailchimp cannot tell "cleared"
							    from "not managed by this form".

							    Tried against the post-json endpoint (2026-09-08), all
							    no-ops — the interest stayed set and the endpoint returned
							    "your profile has been updated" every time:
							      group[384917][16]=        (empty)
							      group[384917][16]=false
							      group[384917][16]=0
							    Removal needs Marketing API v3
							    (PUT /lists/{id}/members/{hash} with interests:{"16":false}),
							    which would mean an API key secret on the Worker. Deemed not
							    worth it for a one-time signup: the label reads as an action,
							    not a preference toggle. */}
							<label className="flex items-start gap-2 mt-2 mb-1 cursor-pointer">
								<input
									type="checkbox"
									name="group[384917][16]"
									value="16"
									id="mce-group-384917-0-final"
									className="mt-1 shrink-0 w-4 h-4 accent-green cursor-pointer"
								/>
								<span className="text-bsm text-schist-higher leading-snug">
									I'm interested in volunteering to help gather signatures
								</span>
							</label>

							<TurnstileField
								widget={turnstile}
								fallbackEmail={FALLBACK_EMAIL}
								className="mt-2"
							/>
							{message ? (
								<p
									role="status"
									className={`text-bsm text-center mt-1 leading-snug ${
										status === "error" ? "text-orange" : "text-green"
									}`}
								>
									{message}
								</p>
							) : null}

							<ActionButton
								color="orange"
								variant="solid"
								className="mx-auto whitespace-nowrap px-20 mt-3 bg-orange hover:bg-orange-accent"
								size="lg"
								type="submit"
								disabled={
									turnstile.status !== "ready" || status === "submitting"
								}
							>
								{status === "submitting" ? "Adding…" : "ADD MY PLEDGE"}
							</ActionButton>
							<p className="italic text-center text-bsm mt-2 text-schist-higher leading-snug">
								We won't spam you or share your data. You can unsubscribe
								anytime.
							</p>
						</div>
						<noscript>
							<p className="text-bsm text-orange text-center mt-2 leading-snug">
								This form needs JavaScript for its spam check. Email{" "}
								{FALLBACK_EMAIL} and we'll add your pledge.
							</p>
						</noscript>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PledgeForm;
