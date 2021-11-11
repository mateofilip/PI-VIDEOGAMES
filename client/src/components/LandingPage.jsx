import { Link } from 'react-router-dom';
import '../Sass/Styles/LandingPage.scss';

export default function LandingPage() {
  return (
    <div className="landingPage">
      <div className="landingContainer">
        <h1>
          Welcome, <span className="gamerLandingPage">gamer!</span>
        </h1>

        <Link to="/homepage">
          <button>▶ Press Start</button>
        </Link>
      </div>
    </div>
  );
}
