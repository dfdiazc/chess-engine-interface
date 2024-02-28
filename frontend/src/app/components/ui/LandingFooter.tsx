import React from 'react'
import { Link } from 'react-router-dom'

const LandingFooter = () => {
  return (
    <footer className="w-full bg-yellow-400 px-8 py-5">
      <div className="flex flex-col md:grid md:grid-flo w-col md:grid-cols-12 md:gap-5">
        <div className="flex pt-10 md:items-end md:place-self-end md:col-end-13">
          <div className="font-roboto font-light flex flex-row justify-end">
            <Link to="/" className="text-white hover:underline">
              Terms
            </Link>
            <span className="text-white mx-3 select-none">|</span>
            <Link to="/" className="text-white hover:underline">
              Privacy
            </Link>
            <span className="text-white mx-3 select-none">|</span>
            <Link to="/" className="text-white hover:underline">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter