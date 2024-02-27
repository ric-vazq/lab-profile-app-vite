import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

export default function Navbar() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <nav>
      <Link to={'/'}>
        <button>Home</button>
      </Link>

      {!isLoggedIn && (
        <>
          <Link to={'auth/signup'}>
            <button>Sign Up</button>
          </Link>
          <Link to={'auth/login'}>
            <button>Log In</button>
          </Link>
        </>
      )}
    </nav>
  );
}
