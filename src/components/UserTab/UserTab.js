import React from 'react';

export function UserTab(props){
    const {
        imgSource,
        displayName,
        channelURL,
        description,
        className = ''
    } = props;
    return(
        <div className={`user-tab ${className}`}>
            <div className="img-status">
                <img
                    src={imgSource}
                    alt={displayName}
                    className="profile-img"
                />
                <div className="status-indicator"></div>
            </div>
            <a
                href={channelURL}
                target="_blank"
                className="display-name"
            >
                {displayName}
            </a>
            <p className="description">{description}</p>
        </div>
    );
}