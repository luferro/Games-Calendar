import React from 'react'
import { MonthsPagination } from './Styled-Components/CalendarStyles';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage, content }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <MonthsPagination>
            { currentPage - 1 !== 0 && totalPosts > 0 ? <i className="fas fa-angle-left" onClick={() => paginate(currentPage - 1)}></i> : <i className="fas fa-angle-left" style={{visibility: "hidden"}}></i> }
            { content }
            { currentPage + 1 !== pageNumbers.length + 1 && totalPosts > 0 ? <i className="fas fa-angle-right" onClick={() => paginate(currentPage + 1)}></i> : <i className="fas fa-angle-right" style={{visibility: "hidden"}}></i> }
        </MonthsPagination>
    )
}

export default Pagination;