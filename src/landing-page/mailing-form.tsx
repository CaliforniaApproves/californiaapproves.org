/* ****** CAA Imports ****** */
// UI
import Input from '../components/common/input';
import { ActionButton } from '../components/common/buttons';

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { useState } from 'react'


/* ****** Assets ****** */

/* ****** Constants ****** */
// Imported

// Generated

// create a component
const MailingForm = () => {
    const [email, setEmail] = useState<string>('');

    return (
        <div className='bg-white border-purple rounded-[50px] border-[6px] p-12 text-center flex flex-col items-center'>
            <h2 className='text-green'>
                Bring Approval <br/>Voting To California
            </h2>
            <p className='text-small mt-2'>
                We are creating a movement for a better democracy in California. Sign up for our newsletter to stay up to date on news, initiatives, ballot reforms and more 
            </p>
            <br/>
            <div id="mc_embed_signup" className='w-full'>
                <form
                    action="https://californiaapproves.us5.list-manage.com/subscribe/post?u=b4aa7540a62457c043ff00e36&amp;id=dddf3d641c&amp;f_id=003abee6f0"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate"
                    target="_self"
                >
                    <div id="mc_embed_signup_scroll">
                        <div id="mc-email-input-wrapper" className="mc-field-group">
                            <Input
                                color="purple"
                                value={email}
                                setValue={setEmail}
                                label="email"
                                labelHidden={true}
                                type='email'
                                name="EMAIL"
                                placeholder='Enter your email'
                                className='w-full required email'
                                id="mce-EMAIL"
                                required
                            />
                            <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
                        </div>
                        <div id="mce-responses" className="clear">
                            <div
                                className="response"
                                id="mce-error-response"
                            ></div>
                            <div
                                className="response"
                                id="mce-success-response"
                                style={{ display: "none" }}
                            ></div>
                        </div>
                        {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
                        <div style={{ position: "absolute", left: '-5000px'}} aria-hidden="true">
                            <input
                                type="text"
                                name="b_b4aa7540a62457c043ff00e36_dddf3d641c"
                                tabIndex={-1}
                                defaultValue=""
                            />
                        </div>
                        <div className="mt-4">
                            <ActionButton
                                color='purple'
                                variant='outlined'
                                className="text-purple mx-auto"
                                size='lg'
                                name="subscribe"
                                id="mc-embedded-subscribe"
                                type="submit"
                            >
                                JOIN US
                            </ActionButton>
                        </div>
                    </div>
                </form>
                </div>
 
            <br/>
   
            <br/>
            <p className='italic text-small'>
                By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our organization.
            </p>
        </div>
    );
}

//make this component available to the app
export default MailingForm
