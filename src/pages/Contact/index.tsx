import ContactForm from "./contact-form";
import InfoSection from "./info-section";
import TopSection from "./top-section";

// create a component
export function Contact() {
	return (
		<div className="caa-contact-page">
			<title>Contact California Approves</title>
			<TopSection />
			<ContactForm />
			<InfoSection />
		</div>
	);
}
