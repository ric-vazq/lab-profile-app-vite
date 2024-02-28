import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import background from '../../../images/oval-bg.png';
import { useNavigate } from 'react-router-dom';
import authService from '../service/auth.service';

export default function UserPage() {
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const { logOutUser, user, setUser, setIsLoading, isLoading } =
    useContext(AuthContext);

  useEffect(() => {
    setUser(null);
    setIsLoading(true);
    authService
      .verifyToken()
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { image: image };
    authService
      .editUser(requestBody)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileUpload = async (e) => {
    const uploadData = new FormData();

    uploadData.append('image', e.target.files[0]);

    authService
      .uploadPhoto(uploadData)
      .then((response) => {
        setImage(response.data.fileUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    logOutUser();
    navigate('/');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
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
          className="w-7/12 h-4/5 relative flex"
        >
          <div className="w-1/2 h-full flex flex-col mx-8 my-8">
            <h1 className="text-6xl mb-10" style={{ color: '#638165' }}>
              Profile
            </h1>
            <div className="mb-3">
              <label htmlFor="username" className="text-slate-400">
                Username
              </label>
              <h3 id="username" className="text-2xl font-bold">
                {user.username}
              </h3>
            </div>
            <div className="mb-3">
              <label htmlFor="campus" className="text-slate-400">
                Campus
              </label>
              <h3 id="campus" className="text-2xl font-bold">
                {user.campus}
              </h3>
            </div>
            <div className="mb-3">
              <label htmlFor="course" className="text-slate-400">
                Course
              </label>
              <h3 id="course" className="text-2xl font-bold">
                {user.course}
              </h3>
            </div>
            <button style={{ color: '#D0021B' }} onClick={logOut}>
              Log Out
            </button>
          </div>
          <div className="w-1/2 mx-8 my-8 flex flex-col justify-center items-center">
            <img
              src={user.image}
              alt="user-image"
              className="rounded-full h-64 w-64"
            />
            <form onSubmit={handleFormSubmit}>
              <input
                onChange={(e) => handleFileUpload(e)}
                type="file"
                placeholder={user.img}
              />
              <button type="submit"> Change Photo</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
