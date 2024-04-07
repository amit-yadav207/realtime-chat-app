
// import './App.css';
// import { Navigate, Route, Routes } from "react-router-dom"
// import Login from "./pages/login/Login"
// import SignUp from './pages/signup/SignUp';
// import Home from './pages/home/Home';
// import { useAuthContext } from './context/authContext';

// function App() {
//   const { authUser } = useAuthContext()

//   // /**********//UPDATED HERE inseated of authUSer using token
//   return (
//     <div className="p-4 h-screen  flex items-center justify-center">
//       <Routes>
//         <Route path="/" element={authUser ? <Home />:<Navigate to={"/login"} />  } />
//         <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login />} />
//         <Route path="/signup" element={authUser ? <Navigate to='/' /> : <SignUp />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;





import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext";
import ToggleButton from "./pages/temp/ToggleButton";

function App() {
	const { authUser } = useAuthContext();

	const loggedIn = Object.keys(authUser).length !== 0
	const currentYear = new Date().getFullYear();
	return (
		<div className=' py-10 h-screen flex flex-col gap-2 items-center justify-center '>
			<Routes>
				<Route path='/' element={loggedIn ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={loggedIn ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={loggedIn ? <Navigate to='/' /> : <SignUp />} />
				<Route path='/toggle' element={<ToggleButton />} />

			</Routes>
			<Toaster />
			{/*<span className="text-white font-semibold text-sm">© {currentYear} <span role="img" aria-label="heart">❤️</span> Amit Yadav</span>*/}
			<a
				href="https://github.com/amit-yadav207/realtime-chat-app"
				target="_blank"
				rel="noopener noreferrer"
				className="text-white font-semibold text-sm"
			>
				© {currentYear} <span role="img" aria-label="heart">❤️</span> Amit Yadav
			</a>


		</div>
	);
}

export default App;
