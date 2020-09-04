import React, { useState, useEffect, Fragment } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useParams, useHistory } from 'react-router-dom';
import { Title } from './Styled-Components/CalendarStyles';
import { OverView, Trailer, Stores, Card, TitleWrapper } from './Styled-Components/DetailsStyles';
import ReadMoreReadLess from './Utils/useReadMoreReadLess';
import { Spinner } from './Styled-Components/LoadingStyles';

function GameInfo() {   
    const [loading, setLoading] = useState(true); 
    const [info, setInfo] = useState([]);

    const { id } = useParams();
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    async function getDetails() {
        const res = await fetch(`https://api.rawg.io/api/games/${id}`);
        const GamesArray = await res.json();
        setInfo(GamesArray);
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
        getDetails();

        // eslint-disable-next-line
    }, [])

    if(loading) return <Spinner />;

    return (
        <Fragment>
            <TitleWrapper>
                <i onClick={goBack} class="fas fa-arrow-left"></i>
                <Title>{info.name}</Title>
            </TitleWrapper>
            <Title secondary>Overview</Title>
            <OverView>
                <div>
                    {info.released && (<p><b>Release Date</b><br/>{info.released}</p>)}
                    {info.metacritic && (<p><b>Metacritic Score</b><br/>{info.metacritic}</p>)}
                    {info.platforms && (<p><b>Platforms</b><br/>{info.platforms.map(platform => (<span key={platform.platform.id}>{platform.platform.name}<br/></span>))}</p>)}
                    {info.developers.length > 0 && (<p><b>Developers</b><br/>{info.developers.map(developer => (<span key={developer.id}>{developer.name}<br/></span>))}</p>)}
                    {info.publishers.length > 0 && (<p><b>Publishers</b><br/>{info.publishers.map(publisher => (<span key={publisher.id}>{publisher.name}<br/></span>))}</p>)}
                    {info.website && (<p><b><a target="_blank" rel="noopener noreferrer" href={info.website}>Website <i className="fas fa-external-link-alt"></i></a></b></p>)}
                    {info.reddit_url && (<p><b><a target="_blank" rel="noopener noreferrer" href={info.reddit_url}>Subreddit <i className="fas fa-external-link-alt"></i></a></b></p>)}
                    {info.metacritic_url && (<p><b><a target="_blank" rel="noopener noreferrer" href={info.metacritic_url}>Metacritic <i className="fas fa-external-link-alt"></i></a></b></p>)}
                </div>
                <img src={info.background_image ? info.background_image : "/imagens/placeholder.png"} alt="Game's Background" />
                <div><ReadMoreReadLess text={info.description_raw ? info.description_raw : "Not Available"} /></div>
            </OverView>
            {info.clip && 
                <Fragment>
                    <Title secondary>Trailer</Title>
                    <Trailer>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${info.clip.video}`} width="100%" height="700px" controls={true} muted={true}/>
                    </Trailer>  
                </Fragment>
            }
            {info.stores.length > 0 &&
                <Fragment>
                    <Title secondary>Where to buy? - Official Stores</Title>
                    <Stores>
                        {info.stores.map(store => (
                            <Card key={store.store.id}>
                                <a target="_blank" rel="noopener noreferrer" href={store.url}>
                                    {store.store.name === "Xbox Store" && <img src="/imagens/xbox.svg" alt="Xbox Logo"/>}
                                    {store.store.name === "PlayStation Store" && <img src="/imagens/playstation.svg" alt="PlayStation Logo"/>}
                                    {store.store.name === "Steam" && <img src="/imagens/steam.svg" alt="Steam Logo"/>}
                                    {store.store.name === "Epic Games" && <img src="/imagens/epic.svg" alt="Epic Logo"/>}
                                    {store.store.name === "Nintendo Store" && <img src="/imagens/switch.svg" alt="Switch Logo"/>}
                                    {store.store.name === "App Store" && <img src="/imagens/apple.svg" alt="Apple Logo"/>}
                                    {store.store.name === "GOG" && <img src="/imagens/gog.svg" alt="GOG Logo"/>}
                                    {store.store.name === "itch.io" && <img src="/imagens/itchio.svg" alt="itch.io Logo"/>}
                                </a>
                            </Card>
                        ))}
                    </Stores>
                </Fragment>
            }
        </Fragment>
    );
}

export default GameInfo;