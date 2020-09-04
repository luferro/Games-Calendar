import styled, { css } from 'styled-components';

const Title = styled.h1`
    width: 100%;
    text-align: center;
    color: white;
    font-size: 30px;
    margin: 3% auto;
    ${props => props.secondary && css`
        font-size: 25px;
        color: #e9c46a;
    `}
    ${props => props.powered && css`
        font-size: 15px;
        margin: 0 auto !important;
    `}
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    width: 90%;
    margin: 0 auto;
`;

const MonthsWrapper = styled.div`
    width: 90%;
    margin: 0 auto;
    background: linear-gradient( rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25) ), #e9c46a;
    border-radius: 10px 10px 0 0;
`;

const Ring = styled.div`
    position: absolute;
    background:white;
    border-radius: 25px;
    width: 25px;
    height: 50px;
    z-index:99;
    ${props => props.left_one && css`
        left: 8rem;
        margin-top: -2rem;
        @media (max-width: 768px) {
            display: none;
        }
    `}
    ${props => props.left_two && css`
        left: 10rem;
        margin-top: -2rem;
        @media (max-width: 768px) {
            left: 2rem;
        }
    `}
    ${props => props.right_one && css`
        right: 8rem;
        margin-top: -2rem;
        @media (max-width: 768px) {
            display: none;
        }
    `}
    ${props => props.right_two && css`
        right: 10rem;
        margin-top: -2rem;
        @media (max-width: 768px) {
            right: 2rem;
        }
    `}
`;

const SpaceCalendar = styled.div`
    width: 90%;
    padding: 0.5rem 0;
    margin: 0 auto;
    background: #28666e;
    & a {
        text-decoration: none;
        color: #e9c46a;
    }
`;

const MonthsPagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    margin: 0 auto;
    padding: 0.3rem 0;
    & i {
        font-size: 30px;
        color: white;
        padding: 2px 10px;
    }
    @media (max-width: 768px) {
        width: 60%;
    }
`;

const MonthsBtn = styled.div`
    width: 50%;
    text-align: center;
    background: transparent;
    color: white;
    padding: 1rem;
    font-weight: bold;
    font-size: 20px;
`;

const CalendarBlock = styled.div`
    height: 200px;
    background: #28666e;
    border: 1px solid #264653;    
    padding: 0.2rem;
    font-size: 15px;
    overflow: hidden;
    position: relative;
    & .day {
        color: #e9c46a;
        position:absolute;
        z-index: 1000;
    }
    &:hover {
        background: rgba(0,0,0,0.2);
    }
`;

const DisplayGame = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    & img {
        width: 100%;
        height: 70%;   
        position: absolute;
        bottom: 0;
    }
    & a {
        width: 80%;
        margin: 0 auto;
        position: absolute;
        text-align: center;
        text-decoration: none;
        color: white;
    }
    & a:hover {
        color: #e9c46a;
    }
    & span {
        margin: 2px;
        height: 15px;
        width: 15px;
        background: white;
        border-radius: 50%;
        border: 2px solid #000;
    }
    & span:hover {
        background: #e9c46a;
    }
`;

const DisplayTitle = styled.div`
    width: inherit;
    height: 30% !important; 
    display: flex;
    position: relative;
    text-align: center;
    background: rgba(0,0,0,0.7);
    justify-content: center;
    align-items: center;
`;

const DisplayIndicator = styled.div`
    width: inherit;
    height: 10%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    

`;

export {
    Title,
    Wrapper,
    MonthsWrapper,
    Ring,
    SpaceCalendar,
    MonthsPagination,
    MonthsBtn,
    CalendarBlock,
    DisplayGame,
    DisplayTitle,
    DisplayIndicator
}