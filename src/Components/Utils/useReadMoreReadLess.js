import React, { useState, Fragment } from 'react';

function ReadMoreReadLess({text}) {
    const [isTruncated, setIsTruncated] = useState(false);

    const handleReadMore = () => {
        setIsTruncated(!isTruncated);
    }
    
    return (
        <Fragment>
            {   isTruncated || text.length < 500 ?   
                text
                :
                `${text.slice(0, 500)}...`
            }
            {   (isTruncated && text.length > 500) && <p style={{cursor: "pointer", color: "#e9c46a"}} onClick={handleReadMore}>Show less</p>    } 
            {   (!isTruncated && text.length > 500) && <p style={{cursor: "pointer", color: "#e9c46a"}} onClick={handleReadMore}>Show more</p>   }
        </Fragment>                    
    );
}

export default ReadMoreReadLess;