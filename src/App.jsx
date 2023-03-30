import "./global.css";
import s from "./App.module.css";
import { TVShowApi } from "./api/tv-show";
import { useEffect, useState } from "react";
import { BACKDROP_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png";
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendedTVShows, setRecommendedTVShows] = useState([]);

  async function fetchPopulars() {
    const populars = await TVShowApi.fetchPopulars();
    if (populars.length > 0) {
      setCurrentTVShow(populars[0]);
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  async function fetchRecommendations(tvShowId) {
    const recommendations = await TVShowApi.fetchRecommendations(tvShowId);
    if (recommendations.length > 0) {
      setRecommendedTVShows(recommendations.slice(0, 10));
    }
  }

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  async function searchTvShowByName(tvShowName) {
    const searchResponse = await TVShowApi.fetchSearchByTitle(tvShowName);
    console.log("searchResponse", searchResponse)
      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
      }
    };

  return (
    <div className={s.main_container}
      style={{
        background: currentTVShow ?
          `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_URL}${currentTVShow.backdrop_path}") no-repeat center center/cover` :
          "black"
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo image={logo} title="TV Show" subtitle="Search Engine" />
          </div>
          <div className="col-sm-12 col-md-4">
            <SearchBar onSubmit={searchTvShowByName} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_shows}>
        {recommendedTVShows && recommendedTVShows.length > 0 && (
          <TVShowList onClickItem={setCurrentTVShow} tvShowList={recommendedTVShows} />
        )}
      </div>
    </div>
  );
}