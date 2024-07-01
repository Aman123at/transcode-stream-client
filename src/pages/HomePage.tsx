import { FC, useEffect } from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContextProvider';

const HomePage:FC = () => {
  const {user} = useAuthContext()
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);
  return (
    <div className=" bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col justify-center items-center">
        <Header isUserLoggedIn={false} />
        <Banner />
    </div>
  )
}

export default HomePage