/* ****** CAA Imports ****** */
// UI
import NewsBlurb, { NewsBlurbProps, NewsTag } from './news-blurb';
// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { useState } from 'react'


/* ****** Assets ****** */

/* ****** Constants ****** */
// Imported

// Generated

const placeholderNews: NewsBlurbProps[] = [
    {
        title: "California Approves Brings Approval Voting To Anaheim"
        , body: "Voters passed an Approval Voting ballot measure in February for city council races with 72% in favor."
        , tag: NewsTag.News
        , link: '#'
        , color: 'purple'
    }
    , {
        title: 'Fargo 2018: Approval Voting in Action'
        , body: 'Fargo, North Dakota becomes the first city in the U.S. to use Approval Voting. How did they do it?'
        , tag: NewsTag.CaseStudy
        , link: '#'
        , color: 'orange'
    }
]

// create a component
const ApprovalNews = () => {
    const [news, setNews] = useState(placeholderNews);

    return (
        <div className='flex flex-col items-center justify-center py-28'>
            <h2 className='text-center'>
                Stay Plugged In
            </h2>
            <div className='flex flex-col mx-auto lg:grid lg:grid-cols-2 lg:border-b-2'>
                { news.map(news => <NewsBlurb key={news.title} {...news} />)}
            </div>
        </div>
    );
}

//make this component available to the app
export default ApprovalNews
