/* ****** CAA Imports ****** */
// UI

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React from 'react'

/* ****** Assets ****** */
import Ballot from '../../assets/images/Rectangle-102.webp';
import CheckMark from '../../assets/icons/Yellow-Check.svg?react';

/* ****** Constants ****** */
// Imported

// Generated

// create a component
const AboutApproval = () => {
    return (
        <div className='bg-purple flex flex-col-reverse lg:flex-row justify-around text-white pt-28'>
            <img className="w-fit h-fit" src={Ballot}/>
            <div className='flex flex-col max-w-full gap-y-5 lg:max-w-[50%] px-6 lg:px-0 font-bold lg:font-normal pb-28'>
                <h1 className='text-white'>
                    Simple, Effective and Affordable Reform
                </h1>
                <p className='text-base text-white'>
                    No confusing algorithms. No expensive new voting machines. Approval Voting is an uncomplicated solution that delivers meaningful improvements in the quality of representation and policies.
                </p>
                <br/>
                <div className='flex flex-row items-center'>
                    <CheckMark/>
                    <h3 className='ml-4'>
                        Prevents Vote-Splitting
                    </h3>
                </div>
                <div className='flex flex-row items-center'>
                    <CheckMark/>
                    <h3 className='ml-4'>
                        Reduces Hyper-Partisanship
                    </h3>
                </div>
                <div className='flex flex-row items-center'>
                    <CheckMark/>
                    <h3 className='ml-4'>
                        Elects Better Candidates
                    </h3>
                </div>
                <div className='flex flex-row items-center'>
                    <CheckMark/>
                    <h3 className='ml-4'>
                        Delivers Fair & Accurate Results
                    </h3>
                </div>
            </div>
        </div>
    );
}

//make this component available to the app
export default AboutApproval
