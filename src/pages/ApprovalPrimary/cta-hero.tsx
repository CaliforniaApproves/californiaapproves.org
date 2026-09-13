import { ActionButton } from "../../components/common/buttons";

const HeroCTA = () => {
	const scrollToPledge = () => {
		document.getElementById("pledge")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="bg-white border-orange rounded-[50px] border-[6px] p-5 lg:p-12 text-center flex flex-col items-center gap-8">
			<h3 className="text-green">Our Primary Reform</h3>
			<p className="text-base">
				Pledge your support now, and we'll follow up when the official 
				petition is ready to sign.
			</p>
			<ActionButton
				color="orange"
				variant="outlined"
				className="text-orange mx-auto whitespace-nowrap px-25"
				size="lg"
				onClick={scrollToPledge}
			>
				PLEDGE YOUR SUPPORT
			</ActionButton>
		</div>
	);
};

export default HeroCTA;
