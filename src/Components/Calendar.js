import React, { useState, useEffect, Fragment } from 'react';
import { Wrapper, CalendarBlock, MonthsWrapper, MonthsBtn, Title, DisplayGame, DisplayTitle, DisplayIndicator, Ring, SpaceCalendar } from './Styled-Components/CalendarStyles';
import usePaginate from './Utils/usePaginate';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import { Spinner } from './Styled-Components/LoadingStyles';

const date = new Date();
const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const Years = Array(6).fill().map((year, i) => date.getFullYear() + i);

function Calendar() {    
    const [loading, setLoading] = useState(true); 
    const [page] = useState(1); 
    const [chosenMonth, setChosenMonth] = useState(Months[date.getMonth()]);
    const [chosenYear, setChosenYear] = useState(date.getFullYear());
    const [games, setGames] = useState([]);

    const formatMonth = Months.indexOf(chosenMonth) + 1 < 10 ? "0"+(Months.indexOf(chosenMonth) + 1) : Months.indexOf(chosenMonth) + 1;
    const lastDay = new Date(Years.indexOf(chosenYear), Months.indexOf(chosenMonth) + 1, 0).getDate();

    // eslint-disable-next-line
    let Paginate, Pag, currentPage, SlideShowTimer;
    const MonthSelection = { Paginate, Pag, currentPage } = usePaginate(1, Months, Months.indexOf(chosenMonth));
    const YearSelection = { Paginate, Pag, currentPage } = usePaginate(1, Years);

    const DaysInMonth = (month) => {
        return new Date(chosenYear, Months.indexOf(month) + 1, 0).getDate();
    }

    const SlideShow = (index, slideIndex) => {         
        const slides = document.getElementsByClassName(`day-${index}`);  
        if(slides.length === 0) return; //Caso um determinado dia do mês não tenha nenhum jogo, return

        for(let i = 0; i < slides.length; i++) slides[i].style.display = "none";    //Percorre todos os jogos de um determinado dia e altera o seu display para none

        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    //Se o index do slideIndex for superior ao length dos jogos a serem lançados num determinado dia, definimos o slideIndex para o seu valor base, 1 
        slides[slideIndex-1].style.display = "block";   //Mostra o o jogo associado ao slideIndex-1 alterando o seu display para block

        SlideShowTimer = setTimeout(() => {
            SlideShow(index, slideIndex)    //A cada 4s voltamos a chamar a função de forma a realizar as trocas de imagens
        }, 4000);
    }

    const CreateDots = (index, gameID) => {
        const slides = document.getElementsByClassName(`day-${index}`);  
        const dots =  document.getElementsByClassName(`dots-${index}`);

        if(slides.length === 0 || dots.length === 1) return;    //Se não existirem jogos ou se for apenas um jogo, damos return

        for(let i = 0; i < slides.length; i++) {    //Percorre a quantidade de jogos num determinado dia
            let spanTag = document.createElement("span");   //Cria tags span que vão representar os dots do slideshow
            // eslint-disable-next-line
            spanTag.onclick = function () {     //Associa um evento onClick que chama a função slideshow, atualizando o seu index
                SlideShow(index, i);
                clearTimeout(SlideShowTimer);
            }
            document.querySelector(`#game-${gameID} .dots-${index}`).appendChild(spanTag);
        }
    }

    const updateMonth = (month) => {
        setChosenMonth(month);
        setLoading(true);
    }

    const updateYear = (year) => {
        setChosenYear(year);
        setLoading(true);
    }

    async function getGames(pageNumber) {
        const res = await fetch(`https://api.rawg.io/api/games?dates=${chosenYear}-${formatMonth}-01,${chosenYear}-${formatMonth}-${lastDay}&page=${pageNumber}&ordering=-added&page_size=25`);
        const GamesArray = await res.json();

        return GamesArray.results;
    }

    async function getAllGames(pageNumber) {
        const firstHalf = await getGames(pageNumber);
        const secondHalf = await getGames(pageNumber + 1);

        secondHalf ?
        setGames(firstHalf.concat(secondHalf)) //concatenar resultados do pedido para a primeira página e segunda página sendo estes os que têm os jogos mais relevantes
        :
        setGames(firstHalf) //concatenar resultados do pedido para a primeira página e segunda página sendo estes os que têm os jogos mais relevantes

        setLoading(false);
    }

    useEffect(() => {
        const getGamesTimer = setTimeout(() => {
            getAllGames(page);
        }, 1000);
            
        return () => {
            clearTimeout(getGamesTimer);
            clearTimeout(SlideShowTimer);
        }

        // eslint-disable-next-line
    }, [chosenMonth, chosenYear])

    return (
        <Fragment>
            {console.log(games)}
            <Title secondary>{chosenMonth}, {chosenYear}</Title>
            <MonthsWrapper>
                <Pagination
                    postsPerPage={1} 
                    totalPosts={Months.length} 
                    paginate={MonthSelection.Paginate} 
                    currentPage={MonthSelection.currentPage}
                    content={
                        <Fragment>
                            {MonthSelection.Pag.map((month, i) => (
                                <MonthsBtn key={i}>{month === chosenMonth ? month : updateMonth(month)}</MonthsBtn>
                            ))}
                        </Fragment>
                    }
                />
                <Pagination
                    postsPerPage={1} 
                    totalPosts={Years.length} 
                    paginate={YearSelection.Paginate} 
                    currentPage={YearSelection.currentPage}
                    content={
                        <Fragment>
                            {YearSelection.Pag.map((year, i) => (
                                <MonthsBtn key={i}>{year === chosenYear ? year : updateYear(year)}</MonthsBtn>
                            ))}
                        </Fragment>
                    }
                />
                <Ring left_one />
                <Ring left_two />
                <Ring right_one />
                <Ring right_two />
            </MonthsWrapper>
            <SpaceCalendar>
                <Title powered>Powered by <a target="_blank" rel="noopener noreferrer" href="https://rawg.io/">Rawg.io</a></Title>
            </SpaceCalendar>
            <Wrapper>
                {loading ? 
                    <div style={{width: "90vw", margin: "0 auto"}}><Spinner/></div>
                    :
                    Array.from({length: DaysInMonth(chosenMonth)}, (block, index) => 
                        <CalendarBlock key={index}>
                            <span className="day">{index + 1}</span>
                            {games.map(game => (
                                index + 1 === Number(game.released.slice(8,10)) && 
                                <DisplayGame 
                                    key={game.id} 
                                    className={`day-${index+1}`} 
                                    id={`game-${game.id}`} 
                                    onLoad={() => { SlideShow(index+1, 0); CreateDots(index+1, game.id) }}
                                >
                                    <img src={game.background_image ? game.background_image : "/imagens/placeholder.png"} alt="Game's Background"/>
                                    <DisplayTitle>
                                        <Link to={`/${game.id}`}>{game.name}</Link>
                                    </DisplayTitle>
                                    <DisplayIndicator className={`dots-${index+1}`} />
                                </DisplayGame>
                            ))}
                        </CalendarBlock>) 
                }
            </Wrapper>
        </Fragment> 
    );
}

export default Calendar;