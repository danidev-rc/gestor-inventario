import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div>
      <h1>Home PAGE</h1>
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
