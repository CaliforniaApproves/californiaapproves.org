import React from 'react'
import CaaIntro from './caa-intro';
import JoinUs from './join';
import People from './people';
import Plan from './plan';





// create a component
export function About() {
    return (
        <div className='caa-about-page'>
            <title>About California Approves</title>
            <CaaIntro />
            <Plan />
            <People />
            <JoinUs />
        </div>
    );
}