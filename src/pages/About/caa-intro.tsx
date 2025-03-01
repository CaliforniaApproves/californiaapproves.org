/* ****** CAA Imports ****** */
// UI

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { PropsWithChildren } from 'react'


/* ****** Assets ****** */
import activists from '../../assets/images/activists.webp';
import Background from '../../assets/images/Background-Pattern.svg';

/* ****** Constants ****** */
// Imported

// Generated


// create a component
const CaliforniaApprovesIntro = () => {
    return (
        <div className='caa-intro flex flex-col lg:flex-row items-center justify-center py-10'
            style={{
                backgroundImage: `url(${Background})`
                , backgroundSize: 'cover'
                , backgroundRepeat: 'no-repeat'
            }}
        >
            <div className='flex flex-col m-auto px-8 lg:w-1/2'>
                <h5>CALIFORNIA APPROVES</h5>
                <h2 className='text-purple'>Grassroots Reformers</h2>
                <p className='text-large-bold'>
                    We are volunteers gathered together by our passion to reform voting in California. We believe that good voting reform can bring our democracy closer to the will of the people and reduce partisanship.
                </p>
            </div>
            <div className='lg:w-1/2 p-4'>
                <img className='rounded-2xl' src={activists} alt="activists"/>
            </div>
        </div>
    );
}

//make this component available to the app
export default CaliforniaApprovesIntro
