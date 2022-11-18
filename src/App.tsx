import { ThemeProvider } from '@mui/system';
import React from 'react';
import './App.css';
import RunContextProvider from './context/RunContextProvider';
import CheckUserView from './view/CheckUserView';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import theme from './context/ThemeProvider';
import NotFoundView from './view/NotFoundView';
import IndexView from './view/IndexView';
import RandomProblemView from './view/RandomProblemView';


function App(): React.ReactElement {
	return (
		<>
			<RunContextProvider>
				<ThemeProvider theme = {theme}>
					<BrowserRouter>
						<Routes>
							<Route path = '/' element = {<IndexView />}/>
							<Route path = '/check' element = {<CheckUserView />}/>
							<Route path = '/random-problem' element = {<RandomProblemView />}/>
							<Route path = '*' element = {<NotFoundView />}/>
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</RunContextProvider>
		</>
	);
}

export default App;
