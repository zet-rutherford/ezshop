import Header from "../components/header/Header";
import Blackpink from '../assets/videos/Blackpink in your area.mp4'

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="main container mt-3">
        <video className="rounded " src={Blackpink} autoPlay width="100%" controls/>
      </div>
    </>
  );
};

export default HomePage;
