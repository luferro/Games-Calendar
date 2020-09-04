import { useState } from "react";

export default function usePaginate(postsPerPage, list, month) {
    const [currentPage, setCurrentPage] = useState(month ? month + 1 : 1);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const Pag = list.slice(indexOfFirstPost, indexOfLastPost);
    const Paginate = pageNumber => setCurrentPage(pageNumber);

    return { Paginate, Pag, currentPage }
}