import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Project6 from './projects/Project6';
import NotFound from './NotFound';


function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Main/>}></Route>
					<Route path='/projects/6' element={<Project6/>}></Route>
					<Route path="*" element={<NotFound/>}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
