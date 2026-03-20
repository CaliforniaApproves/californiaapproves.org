/* ****** CAA Imports ****** */
// UI
import Video from '../../components/common/video';
import { Link } from '../../components/common/links';

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React from 'react'


/* ****** Assets ****** */
import Background from '../../assets/images/Background-Pattern.svg';
import Arrow from '../../assets/icons/Arrow.svg?react';

/* ****** Constants ****** */
// Imported

// Generated

// create a component
const LandingVideo = () => {
    return (
        
        <div
            className="caa-home-page-video w-full flex flex-col gap-11 items-center justify-center py-16 px-8"
            style={{
                backgroundImage: `url(${Background})`
                , backgroundSize: 'cover'
                , backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="w-full lg:w-3/4 aspect-video">
                <Video embedId={"m8VXIIaC9Zw"} title={"Approval Voting: The easy way to elect better leaders"}/>
            </div>
            <p className='text-large-bold text-center m-auto max-w-[768px]'>
                Approval Voting asks, &ldquo;Which candidates do you approve of?&rdquo;
            </p>
            <Link
                to="/approval-101"
                color="orange"
                className="flex flex-row text-small align-center items-center text-center"
            >
                LEARN MORE
                <Arrow className="fill-current w-6 h-6 ml-2"/>
            </Link>
        </div>
    );
}

//make this component available to the app
export default LandingVideo
