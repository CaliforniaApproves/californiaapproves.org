/* ****** CAA Imports ****** */
// UI

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { PropsWithChildren } from 'react'


/* ****** Assets ****** */
import voteMatters from '../assets/images/vote-matters.webp';

/* ****** Constants ****** */
// Imported

// Generated

// create a component
const ClosingSection = () => {
    return (
        <div className='py-10 px-8 flex flex-col lg:flex-row'>
            <div className='lg:w-1/2'>
                <img className='rounded-2xl' src={voteMatters} alt="your vote matters"/>
            </div>
            <div  className='lg:w-1/2 lg:ml-4 my-auto'>
                <h2>Approval Voting is a simple tweak that offers enormous benefits:</h2>
                <ul className="list-disc pl-10 text-base pt-4">
                    <li>If your favorite isn’t the front runner, you can’t vote for them without risking helping your least favorite with. This is called “the spoiler effect”.</li>
                    <li>Winning candidates often don’t represent a broad base of voters. It is common for candidates to receive less than 50% of the vote.</li>
                    <li>The system is dominated by two parties, leaving no room for new ideas to break through.</li>
                </ul>
            </div>
        </div>
    );
}

//make this component available to the app
export default ClosingSection
