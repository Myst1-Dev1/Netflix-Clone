import React, { useEffect, useState } from "react";
import './App.css';
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie";
import Header from "./components/Header/Header";
import MovieRow from "./components/MovieRow/MovieRow";
import Tmdb from "./Tmdb";

// eslint-disable-next-line
export default () => {

  const [movieList , setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  },[]);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true)
      } else{
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  },[])

  return (
    <div className="page">
      <Header black={blackHeader}/>
    {featuredData && 
      <FeaturedMovie item={featuredData} />
    }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span>❤️</span>
        por <a target="_blank" rel="noreferrer" href="https://myst1-dev.netlify.app/">Myst1 Dev</a> <br/>
        Direitos de imagem para NetFlix <br/>
        Dados pegos do site Themobiedb.org
      </footer>


      {movieList.length <= 0 && 
        <div className="loading">
          <img src="https://www.metageek.com/img/buffering-800px.gif" alt="carregando"/>
        </div>
      }
    </div>
  )
}
