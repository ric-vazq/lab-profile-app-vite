import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div
      id="error-page"
      style={{
        background:
          'linear-gradient(90deg, rgba(193,223,196,1) 0%, rgba(222,236,208,1) 100%)',
      }}
      className="flex items-center justify-center h-screen w-screen"
    >
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <Link to="/">Home</Link>
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/signup">Sign Up</Link>
    </div>
  );
}
