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

const FALLBACK_EMAIL = "newsletter@californiaapproves.org";

// create a component
const MailingForm = () => {
	const turnstile = useTurnstile("newsletter");
	const { token, reset } = turnstile;
	const [status, setStatus] = useState<SubmitStatus>("idle");
	const [message, setMessage] = useState("");

	const handleSubmit = async (event: TargetedSubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (status === "submitting") return;
		if (turnstile.status === "unavailable") {
			setStatus("error");
			setMessage(
				`Verification couldn't load, so we can't accept the form. Email ${FALLBACK_EMAIL} and we'll add you.`,
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
		const result = await submitSubscription("newsletter", formEl, token);
		setStatus(result.ok ? "success" : "error");
		setMessage(result.message);
		if (result.ok) formEl.reset();
		reset();
	};

	return (
		<div className="bg-white border-purple rounded-[50px] border-[6px] p-5 lg:p-12 text-center flex flex-col items-center gap-3">
			<h2 className="text-green">
				Bring Approval <br />
				Voting To California
			</h2>
			<p className="text-small mt-2">
				We are creating a movement for a better democracy in California. Sign up
				for our newsletter to stay up to date on news, initiatives, ballot
				reforms and more
			</p>
			<div className="w-full">
				{/* No native action: submissions go through /api/subscribe, which
				    verifies the Turnstile token before forwarding to Mailchimp. A
				    Mailchimp action here would let anyone post around that check. */}
				<form
					id="mc-embedded-subscribe-form"
					name="mc-embedded-subscribe-form"
					className="validate"
					onSubmit={handleSubmit}
				>
					<div id="mc_embed_signup_scroll">
						<div id="mc-email-input-wrapper" className="mc-field-group">
							<Input
								color="purple"
								label="email"
								labelHidden={true}
								type="email"
								name="EMAIL"
								placeholder="Enter your email"
								className="w-full required email"
								id="mce-EMAIL"
								required
							/>
							<span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
						</div>
						<div id="mce-responses" className="clear">
							<div className="response" id="mce-error-response"></div>
							<div
								className="response"
								id="mce-success-response"
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
						<TurnstileField
							widget={turnstile}
							fallbackEmail={FALLBACK_EMAIL}
							className="mt-4"
						/>
						{message ? (
							<p
								role="status"
								className={`text-small mt-3 ${
									status === "error" ? "text-orange" : "text-green"
								}`}
							>
								{message}
							</p>
						) : null}
						<div className="mt-4">
							<ActionButton
								color="purple"
								variant="outlined"
								className="text-purple mx-auto"
								size="lg"
								type="submit"
								disabled={
									turnstile.status !== "ready" || status === "submitting"
								}
							>
								{status === "submitting" ? "Joining…" : "JOIN US"}
							</ActionButton>
						</div>
					</div>
				</form>
				<noscript>
					<p className="text-small text-orange mt-3">
						This form needs JavaScript for its spam check. Email{" "}
						{FALLBACK_EMAIL} and we'll add you to the newsletter.
					</p>
				</noscript>
			</div>
			<p className="italic text-small">
				By subscribing you agree to with our Privacy Policy and provide consent
				to receive updates from our organization.
			</p>
		</div>
	);
};

//make this component available to the app
export default MailingForm;
