import { useState } from "preact/hooks";

type NestedFaq = {
	label: string;
	body: string[];
	link?: { href: string; text: string };
	nested?: NestedFaq;
};

type FaqEntry = {
	id: string;
	q: string;
	a: string[];
	nested?: NestedFaq;
};

const faqs = [
	{
		id: "q0",
		q: "Do I have to approve more than one candidate?",
		a: [
			'No. If you only want to support one candidate, mark just that one. Your ballot works exactly like it does today. Approval Voting doesn\’t ask anything different of you unless you want it to. The reform isn\’t about changing how you personally vote; it\’s about giving every voter the freedom to do more if they want to, so that primaries as a whole measure support more accurately. Whether you mark one candidate or five, your vote counts fully either way.',
		],
	},
	{
		id: "q1",
		q: "Does approving more candidates ever take away from my favorite?",
		a: [
			"No. Approving an additional candidate never takes support away from your favorite. You're only ever adding support for someone else, never subtracting it from anyone you've already approved. The final outcome will still reflect what the whole electorate wants, but your own ballot never reduces support for your favorite.",
		],
	},
	{
		id: "q2",
		q: "Won't voters just approve of one candidate anyway?",
		a: [
			'No. In St. Louis, roughly a third of voters approved more than one candidate, and among supporters of lesser-known candidates, over 80% did. Voters use the freedom to support everyone they genuinely like — they just weren\'t able to before.',
		],
	},
	{
		id: "q3",
		q: "Won't this create more single-party generals?",
		a: [
			"In districts with a single dominant party, same-party generals can still happen, because Approval Voting doesn't change who lives in a district or what they believe. What it can change is which candidates from that electorate actually advance: only those with the broadest support, not whoever happens to survive a fractured field. A same-party general under Approval Voting means voters are choosing between two candidates who both earned genuine, broad approval — not an accident of vote-splitting.",
		],
		nested: {
			label: "Go deeper",
			body: [
				"Approval Voting doesn't just change who advances, it can change who decides to run in the first place. Under choose-one voting, entering a race alongside similar candidates risks splitting your own base and handing the race to someone else, so candidates have real reason to avoid running against same-lane rivals at all. Candidates with genuine cross-coalition appeal face the opposite barrier: in a zero-sum system, they rarely have a built-in base large enough to outcompete an established partisan machine, so many are discouraged from running at all. Under Approval Voting, both barriers disappear: voters can approve every candidate they like, so entering a race no longer threatens to divide anyone's support, and candidates can decide to run based on their own appeal, regardless of who else is in the field. Breadth of appeal becomes an advantage rather than a liability, and candidates compete purely on how broadly they can earn voter support — including voters outside their own base — because that's what it actually takes to win.",
				"Approval Voting can also change how seriously a candidate is taken once they decide to run. Today, even a candidate who could appeal broadly across coalitions is often written off as \"non-viable\" the moment they enter, because choose-one voting has no way to prove that support is real until the votes are counted, by which point strategic voters have often already looked elsewhere. Approval Voting lets that support show up on the ballot itself, which can change who gets taken seriously as a real contender from day one, in any district, regardless of how it leans.",
			],
		},
	},
	{
		id: "q4",
		q: "Won't this make voting more complicated?",
		a: [
			'No. If anything, it\'s simpler. Instead of narrowing down those you like to the one who seems most "electable," you can just mark every candidate you approve of. You\'ve probably already made a decision this way: when a group is scheduling a meeting and everyone\'s asked which times work for them, nobody picks just one — you check every time you\'re free, and the option most people can make wins. That\'s basically approval voting. On the ballot, it\'s the same instinct: mark everyone you want to support, and move on.',
		],
	},
	{
		id: "q5",
		q: "Does this require new voting equipment?",
		a: [
			"No. California's existing voting equipment already supports marking more than one option in a race, so this does not require any new hardware or software to implement. It's a change to ballot instructions that simply eliminates the rule disqualifying your vote in a race for marking more than one candidate.",
		],
	},
];

