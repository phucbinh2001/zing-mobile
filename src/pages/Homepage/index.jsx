import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import MusicApi from "../../api/MusicApi";
import Playlist from "../../components/Playlist";
import SliderSection from "../../components/Slider";
import "./style.scss";

// import defaultBg from "./default-bg.png";

function Homepage() {
  const [songList, setSongList] = useState([]);
  const [banners, setBanners] = useState([]);

  //Use Redux
  const songListRedux = useSelector((state) => state.songList);

  useEffect(() => {
    if (songListRedux) setSongList(songListRedux);
  }, [songListRedux]);

  //Lấy dữ liệu trang homepage
  useEffect(() => {
    const fetchSong = async () => {
      console.log("fetch data");
      const homepageData = await MusicApi.getHomePage();
      setBanners(homepageData?.items[0]?.items);
      const homepageJsonData = JSON.stringify(homepageData?.items[0]?.items);
      sessionStorage.setItem("homepageData", homepageJsonData);
    };

    if (sessionStorage.getItem("homepageData")) {
      console.log("use sessionStorage");
      const homepageData = JSON.parse(sessionStorage.getItem("homepageData"));
      setBanners(homepageData);
    } else {
      fetchSong();
    }
  }, []);

  const playlist1 = songList.slice(0, 9);
  const playlist2 = songList.slice(10, 19);
  const playlist3 = songList.slice(20, 29);
  const playlist4 = songList.slice(30, 39);
  const playlist5 = songList.slice(40, 49);
  const playlist6 = songList.slice(50, 59);
  const playlist7 = songList.slice(60, 69);
  const playlist8 = songList.slice(70, 79);

  // const background = songList[0]?.thumbnail;

  return (
    <Container
      className="p-0 homepage"
      // style={{
      //   backgroundImage: `url(${background})`,
      // }}
    >
      {banners.length > 0 ? (
        <SliderSection banners={banners} />
      ) : (
        <div style={{ padding: "10px" }}>
          <Skeleton className="bannerSkeleton" borderRadius={10} />
        </div>
      )}

      <Playlist songList={playlist1} title="Gần đây" />
      <Playlist songList={playlist2} title="Có thể bạn muốn nghe" />
      <Playlist songList={playlist3} title="Lựa chọn hôm nay" />
      <Playlist songList={playlist4} title="Nhạc mới mỗi ngày" />
      <Playlist songList={playlist5} title="Mới phát hành" />
      <Playlist songList={playlist6} title="Gợi ý cho bạn" />
      <Playlist songList={playlist7} />
      <Playlist songList={playlist8} />
    </Container>
  );
}

export default Homepage;
