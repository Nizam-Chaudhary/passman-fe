import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import HomePage from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import SignUp from './pages/SignUp.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
)