const comparisonFaqs = [
	{
		id: "q6",
		q: "Why not just repeal the top-two primary entirely?",
		a: [
			"Repeal would mean going back to closed, partisan primaries — primaries where only registered party members vote, and party leadership effectively decides who advances to November. That's the exact structure Californians voted to move away from in 2010, precisely because it fueled polarization.",
			"The real problem today isn't the open primary itself, it's that vote-splitting in crowded primary fields is already producing nominees who don't reflect what most voters in an electorate actually want. Repeal is a step backward that doesn't even fix that problem; it just returns to a system voters already rejected. Approval Voting is the way forward: it keeps the open primary Californians chose and directly solves the issue that actually needs fixing: vote-splitting.",
		],
	},
	{
		id: "q7",
		q: "Why not just expand the number of candidates who advance to the general election?",
		a: [
			"Expanding the field is a fair consideration, and it isn't mutually exclusive with this reform, but it solves a different problem than the one we're focused on. Advancing three, four, or five candidates instead of two doesn't tell you which candidates actually earned one of those spots. If the primary still uses choose-one voting to pick them, it still can't tell a candidate with genuinely narrow support apart from one whose support was simply split among other candidates. You'd just be advancing a larger field, chosen the same flawed way, with no more certainty that the most broadly supported candidates make it out of the primary.",
			"Approval Voting fixes that measurement problem regardless of how many candidates ultimately advance. That's why we believe it belongs in the primary no matter what the general election looks like.",
		],
		nested: {
			label: "Go deeper",
			body: [
				"We\'re proposing Approval Voting paired with California\'s existing top-two structure because it fixes the specific, well-documented problem in front of us, and it happens to do so with the smallest possible change: no new ballot design in the general election, no additional candidates for voters to research and compare, and no multiple rounds to sort through.",
				"A two-candidate general also has a property none of the more complex alternatives share: it's the only election that is completely strategy-free, since there's no reason to vote for anyone but your honest favorite.",
			],
		},
	},
	{
		id: "q8",
		q: "How is this different from Ranked Choice Voting (RCV)?",
		a: [
			"RCV asks voters to rank candidates in order and eliminates them round by round. Approval Voting only asks whether you support a candidate or not, and then counts every mark on every ballot in a single tally with no rankings and no risk of eliminating a broadly-liked candidate along the way.",
		],
		nested: {
			label: "Why not Ranked Choice Voting (RCV)?",
			body: [
				"RCV fails at its core job: it can eliminate the most broadly-preferred candidate. Burlington, Vermont saw this happen first hand. They adopted RCV, watched it knock out the candidate most voters preferred over the eventual winner, and then repealed it.",
				"There's also a scope problem specific to California: RCV only ever applies to the general election, leaving the primary completely untouched. You'd be adding real complexity at the stage that needs it least, while leaving vote-splitting exactly where it actually happens — in the primary.",
				"Lastly, RCV has a counterintuitive practical implication: because RCV depends on the order you rank candidates, honestly ranking your preferences can sometimes help elect a candidate you don’t support. Approval Voting has no such risk. Your ballot can only ever help candidates you actually support, and never anyone you don’t."
			],
		},
	},
];

// A single collapsible "go deeper" block — can itself contain another one, so it calls itself
const NestedToggle = ({ nested }: { nested?: NestedFaq }) => {
	const [open, setOpen] = useState(false);

	if (!nested) return null;

	return (
		<div className="mt-2 pl-3 border-l-2 border-schist">
			<button
				type="button"
				onClick={() => setOpen((prev) => !prev)}
				className="flex items-center gap-1.5 text-bsm font-semibold text-orange-accent py-1.5 cursor-pointer"
			>
				<span
					className={`inline-block transition-transform ${open ? "rotate-90" : ""}`}
				>
					›
				</span>
				{nested.label}
			</button>
			{open && (
				<div className="pb-2">
					{nested.body.map((p: string) => (
						<p key={p.slice(0, 24)} className="text-small text-schist-high leading-relaxed mb-3 max-w-[66ch]">
							{p}
						</p>
					))}
					{nested.link && (
						<a
							href={nested.link.href}
							target="_blank"
							rel="noopener"
							className="text-bsm font-semibold text-orange-accent hover:underline"
						>
							{nested.link.text}
						</a>
					)}
					<NestedToggle nested={nested.nested} />
				</div>
			)}
		</div>
	);
};

const FaqItem = ({
	item,
	isOpen,
	onToggle,
}: {
	item: FaqEntry;
	isOpen: boolean;
	onToggle: () => void;
}) => {
	return (
		<div className="border-b border-schist">
			<button
				type="button"
				onClick={onToggle}
				className="w-full flex justify-between items-center gap-5 py-5 text-left cursor-pointer"
			>
				<span className="text-green text-base font-semibold">{item.q}</span>
				<span
					className={`font-mono text-xl text-orange-accent shrink-0 transition-transform ${
						isOpen ? "rotate-45" : ""
					}`}
				>
					+
				</span>
			</button>
			{isOpen && (
				<div className="pb-5">
					{item.a.map((p: string) => (
						<p key={p.slice(0, 24)} className="text-base text-schist-high leading-relaxed mb-3 max-w-[70ch]">
							{p}
						</p>
					))}
					<NestedToggle nested={item.nested} />
				</div>
			)}
		</div>
	);
};

const Questions = () => {
	const [openId, setOpenId] = useState<string | null>("q1");

	const toggle = (id: string) => {
		setOpenId((prev) => (prev === id ? null : id));
	};

	return (
		<div className="py-16 lg:py-20">
			<div className="max-w-[720px] m-auto px-8">
				<div className="font-bold text-small text-orange-accent uppercase">Common Questions</div>
				<h2 className="text-green mt-2 mb-8">
					Good questions deserve straight answers.
				</h2>

				{faqs.map((item) => (
					<FaqItem
						key={item.id}
						item={item}
						isOpen={openId === item.id}
						onToggle={() => toggle(item.id)}
					/>
				))}

				<div className="text-lg font-bold text-orange-accent uppercase pt-7 pb-2">
					Comparing Approval Voting to other reforms
				</div>

				{comparisonFaqs.map((item) => (
					<FaqItem
						key={item.id}
						item={item}
						isOpen={openId === item.id}
						onToggle={() => toggle(item.id)}
					/>
				))}
			</div>
		</div>
	);
};

export default Questions;