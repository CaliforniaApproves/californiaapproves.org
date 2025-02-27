/* ****** CAA Imports ****** */
// UI
import Header from '../components/header';
import Footer from '../components/footer';
import Banner from './banner';
import Video from './video';
import AboutApproval from './approval';
import AboutUs from './about';
import Quotes from './quotes';
// import News from './news';
import GetInvolved from './get-involved';

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
const LandingPage = () => {
    return (
        <div>
            <Banner/>
            <Video/>
            <AboutApproval/>
            <AboutUs/>
            <Quotes />
            {/* <News /> */}
            <GetInvolved />
        </div>
    );
}

//make this component available to the app
export default LandingPage
