/* ****** CAA Imports ****** */
// UI
import Link from '../components/common/links';

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { useState } from 'react'

import {
    useFloating,
    autoUpdate,
    useInteractions,
    useClick,
    autoPlacement
} from '@floating-ui/react';

/* ****** Assets ****** */
import Background from '../assets/images/Illustrations-1.webp';
import Arrow from '../assets/icons/Arrow.svg?react';

/* ****** Constants ****** */
// Imported

// Generated

// create a component
const About = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {refs, floatingStyles, context} = useFloating({
        middleware: [
            autoPlacement({alignment: 'start'})
        ],
        open: isOpen,
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate
    });

    const click = useClick(context);

    const {getReferenceProps, getFloatingProps} = useInteractions([
        click,
    ]);

    return (
        <div
            className='flex flex-col align-center items-center pb-28 px-8'
            style={{
                backgroundImage: `url(${Background})`
                , backgroundRepeat: 'no-repeat'
                , backgroundPositionY: "bottom"
            }}
        >
            <h1 className='text-green text-center my-16'>
                How We Are Making Waves
            </h1>
            <div className='flex flex-col lg:flex-row align-center'>
                <div className='bg-purple text-white lg:w-80 py-[50px] px-6 rounded-t-2xl lg:rounded-t-none lg:rounded-bl-2xl h-[80%] lg:mb-10'>
                    <h3>
                        Education
                    </h3>
                    <p className="text-base pt-3">
                        The road to better democracy starts with awareness. We offer live expert-led presentations for political organizations, professional unions, and more.
                    </p>
                    <br/>
                    <Link
                        to='https://calendly.com/alan-approves/30min'
                        target="_blank"
                        color="white"
                        className='italic underline flex flex-row text-small align-center items-center text-center'
                    >
                        BOOK NOW
                        <Arrow className="fill-current w-6 h-6 ml-2"/>
                    </Link>
                </div>
                <div className='bg-orange text-white lg:w-80 py-[50px] px-6 lg:rounded-b-2xl'>
                    <h3>
                        Campaigning
                    </h3>
                    <p className="text-base pt-3">
                        Let us help bring Approval Voting to your city. As an FPPC-approved committee, we are the only organization in California that can directly fund your campaign.
                    </p>
                    <br/>
                    <button
                        type="button"
                        color="white"
                        className='italic underline flex flex-row text-small align-center items-center text-center'
                        ref={refs.setReference}
                        {...getReferenceProps()}
                    >
                        LEARN MORE
                        <Arrow className="fill-current w-6 h-6 ml-2"/>
                    </button>
                    {isOpen && (
                        <div
                            ref={refs.setFloating}
                            style={floatingStyles}
                            className='bg-white text-black text-base w-3/4 max-w-96 mx-auto border border-black rounded-lg p-4'
                            {...getFloatingProps()}
                        >
                            The requirements for running an approval campaign in a city vary depending on the laws of
                            that city. At a minimum, there must be a city charter and someone living in the city willing
                            to sign the application to circulate a petition. If you're interested a 
                            campaign <Link to="mailto:info@californiaapproves.org" target="_blank" className='underline' color="black">contact us</Link>!
                        </div> 
                    )}
                </div>
                <div className='bg-green text-white lg:w-80 py-[50px] px-6 rounded-b-2xl lg:rounded-bl-none lg:rounded-br-2xl h-[80%] lg:mb-10'>
                    <h3>
                        Community
                    </h3>
                    <p className="text-base pt-3">
                        Live in an area where partisanship has made the electoral process unrepresentative of your community? Use our platform to share your story and get connected.
                    </p>
                    <br/>
                    <Link
                        to='mailto:info@californiaapproves.org'
                        color="white"
                        target="_blank"
                        className='italic underline flex flex-row text-small align-center items-center text-center'
                    >
                        GET IN TOUCH
                        <Arrow className="fill-current w-6 h-6 ml-2"/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

//make this component available to the app
export default About
