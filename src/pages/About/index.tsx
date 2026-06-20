import CaaIntro from './caa-intro';
import Plan from './plan';
import People from './people';
import JoinUs from './join';



import React from 'react'





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