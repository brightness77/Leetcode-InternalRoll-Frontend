import { ThemeProvider } from '@mui/system';
import React from 'react';
import './App.css';
import { RunContextProvider } from './context/RunContextProvider';
import CheckUserView from './view/CheckUserView';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from './context/ThemeProvider';
import NotFoundView from './view/4XX/NotFoundView';
import IndexView from './view/IndexView';
import RandomProblemView from './view/ProblemChoose/RandomProblemView';
import SignUpView from './view/user/SignUpView';
import LogInView from './view/user/LogInView';
import ProblemSolveView from './view/ProblemSolveView';
import { AdminRoute } from './utils/RoleAuthenticator';
import AdminView from './view/AdminView';
import ForbiddenView from './view/4XX/ForbiddenView';
import MyRecordView from './view/user/MyRecordView';
import ChooseProblemView from './view/ProblemChoose/ChooseProblemView';



function App(): React.ReactElement {

	return (
		<>
			<RunContextProvider>
				<ThemeProvider theme = {theme}>
					<BrowserRouter>
						<Routes>
							<Route path = '/' element = {<IndexView />} />

							<Route path = '/signup' element = {<SignUpView />} />
							<Route path = '/login' element = {<LogInView />} />

							<Route path = '/admin' element = {<AdminRoute> <AdminView /> </AdminRoute>} />
							<Route path = '/my/record' element = {<MyRecordView />} />

							<Route path = '/check' element = {<CheckUserView />} />
							<Route path = '/random-problem' element = {<RandomProblemView />} />
							<Route path = '/choose-problem' element = {<ChooseProblemView />} />

							<Route path = '/problemsolve/:titleSlug' element = {<ProblemSolveView />} />

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
