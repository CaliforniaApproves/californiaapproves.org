import React, { PropsWithChildren } from 'react'
import BallotSection from './ballot-section';
import CallToAction from './call-to-action';
import ClosingSection from './closing-section';
import VideoSection from './video-section';





// create a component
export function Approval101() {
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
