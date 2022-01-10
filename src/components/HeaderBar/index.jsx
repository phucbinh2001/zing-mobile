import React, { useState } from "react";
import { Container } from "react-bootstrap";
import MusicApi from "../../api/MusicApi";
import Avatar from "../Avatar";
import Searchbar from "../SearchBar";
import SearchResult from "./components/SearchResult";
import "./style.scss";

function HeaderBar() {
  const [searchSong, setSearchSong] = useState([]);

  const HandleSearchSong = (keySearch) => {
    if (keySearch !== "") {
      const fetchSearchSong = async () => {
        const songData = await MusicApi.searchSong(keySearch);
        setSearchSong(songData.songs);
        // songData[0].song.map((song) => console.log(song.name));
      };

      fetchSearchSong();
    } else {
      setSearchSong([]);
    }
  };

  return (
    <Container
      className="position-fixed topbar"
      style={{
        zIndex: 99,
        backdropFilter: 1,
      }}
      // onBlur={() => setOpen(false)}
    >
      <div className="d-flex">
        <Avatar />
        <Searchbar searchSongFn={HandleSearchSong} />
      </div>
      <SearchResult result={searchSong} />
    </Container>
  );
}

export default HeaderBar;
