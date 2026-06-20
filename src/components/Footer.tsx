import Logo from "../assets/icons/California-Approves-Logo-RGB-OL.svg?react";
import { SocialLinks } from "./SocialLinks";
import { Link } from "./common/links";

const navigation = {
	learnMore: [
		{ name: "About", href: "/about" },
		{ name: "FAQ", href: "/faq" },
		{ name: "Approval 101", href: "/approval-101" },
	],
	getInvolved: [
		{ name: "Join Us", href: "/contact" },
		{ name: "Donate", href: "/donate" },
		{ name: "Contact Us", href: "mailto:info@californiaapproves.org" },
		{
			name: "Merchandise",
			href: "https://californiaapproves.creator-spring.com/",
			newPage: true,
		},
	],
};

export function Footer() {
	return (
		<footer
			className="bg-white px-4 flex flex-col"
			aria-labelledby="footer-heading"
		>
			<h2 id="footer-heading" className="sr-only">
				Footer
			</h2>
			<div className="w-full lg:px-44 py-10 lg:py-20">
				<div className="flex flex-col lg:flex-row justify-between w-full">
					<div className="space-y-8 lg:w-1/4">
						<Logo className="w-[137px] h=[39px]" />
						<p className="leading-6">
							California Approves is a grassroots organization working to
							improve democracy, reduce political polarization, and make
							progress on the things Californians can agree on.
						</p>
					</div>
					<div className="lg:w-1/4 lg:px-8">
						<h3 className="text-sm font-semibold leading-6 text-orange">
							Learn More
						</h3>
						<ul className="lg:space-y-4 lg:mt-6">
							{navigation.learnMore.map((item) => (
								<li key={item.name}>
									<Link to={item.href}>{item.name}</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="lg:w-1/4 lg:px-8">
						<h3 className="text-sm font-semibold leading-6 text-orange">
							Support
						</h3>
						<ul className="lg:space-y-4 lg:mt-6">
							{navigation.getInvolved.map((item) => (
								<li key={item.name}>
									<Link to={item.href} target={item.newPage ? "_blank" : ""}>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="lg:w-1/4">
						<div>
							<h3 className="text-sm font-semibold leading-6 text-orange">
								Follow Us
							</h3>
							<SocialLinks color="purple" />
						</div>
					</div>
				</div>
				<div className="mt-16 border-t border-white/10 py-8 lg:mt-24 flex flex-row justify-between">
					<a
						href="https://creativecommons.org/licenses/by/4.0/"
						className="text-xs leading-5"
					>
						&copy; Creative Commons Attribution 4.0 License
					</a>
					<p className="text-xs leading-5">
						This site is funded by California Approves: FPPC# 1440633
					</p>
				</div>
			</div>
		</footer>
	);
}
