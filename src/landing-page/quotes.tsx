/* ****** CAA Imports ****** */
// UI
import Carousel from '../components/common/carousel';
// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React from 'react'


/* ****** Assets ****** */

/* ****** Constants ****** */
// Imported

// Generated
type Quote = {
    quote: string;
    source: string;
}
const placeholderQuotes: Quote[] = [
    {
        quote: 'Approval Voting is a simple way to have more candidates who represent our interests. A nice side-effect is that they also get along with each other better.'
        , source: 'Jim McKelvey, St. Louis, MO'
    }
    , {
        quote: "Approval Voting is simple, transparent, and empowers voters to truly have their voices heard."
        , source: 'Center for Election Science'
    }
    , {
        quote: "Approval Voting is the simplest voting method out there... [It] Promotes consensus politics and positive campaigning and combats polarization."
        , source: 'Equal Vote Coalition'
    }
    , {
        quote: "Right now, politicians can be elected with just 35% of the vote, and that's just not right...[Approval Voting] will make sure that most voters actually support the winning candidate."
        , source: 'Cori Bush, U.S. House of Representatives, MO-1, Democrat'
    }
    , {
        quote: "For a republic, a 'good candidate' is one who accurately represents their constituents as a whole. This matches John Adams' philosophy on republican government, and Approval Voting is incredibly accurate for being so simple."
        , source: 'Tyler McGettigan, Conservative Voter'
    }
]

// create a component
const Quotes = () => {
    return (
        <div className='bg-orange px-8 py-[112px]'>
            <Carousel className="m-auto" color="tan">
                { placeholderQuotes.map((quote, index) =>
                    <div key={index} className="lg:max-w-[50%] text-white hover:text-white">
                        <h2>{quote.quote}</h2>
                        <br/>
                        <h2>{quote.source}</h2>
                    </div>
                ) }
            </Carousel>
        </div>
    );
}

//make this component available to the app
export default Quotes
