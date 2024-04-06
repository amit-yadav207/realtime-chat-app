import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'


const SignUp = () => {

    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPass: "",
        gender: ""
    })

    const [loading, signup] = useSignup()

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(inputs)
        await signup(inputs)
        //call signup function retreived from useSignup hook
        // setInputs({
        //     fullName: "",
        //     username: "",
        //     password: "",
        //     confirmPass: "",
        //     gender: ""
        // })
    }
    return (
        <div className='flex flex-col items-center justify-center min-w-96 max-auto'>
            <div className='w-full p-6 rounded-lg shadow-sm bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Signup
                    <span className='text-green-500'> MyChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input type='text' placeholder='Amit Yadav' className='w-full input input-bordered h-10' value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            name="username"
                            autoComplete="username"
                            type='text' placeholder='amityadav123'
                            className='w-full input input-bordered h-10'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            name="password"
                            autoComplete="new-password"
                            type='password' placeholder='Enter password'
                            className='w-full input input-bordered h-10'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input
                            name="password"
                            autoComplete="new-password"
                            type='password' placeholder='Confirm password'
                            className='w-full input input-bordered h-10'
                            value={inputs.confirmPass}
                            onChange={(e) => setInputs({ ...inputs, confirmPass: e.target.value })}
                        />
                    </div>

                    {/*Gender checkbox goes here */}

                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
                    <Link to='/login' className='text-sm  text-green-200 hover:underline hover:text-green-300 mt-1 inline-block'> Already have an account?</Link>
                    <div>
                        <button type='submit' className='btn btn-block btn-sm mt-2' disabled={loading}>{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignUp




