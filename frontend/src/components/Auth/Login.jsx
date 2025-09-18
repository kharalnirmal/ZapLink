import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api';

const Login = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: ""
    });

    const {login} = useAuth();
    const navigate =useNavigate();

  const handleChange = (e)=>{
    //  console.log(e.target.name)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit =async  (e)=>{
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authApi.login(formData)
      const {user, token} = response.data;
      login(user, token);
      navigate("/dashboard");


    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
    finally {
      setLoading(false);
    }
    
  }



  return (
    <div  className='max-w-md mx-auto bg-white rounded-lg shadow-xl p-6'>
       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Login to Your Account
      </h2>

      {error && (
      <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-3xl mb-4'>
        {error}
        </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-800 font-semibold text-sm mb-2'>Email</label>
            <input type="email" name='email'
             placeholder='example@example.com' 
              className=' border-gray-300 text-gray-800 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 py-2 px-4 w-full'
              value={formData.email} //it is used to set the value of the input field to the email property of the formData state object.
              onChange={handleChange}//it is used to handle changes to the input field and update the formData state object accordingly.
              />
          </div>

          <div className='mb-6'>
            <label className='block text-gray-800 font-semibold text-sm mb-2'>Password</label>
            <input type="password" name='password'
             placeholder='Example@123' 
              className=' border-gray-300 text-gray-800 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 py-2 px-4 w-full'
              value={formData.password} //it is used to set the value of the input field to the email property of the formData state object.
              onChange={handleChange}//it is used to handle changes to the input field and update the formData state object accordingly.
              />
          </div>

          <button type='submit'
          disabled={loading}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50  transition duration-300'>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Register here
          </Link>
        </p>
      </div>
    </div>

  )
}

export default Login