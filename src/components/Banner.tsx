import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Banner:FC = () => {
  const navigate = useNavigate()
  return (
    <section className="relative bg-cover bg-center h-screen w-full bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 py-12 flex flex-col justify-center items-center h-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center z-10">Effortless Video Transcoding</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 text-center z-10">Convert your videos to any format in just a few clicks</p>
            <p 
            onClick={()=>navigate("/auth")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded z-10 cursor-pointer">
                Get Started
            </p>
        </div>
    </section>
  )
}

export default Banner