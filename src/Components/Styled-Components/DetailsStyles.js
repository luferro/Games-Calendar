import styled from 'styled-components';

const TitleWrapper = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    & i {
        color: #e9c46a;
        font-size: 35px;
        cursor: pointer;
    }
    & i:hover {
        color: white;
    }
`;

const OverView = styled.div`
    display: grid;
    grid-template-columns: 1fr minmax(120px, 1fr) 1fr; 
    grid-template-rows: auto; 
    grid-gap: 10px;
    width: 90%;
    margin: 2% auto;
    & div {
        padding: 1rem 2rem;
        text-align: justify;
        background: #28666e;
        & p {
            text-align: center;
        }
        & b {
            color: #e9c46a;
        }
        & a {
            text-decoration: none;
            color: #e9c46a;
        }
    }
    & img {
        display: flex;
        align-self: center;
        height: inherit !important;
        width: 100%;
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr; 
    }
`;

const Trailer = styled.div`
    width: 90%;
    margin: 2% auto;
    & div {
        width: 100%;
    }
    @media (max-width: 768px) {
        div {
            height: 200px !important;
        }
    }
`;

const Stores = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-template-rows: auto;
    grid-gap: 10px;
    width: 90%;
    margin: 2% auto;
`;

const Card = styled.div`
    padding: 1rem;
    background: #28666e;
    align-content: center;
    height: 200px;
    & img {
        width: 100%;
        height: 100%;
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(58deg) brightness(100%) contrast(100%);
    }
`;

export {
    TitleWrapper,
    OverView,
    Trailer,
    Stores,
    Card
}