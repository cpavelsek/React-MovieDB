import React from 'react'
import { useState } from 'react';

export default function MovieList(props) {
    const FavouriteComponent = props.favComponent;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

	const displayContent = (movie) => {
		//when clicked, display more infomration about the movie
		//grab clicked movie, display info in alert for now
		console.log(movie)
	};

	if(props){
	return (
        <>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3' id={movie.id}>
					<img className="moviePoster" src={'http://image.tmdb.org/t/p/w500'+movie.poster_path} alt='movie' onClick={displayContent(movie)}></img>
					<div
						onClick={() => props.handleFavClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
				</div>
                
			))
            }
		</>
    );}
}


/* <>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={src={'http://image.tmdb.org/t/p/w500'+ movie.poster_path}} alt='movie'></img>
					<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</>


        <div className='image-container d-flex justify-content-start m-3'>
        {props.movies.map((movie, index) => 
            <div className="image-container d-flex justify-content-start m-3" key={props.id}>
            <img className="movieImage" src={'http://image.tmdb.org/t/p/w500'+movie.poster_path} alt="movie"></img>
            <div onClick={() => props.handleFavClick(movie)} 
                className="overlay d-flex align-items-center justify-content">
            </div>
                <FavouriteComponent />
            </div>
            )
        }
    </div> */