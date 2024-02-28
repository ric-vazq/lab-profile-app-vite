import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../../../images/oval-bg.png';
import authService from '../service/auth.service';

export default function SignUpPage() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const campusRef = useRef();
  const courseRef = useRef();

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      course: courseRef.current.value,
      campus: campusRef.current.value,
    };
    // console.log(body)
    authService.signUp(body)
    .then(response => {
      navigate('/auth/login')
    })
    .catch(error => {
      const errorDescription = error.response.data.message; 
      console.log(errorDescription);
    })
  };
  return (
    <div
      style={{
        background:
          'linear-gradient(90deg, rgba(193,223,196,1) 0%, rgba(222,236,208,1) 100%)',
      }}
      className="flex items-center justify-center h-screen"
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
            Sign Up
          </h1>

          <form onSubmit={onSubmit} className=''>
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
            <div>
              <label
                htmlFor="campus"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Campus
              </label>
              <select
                ref={campusRef}
                className="block w-full mb-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="Berlin">Berlin</option>
                <option value="Madrid">Madrid</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Miami">Miami</option>
                <option value="Paris">Paris</option>
                <option value="Amsterdam">Amsterdam</option>
                <option value="México">México</option>
                <option value="Sao Paulo">Sao Paulo</option>
                <option value="Lisbon">Lisbon</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div className='mb-10'>
              <label
                htmlFor="course"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Course
              </label>
              <select
                name="course"
                id="course"
                ref={courseRef}
                className="block w-full mb-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="Web Dev">Web Dev</option>
                <option value="UX/UI">UX/UI</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Cyber Security">Cyber Security</option>
              </select>
            </div>
            <button
              type="submit"
              style={{ backgroundColor: '#C1DFC4' }}
              className="font-medium rounded-lg text-sm px-9 py-3"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
