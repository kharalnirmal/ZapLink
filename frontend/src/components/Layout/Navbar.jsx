import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <nav className=' text-white shadow-lg'>
      <div className='container mx-auto px-4 '>
        <div className='flex justify-between item-center h-16'>

          {/* Logo Section */}
          <Link to="/" className=' flex flex-center '  ><img className='h-12 ' src="/ZapLINK-T.png" alt="" /></Link>


          {/* Navigation Links */}
          <div className='flex  item-center space-x-4 '>
            {isAuthenticated ? (
              <>
              <div className='space-x-4 flex  items-center  font-semibold'>
                <Link to="/" className='hover:text-blue-200'>Dashboard</Link>
                
                <span className='text-white mx-4 '>
                  Hello, {user?.username}!
                </span>
                <button onClick={handleLogout} className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded'>Logout</button>
                  </div>
              </>
            ) : (
              <>
                <div className='space-x-4 flex  items-center  font-semibold'>
                  <Link to="/login" className="hover:text-blue-200 ">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-teal-700 hover:bg-teal-800 px-3 py-1 rounded"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar