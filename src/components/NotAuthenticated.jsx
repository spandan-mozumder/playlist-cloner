import React from 'react'
import { Link } from 'react-router-dom'

const NotAuthenticated = () => {
  return (
    <div className="w-[100%] h-[100vh] bg-[#efeee8] flex flex-col justify-center items-center">
          <h1 className="text-5xl p-[25px] bg-gradient-to-r from-[#959490] to-gray-700 bg-clip-text text-transparent">
            Oops!!
          </h1>

          <h1 className="text-5xl p-[25px] bg-gradient-to-r from-[#959490] to-gray-700 bg-clip-text text-transparent">
            You need to be authenticated
          </h1>

          <h1 className="text-5xl p-[25px] bg-gradient-to-r from-[#959490] to-gray-700 bg-clip-text text-transparent">
            to proceed forward
          </h1>

          <div className='mt-[20px]'>
              <Link to="/signup">
                <button className="px-[50px] py-[8px] text-lg mx-[15px] rounded-full border-2 border-gray-600 bg-gray-600 text-[#efeee8] transition-all hover:bg-transparent hover:text-[#5b5b5b] shadow-md shadow-[#b1b1b1]">
                  Sign Up
                </button>
              </Link>

              <Link to="/signin">
                <button className="px-[50px] py-[8px] text-lg mx-[15px] rounded-full border-2 border-gray-600 text-gray-600 transition-all hover:bg-gray-600 hover:text-[#efeee8] shadow-md shadow-[#b1b1b1]">
                  Sign In
                </button>
              </Link>
            </div>
      </div>
  )
}

export default NotAuthenticated
