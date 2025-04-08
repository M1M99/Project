import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as fasBookmark, faBookmark as farBookmark } from '@fortawesome/free-solid-svg-icons';

const BookmarkToggle = () => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    return (
        <div>
            <button onClick={toggleBookmark} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <FontAwesomeIcon
                    icon={isBookmarked ? fasBookmark : farBookmark} 
                    style={{ fontSize: '24px', color: isBookmarked ? '#ff6347' : '#333' }} 
                />
            </button>
            <p style={{ fontSize: '16px', color: isBookmarked ? '#ff6347' : '#333' }}>
                {/*{isBookmarked ? ''}*/}
            </p>
        </div>
    );
};

export default BookmarkToggle;
