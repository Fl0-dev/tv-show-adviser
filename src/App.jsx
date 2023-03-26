import "./global.css";
import s from "./App.module.css";
import { TVShowApi } from "./api/tv-show";
import { useEffect, useState } from "react";
import { BACKDROP_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png";

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();

  async function fetchPopulars() {
    const populars = await TVShowApi.fetchPopulars();
    if (populars.length > 0) {
      setCurrentTVShow(populars[0]);
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

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
            <input type="text" style={{ width: "100%" }} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommentations}>Recommendations</div>
    </div>
  );
}