/* ****** CAA Imports ****** */
// UI
import Link from '../components/common/links';

// Logic

/* ****** Other Imports ****** */
// UI

// Logic
import React, { PropsWithChildren } from 'react'
import update from 'immutability-helper';
import classnames from 'classnames';

/* ****** Assets ****** */

/* ****** Constants ****** */
// Imported

// Generated
export enum NewsTag {
    News
    , CaseStudy
}
const newsTagMap = {
    [NewsTag.News]: 'NEWS'
    , [NewsTag.CaseStudy]: 'CASE STUDY'
}
export type NewsColors = 'purple'|'orange';

export type NewsBlurbProps = {
    title: string;
    body: string;
    link: string;
    tag: NewsTag;
    color: NewsColors;
};

// create a component
const NewsBlurb = ({title, body, link, tag, color}: PropsWithChildren<NewsBlurbProps>) => {
    // lg:even:border-l-2 matches the grid-cols-2 in news.tsx
    // TODO: Is there a cleaner way to get 2-cols of equally sized blurbs with
    // borders between them that works on all screen sizes?
    return (
        <div className='caa-news-blurb p-12 lg:my-12 lg:even:border-l-2 mx-2'>
            <div
                className={classnames(
                    'border-t-[6px]'
                    , {
                        'border-purple': color === 'purple'
                        , 'border-orange': color === 'orange'
                    }
                )}
            >
                <br/>
                <h3>
                    {title}
                </h3>
                <br/>
                <p className='text-base'>
                    {body}
                </p>
                <br/>
                <div className='flex flex-col lg:flex-row lg:grid-cols-2 lg:divide-x-2'>
                    <div>
                        <span
                            className={classnames(
                                'mr-4 rounded-2xl border-[3px] px-2 text-center text-bsm font-bold'
                                , {
                                    'border-purple text-purple': color === 'purple'
                                    , 'border-orange text-orange': color === 'orange'
                                }
                            )}
                        >
                            { newsTagMap[tag] }
                        </span>
                    </div>
                    <div className='mt-3 lg:mt-0 lg:pl-8'>
                        <Link
                            to={link}
                            color='black'
                            className='underline'
                        >
                            LEARN MORE HERE
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

//make this component available to the app
export default NewsBlurb
