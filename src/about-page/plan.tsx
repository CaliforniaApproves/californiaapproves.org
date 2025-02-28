/* ****** CAA Imports ****** */
// UI

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { PropsWithChildren } from 'react'


/* ****** Assets ****** */
import signatures from '../assets/images/signatures.webp';

/* ****** Constants ****** */
// Imported

// Generated

// create a component
const Plan = () => {
    return (
        <div className='caa-intro flex flex-col lg:flex-row items-center justify-center bg-green text-white py-10'>
            <div className='lg:w-1/2 p-4'>
                <img className='rounded-2xl' src={signatures} alt="signatures"/>
            </div>
            <div className='flex flex-col m-auto px-8 lg:w-1/2'>
                <h2 className='text-tan'>Our Plan</h2>
                <p className='text-large-bold'>1. Run donation campaign to fund ballot initiative.</p>
                <p className='text-large-bold'>2. Identify good target for ballot initiative.</p>
                <p className='text-large-bold'>3. Use the donations to fund signature campaign.</p>
                <p className='text-large-bold'>4. Put Approval Voting on the ballot.</p>
            </div>
        </div>
    );
}

//make this component available to the app
export default Plan
