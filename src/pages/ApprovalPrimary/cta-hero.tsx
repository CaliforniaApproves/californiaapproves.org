import { ActionButton } from "../../components/common/buttons";

const HeroCTA = () => {
	const scrollToPledge = () => {
		document.getElementById("pledge")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="bg-white border-orange rounded-[50px] border-[6px] p-5 lg:p-12 text-center flex flex-col items-center gap-3">
			<h3 className="text-green">Pledge Your Support</h3>
			<p className="text-base pt-2">
				Add your name now, and we'll follow up once the official petition is
				ready to sign.
			</p>
			<ActionButton
				color="orange"
				variant="outlined"
				className="text-orange mx-auto whitespace-nowrap px-20 pt-4"
				size="lg"
				onClick={scrollToPledge}
			>
				ADD MY PLEDGE
			</ActionButton>
		</div>
	);
};

export default HeroCTA;
