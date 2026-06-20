import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import classnames from "classnames";
import React, { type PropsWithChildren } from "react";

type VideoProps = {
	embedId: string;
	title: string;
	className?: string;
};

// create a component
const Video = ({
	embedId,
	title,
	className,
}: PropsWithChildren<VideoProps>) => {
	return (
		<div
			className={classnames("video-responsive", {
				[className || ""]: className != null,
			})}
		>
			<LiteYouTubeEmbed id={`${embedId}`} title={title} />
		</div>
	);
};

//make this component available to the app
export default Video;
