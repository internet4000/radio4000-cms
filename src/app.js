import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {SWRConfig} from 'swr'

import fetcher from 'utils/fetcher'
import {DbSessionContext} from 'contexts/db-session'
import DbSession from 'components/db-session'
import Layout from 'layouts/app'

import PageHome from 'pages/home'

import AuthRequired from 'components/auth-required'
import PageRegister from 'pages/auth/register'
import PageLogin from 'pages/auth/login'
import PageLogout from 'pages/auth/logout'
import PageResetPassword from 'pages/auth/reset-password'

import PageAccount from 'pages/account'
import PageAccountChannels from 'pages/channels/me'

import PageChannels from 'pages/channels'
import PageChannel from 'pages/channel'
import PageChannelsCreate from 'pages/channels/create'
import PageChannelsImport from 'pages/channels/import'
import PageChannelEdit from 'pages/channel/edit'

import PageTest from 'pages/test'
import PageAdd from 'pages/tracks/create'
import PageNoMatch from 'pages/404'

export default function App() {
	return (
		<SWRConfig value={{fetcher}}>
			<BrowserRouter>
				<DbSession>
					<DbSessionContext.Consumer>
						{(dbSession) => (
							<Layout session={dbSession.session}>
								<Routes>
									<Route path="/" element={<PageHome dbSession={dbSession} />} />

									{/* Auth */}
									<Route path="register" element={<PageRegister dbSession={dbSession} />} />
									<Route path="login" element={<PageLogin dbSession={dbSession} />} />
									<Route path="logout" element={<PageLogout dbSession={dbSession} />} />
									<Route path="reset-password" element={<PageResetPassword dbSession={dbSession} />} />

									{/* Account */}
									<Route path="account" element={
										<AuthRequired session={dbSession.session}>
											<PageAccount dbSession={dbSession} />
										</AuthRequired>
									}></Route>
									{/* Channel(s) */}
									<Route path="channels/create" element={<PageChannelsCreate dbSession={dbSession} />} />
									<Route path="channels/import" element={<PageChannelsImport dbSession={dbSession} />} />
									<Route path="channels/me" element={
										<AuthRequired session={dbSession.session}>
											<PageAccountChannels dbSession={dbSession}/>
										</AuthRequired>
									}></Route>
									<Route path="channels" element={<PageChannels dbSession={dbSession} />} />
									<Route path=":slug" element={<PageChannel dbSession={dbSession} />} />
									<Route path=":slug/edit" element={<PageChannelEdit dbSession={dbSession} />} />
									<Route path="tracks/create" element={<PageAdd dbSession={dbSession} />} />
									<Route path="tracks/create/:slug" element={<PageAdd dbSession={dbSession} />} />

									{/* Other pages */}
									<Route path="test" element={<PageTest dbSession={dbSession} />} />
									<Route path="*" element={<PageNoMatch />} />
								</Routes>
							</Layout>
						)}
					</DbSessionContext.Consumer>
				</DbSession>
			</BrowserRouter>
		</SWRConfig>
	)
}
