import React, { useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons'; // Import Ant Design icons for the bookmark

const Salam = () => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleClick = () => {
        setIsBookmarked(!isBookmarked);
    };

    return (
        <div className="bookmark-container">
            <button
                onClick={handleClick}
                className={`bookmark-icon ${isBookmarked ? 'bookmarked' : ''}`}
            >
                {isBookmarked ? (
                    <HeartFilled className="icon" />
                ) : (
                    <HeartOutlined className="icon" />
                )}
            </button>
        </div>
    );
};

export default Salam;
