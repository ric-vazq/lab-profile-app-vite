import { Link } from 'react-router-dom';
import background from '../../../images/oval-bg.png';

export default function HomePage() {
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
        <div className="w-1/2 h-full flex flex-col mx-8 my-8 justify-around">
          <p className="text-6xl" style={{ color: '#638165' }}>
            IronProfile
          </p>

          <p className="text-3xl my-5 text-gray-500">
            A place for Ironhackers to sign up and view each others profiles!{' '}
          </p>
          <div className="flex flex-col h-1/2 items-center">
            <Link
              to={'/auth/login'}
              style={{ backgroundColor: '#C1DFC4' }}
              className="font-medium rounded-lg text-sm px-9 py-3 mb-5"
            >
              Log In
            </Link>

            <Link
              to={'/auth/signup'}
              style={{ backgroundColor: '#C1DFC4' }}
              className="font-medium rounded-lg text-sm px-9 py-3"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
