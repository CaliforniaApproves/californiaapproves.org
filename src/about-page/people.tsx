/* ****** CAA Imports ****** */
// UI
import PersonIntro from './components/person';

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { PropsWithChildren } from 'react'
import update from 'immutability-helper';

/* ****** Assets ****** */
import alanProfile from '../assets/images/Alan-Savage-Profile.jpg';
import jeffProfile from '../assets/images/Jeff-Justice-Profile.jpg';
import kevinProfile from '../assets/images/Kevin-Gray-Profile.jpg';

/* ****** Constants ****** */
// Imported

// Generated

// create a component
const People = () => {
    return (
        <div className='caa-about-people flex flex-col py-10 px-4'>
            <h5>ABOUT US</h5>
            <h2 className='text-purple'>Meet Our Team</h2>
            <div className='flex flex-col lg:flex-row flex-wrap justify-between items-center py-10'>
                <PersonIntro
                    title='president'
                    name='Alan Savage'
                >
                    <img src={alanProfile} alt="alan savage"/>
                </PersonIntro>
                <PersonIntro
                    title='treasurer'
                    name='Jeff Justice'
                >
                    <img src={jeffProfile} alt="jeff justice"/>
                </PersonIntro>
                <PersonIntro
                    title='web developer'
                    name='Kevin Gray'
                >
                    <img className="h-[300px]" src={kevinProfile} alt="kevin gray"/>
                </PersonIntro>
            </div>
        </div>
    );
}

//make this component available to the app
export default People