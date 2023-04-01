import {useState, useEffect} from 'react'
import {ThemeContext, themeContextDefault, darkMediaQuery} from 'contexts/theme.js'
import {PlayerProvider} from 'contexts/player'
import SiteNav from 'components/site/nav'
import Player from 'components/player'

export default function LayoutApp({children, dbSession, session}) {
	const [theme, setTheme] = useState(themeContextDefault.theme)

	const darkModeListener = (event) => {
		if (event.matches) {
			setTheme(themeContextDefault.themes[0])
		} else {
			setTheme(themeContextDefault.themes[1])
		}
	}
	useEffect(() => {
		window.matchMedia(darkMediaQuery).addEventListener('change', darkModeListener)
		return function cleanup() {
			window.removeEventListener('change', darkModeListener)
		}
	})
	const toggleTheme = () => {
		const {themes, theme} = themeContext
		const themesLength = themes.length
		const activeThemeIndex = themes.indexOf(theme)
		const newThemeIndex = themesLength % activeThemeIndex
		const newTheme = themes[newThemeIndex]
		setTheme(newTheme)
	}

	const themeContext = {
		theme,
		themes: themeContextDefault.themes,
		toggleTheme: toggleTheme
	}

	return (
		<ThemeContext.Provider value={themeContext}>
			<PlayerProvider>
				<main className={`Layout Layout--theme-${theme}`}>
					<header className="Layout-header">
						<SiteNav />
					</header>
					<main className="Layout-main">{children}</main>
					<footer className="Layout-footer">
						{/* <Player database={dbSession.database} /> */}
					</footer>
				</main>
			</PlayerProvider>
		</ThemeContext.Provider>
	)
}
