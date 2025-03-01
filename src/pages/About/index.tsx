/* ****** CAA Imports ****** */
// UI
import CaaIntro from './caa-intro';
import Plan from './plan';
import People from './people';
import JoinUs from './join';

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React from 'react'


/* ****** Assets ****** */

/* ****** Constants ****** */
// Imported

// Generated

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