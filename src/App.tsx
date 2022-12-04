import { ThemeProvider } from '@mui/system';
import React from 'react';
import './App.css';
import { RunContextProvider } from './context/RunContextProvider';
import CheckUserView from './view/CheckUserView';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from './context/ThemeProvider';
import NotFoundView from './view/4XX/NotFoundView';
import IndexView from './view/IndexView';
import RandomProblemView from './view/RandomProblemView';
import SignUpView from './view/SignUpView';
import LogInView from './view/LogInView';
import ProblemSolveView from './view/ProblemSolveView';
import { AdminRoute } from './utils/RoleAuthenticator';
import AdminView from './view/AdminView';
import ForbiddenView from './view/4XX/ForbiddenView';



function App(): React.ReactElement {

	return (
		<>
			<RunContextProvider>
				<ThemeProvider theme = {theme}>
					<BrowserRouter>
						<Routes>
							<Route path = '/' element = {<IndexView />} />
							<Route path = '/check' element = {<CheckUserView />} />
							<Route path = '/random-problem' element = {<RandomProblemView />} />
							<Route path = '/signup' element = {<SignUpView />} />
							<Route path = '/login' element = {<LogInView />} />
							<Route path = '/problemsolve/:titleSlug' element = {<ProblemSolveView />} />
							<Route path = '/admin' element = {<AdminRoute> <AdminView /> </AdminRoute>} />
							
							<Route path = '/403' element = {<ForbiddenView />} />
							<Route path = '/404' element = {<NotFoundView />} />
							<Route path = '*' element = {<NotFoundView />} />
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</RunContextProvider>
		</>
	);
}

export default App;
