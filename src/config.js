const config = {
	/* general app info */
	RADIO4000_APP_NAME: process.env.REACT_APP_RADIO4000_APP_NAME || 'Radio4000',
	RADIO4000_APP_NAME_MINI: process.env.REACT_APP_RADIO4000_APP_NAME_MINI || 'R4',

	/* if having the r4-api deployed */
	RADIO4000_API_URL: process.env.REACT_APP_RADIO4000_API_URL|| 'https://api.radio4000.com',

	/* Hcpatch */
	HCAPTCHA_SITE_KEY: process.env.REACT_APP_HCAPTCHA_SITE_KEY,

	/* if connecting to supabase db/auth */
	SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL,
	SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY,

	/* if having to migrate legacy firebase-realtime db/auth */
	FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
	FIREBASE_AUTH_DOMAIN: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	FIREBASE_DATABASE_URL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	FIREBASE_PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	FIREBASE_APP_ID: process.env.REACT_APP_FIREBASE_APP_ID,
}
export default config
