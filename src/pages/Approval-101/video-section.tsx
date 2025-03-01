/* ****** CAA Imports ****** */
// UI
import Video from '../../components/common/video';

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React from 'react'


/* ****** Assets ****** */
import Background from '../../assets/images/Group-39.svg';

/* ****** Constants ****** */
// Imported

// Generated

// create a component
const VideoSection = () => {
    return (
        <div className='flex flex-col px-8 py-10'
            style={{
                backgroundImage: `url(${Background})`
                , backgroundSize: 'cover'
                , backgroundRepeat: 'no-repeat'
            }}
        >
            <h1 className='mb-10 text-center'>What is Approval Voting?</h1>
            <div className='flex flex-col lg:flex-row'>
                <div className='lg:w-1/2'>
                    <Video embedId={"K7kDlctGsQM"} title={"What Is Approval Voting?"}/>
                </div>
                <div className='lg:w-1/2 px-8 my-auto'>
                    <h5>When you enter the polling booth, you can only vote for one candidate. But only being able to vote for one candidate causes lots of problems:</h5>
                    <ul className="list-disc pl-10 pt-4 text-base">
                        <li>If your favorite isn’t the front runner, you can’t vote for them without risking helping your least favorite with. This is called “the spoiler effect”.</li>
                        <li>Winning candidates often don’t represent a broad base of voters. It is common for candidates to receive less than 50% of the vote.</li>
                        <li>The system is dominated by two parties, leaving no room for new ideas to break through.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

//make this component available to the app
export default VideoSection
