/* ****** Twist Imports ****** */
// UI

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { PropsWithChildren } from 'react'

import { NavButton } from '../../components/common/buttons';

/* ****** Assets ****** */

/* ****** Constants ****** */
// Imported

// Generated

// create a component
const JoinUs = () => {
    return (
        <div className='bg-purple text-white flex flex-col lg:flex-row w-full px-8 py-10 justify-around items-center'>
            <h2 className='text-center'>Want to join the team?</h2>
            <NavButton
                className='w-40 my-10'
                color='orange'
                variant='solid'
                link="/contact"
            >
                CONTACT US
            </NavButton>
        </div>
    );
}

//make this component available to the app
export default JoinUs
