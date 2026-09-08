import type { TargetedSubmitEvent } from "preact";
import { useState } from "preact/hooks";
import Logo from "../../assets/icons/Circles/California-Approves-Logo-Circles-w-Checks-RGB.svg?react";
import { ActionButton } from "../../components/common/buttons";
import Input from "../../components/common/input";
import {
	submitSubscription,
	TurnstileField,
	useTurnstile,
} from "../../components/common/turnstile";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const FALLBACK_EMAIL = "contact@californiaapproves.org";

// create a component
const ContactForm = () => {
	const turnstile = useTurnstile("contact");
	const { token, reset } = turnstile;
	const [status, setStatus] = useState<SubmitStatus>("idle");
	const [message, setMessage] = useState("");

	const handleSubmit = async (event: TargetedSubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (status === "submitting") return;
		if (turnstile.status === "unavailable") {
			setStatus("error");
			setMessage(
				`Verification couldn't load, so we can't accept the form. Email ${FALLBACK_EMAIL} and we'll get you set up.`,
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
		const result = await submitSubscription("contact", formEl, token);
		setStatus(result.ok ? "success" : "error");
		setMessage(result.message);
		if (result.ok) formEl.reset();
		reset();
	};

	return (
		<div className="py-16 text-center flex flex-col">
			<Logo className="w-40 m-auto" />
			<h2 className="m-auto">Effect Change</h2>
			<br />
			<div className="text-left m-auto max-w-2xl">
				<p className="text-base">
					This is your first step to getting involved in Californian election
					reform. We will send you our discord link, our virtual meet up link,
					and an introductory email.
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
									value=""
									readOnly
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
									className={`text-small mt-3 text-center ${
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
							{FALLBACK_EMAIL} and we'll get you set up.
						</p>
					</noscript>
				</div>

				<br />

				<br />
				<p className="italic text-small">
					By subscribing you agree to with our Privacy Policy and provide
					consent to receive updates from our organization.
				</p>
			</div>
		</div>
	);
};

//make this component available to the app
export default ContactForm;
