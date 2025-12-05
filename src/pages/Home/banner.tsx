/* ****** CAA Imports ****** */
// UI
import MailingForm from './mailing-form';

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React from 'react'

/* ****** Assets ****** */
import strongArm from '../../assets/images/Strong-Arm 1.webp';

/* ****** Constants ****** */
// Imported
import Arrow from '../../assets/icons/Long-Arrow.svg?react';
import Background from '../../assets/images/Group-39.svg';

// Generated

// create a component
const Banner = () => {
    return (
        <div
            className="caa-home-page-banner w-full flex flex-col lg:flex-row items-center justify-center py-[30px]"
            style={{
                backgroundImage: `url(${Background})`
                , backgroundSize: 'cover'
                , backgroundRepeat: 'no-repeat'
            }}
        >
            <div className='m-auto px-8 pb-14 lg:pb-0'>
                <img src={strongArm} alt="strong arm" width="338" height="316" className='aspect-169/158'/>
                <h1 className='text-green banner-drop-shadow'>
                    Approval Voting <br class="hidden lg:inline"></br>
                    Unites Us
                </h1>
                <div className='static max-w-[500px] mt-9'>
                    <Arrow className='absolute'/>
                    <p className='text-large-bold flex flex-row indent-24 font-bold lg:font-normal'>
                        Politics doesn't have to be so polarizing. Approval Voting changes the game so we can have representatives that focus on what we agree on instead of what divides us.
                    </p>
                </div>
            </div>
            <div className='py-[90px] max-w-full lg:max-w-[40%] m-auto bg-purple lg:bg-transparent px-8'>
              <MailingForm />
            </div>
        </div>
    );
}

//make this component available to the app
export default Banner
