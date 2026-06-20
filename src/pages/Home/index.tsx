import React from 'react'
import AboutUs from './about';
import AboutApproval from './approval';
import Banner from './banner';
// import News from './news';
import GetInvolved from './get-involved';
import Quotes from './quotes';
import Video from './video';




// create a component
export function Home() {
    return (
        <div>
            <title>California Approves</title>
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
