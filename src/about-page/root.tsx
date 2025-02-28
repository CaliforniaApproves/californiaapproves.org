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
import React, { PropsWithChildren } from 'react'


/* ****** Assets ****** */

/* ****** Constants ****** */
// Imported

// Generated

// create a component
const AboutPage = () => {
    return (
        <div className='caa-about-page'>
            <CaaIntro />
            <Plan />
            <People />
            <JoinUs />
        </div>
    );
}

//make this component available to the app
export default AboutPage
