import background from '../../../images/oval-bg.png';
import { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import authService from '../service/auth.service';

export default function LoginPage() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    //console.log(body);

    authService
      .logIn(body)
      .then((response) => {
        console.log('JWT token', response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  return (
    <div
      style={{
        background:
          'linear-gradient(90deg, rgba(193,223,196,1) 0%, rgba(222,236,208,1) 100%)',
      }}
      className="flex items-center justify-center h-screen w-screen"
    >
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        className="w-7/12 h-4/5 relative"
      >
        <div className="w-1/2 h-full flex flex-col mx-8 my-8">
          <h1 className="text-6xl mb-10" style={{ color: '#638165' }}>
            Log In
          </h1>

          <form onSubmit={onSubmit} className="">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                ref={usernameRef}
                required
                className="block w-full mb-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                ref={passwordRef}
                required
                className="block w-full mb-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <button
              type="submit"
              style={{ backgroundColor: '#C1DFC4' }}
              className="mt-5 font-medium rounded-lg text-sm px-9 py-3"
            >
              Log In
            </button>
          </form>
          {errorMessage && (
            <p className="error-message text-red-600 mt-10">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
