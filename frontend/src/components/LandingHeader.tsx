import React from 'react'
import { FaChess } from 'react-icons/fa';

const LandingHeader = () => {
  return (
    <div className='flex items-center p-32 w-full bg-black'>
      <div>
        <FaChess />
      </div>
    </div>
  )
}

export default LandingHeader