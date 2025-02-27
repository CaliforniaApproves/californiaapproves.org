import React, { PropsWithChildren } from 'react'
import CaaLink from "../components/common/links";

type FaqProps = {
  question: string
}

const Faq = ({ question, children }: PropsWithChildren<FaqProps>) => {
  return (
    <div className="mt-8">
      <h2 className="text-purple">{question}</h2>
      <p className="text-lg mt-7 max-w-prose">{children}</p>
    </div>)
};

const FaqPage = () => {
  return (
    <div className='caa-faq-page'>
      <div className="px-8 py-8 mx-auto lg:w-3/5">
        <Faq question="What is California Approves?">
          California Approves is a general purpose committee formed to support candidates and ballot measures in favor of Approval Voting. We are a group of California voters dedicated to empowering people by strengthening democracy in California.
        </Faq>
        <Faq question="What is Approval Voting?">
          Approval Voting is a voting method where voters can select (&quot;approve of&quot;) any number of candidates, and the candidate with the most approvals wins.
          <p>
          It&apos;s like choosing a movie or a restaurant with a big group of friends. If there are two pizza places and a sushi restaurant and most people want pizza, then pizza should win even if some people like one pizza place more than the other.
          </p>
          <p>
            <CaaLink color="purple" to="https://youtu.be/K7kDlctGsQM" className='font-bold' target="_blank" rel="noopener noreferrer">Check out our in-depth video!</CaaLink>
          </p>
        </Faq>
        <Faq question="Why Approval Voting?">
          <strong>Approval Voting makes politicians work for <em>you</em></strong>. It empowers voters and improves democracy by making elections more fair, representative, and resistant to corruption. It aligns with the fundamental goals of a good voting system:
          <ul className="list-disc list-inside mt-6">
            <li className="mt-2">More Voice, Less Distortion – Voters can express their real preferences rather than being forced into an artificial either-or choice. This leads to outcomes that better reflect the will of the people.</li>
            <li className="mt-2">Reduces Systemic Bias – The existing system favors entrenched parties, discourage alternative perspectives, and polarizes every issue. Approval Voting levels the playing field by allowing candidates to gain support without being punished for ideological overlap.</li>
            <li className="mt-2">Encourages Cooperation, Reduce Polarization – Since candidates benefit from appealing to a broad range of voters, there is less incentive to engage in negative, polarizing campaigns.</li>
            <li className="mt-2">Strengthens Legitimacy – When the winner has the broadest possible base rather than just the biggest chunk, elections produce leaders who are more widely accepted by the public and less owned by special interests.</li>
            <li className="mt-2">Stability and Good Governance - As political landscapes become more fragmented and diverse, a voting system that allows multiple choices to improve outcomes makes governance more inclusive and stable.</li>
          </ul>
        </Faq>
        <Faq question="What's different about Approval Voting?">
          <p>
          In our current voting system, most often called plurality voting or First-past-the-post (FPTP) voters can choose only one candidate to support, and the candidate with the most votes wins. In Approval Voting, voters can choose multiple candidates, potentially leading to a better outcome.
          </p>
        </Faq>
        <Faq question="What are the advantages of Approval Voting?">
          <ul className="list-disc list-inside">
            <li>Promotes consensus candidates: Candidates who are broadly acceptable to the majority are more likely to win. This means the candidate that wins is more likely to care about you.</li>
            <li>Reduces vote-splitting: Voters can support multiple candidates without worrying about wasting their vote.</li>
            <li>Encourages positive campaigning: Candidates are incentivized to appeal to a broader audience rather than just their base.</li>
            <li>Simplicity: It is easy to understand and implement.</li>
          </ul>
        </Faq>
        <Faq question="Does Approval Voting favor moderate candidates?">
          Approval Voting tends to favor candidates who are broadly acceptable to a majority of voters, which may or may not be moderate candidates. It depends on voter behavior and the distribution of preferences. If the voters are moderate, the candidate will be moderate. If the voters are not moderate, the candidate is unlikely to be moderate.
        </Faq>
        <Faq question='Does Approval Voting violate the "one person, one vote" principle?'>
          No, Approval Voting adheres to the principle of &quot;one person, one vote.&quot; Each voter has one ballot, but they can express support for multiple candidates on that ballot.
        </Faq>
        <Faq question="Does Approval Voting require changes to existing voting machines?">
          Approval Voting can often be implemented with minimal changes to existing voting systems, as it only requires the ability to select multiple candidates on a ballot. Most voting machines already have this ability.
        </Faq>
        <Faq question="How does Approval Voting affect third-party candidates?">
          Approval Voting can benefit third-party candidates by allowing voters to support them without fear of wasting their vote on a less popular candidate. This can show that the third party has support and help get their policies adopted. The current system hides support for third parties.
        </Faq>
        <Faq question="Is Approval Voting more democratic than other systems?">
          Approval Voting is often seen as more democratic because it allows voters to express support for multiple candidates, potentially leading to outcomes that better reflect the will of the electorate.
        </Faq>
      </div>
    </div>
  );
}

export default FaqPage;