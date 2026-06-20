import Banner from './banner';
import Video from './video';
import AboutApproval from './approval';
import AboutUs from './about';
import Quotes from './quotes';
// import News from './news';
import GetInvolved from './get-involved';



import React from 'react'




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
