/* ****** CAA Imports ****** */
// UI
import VideoSection from './video-section';
import BallotSection from './ballot-section';
import ClosingSection from './closing-section';
import CallToAction from './call-to-action';
// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { PropsWithChildren } from 'react'


/* ****** Assets ****** */

/* ****** Constants ****** */
// Imported

// Generated

// create a component
const Approval101Page = () => {
    return (
        <div className='approval-101-page'>
            <title>What is Approval Voting?</title>
            <VideoSection />
            <BallotSection />
            <ClosingSection/>
            <CallToAction />
        </div>
    );
}

//make this component available to the app
export default Approval101Page
