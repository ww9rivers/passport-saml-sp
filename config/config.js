module.exports = {
    development: {
	app: {
	    name: 'HITS Passport SAML Authentication',
	    port: process.env.PORT || 1756
	},
	passport: {
	    strategy: 'saml',
	    saml: {
		path: process.env.SAML_PATH || '/login/callback',
		entryPoint: process.env.SAML_ENTRY_POINT || 'https://p-weblogin.med.umich.edu:8443/nidp/saml2/sso',
		issuer: 'passport-saml',
		cert: process.env.SAML_CERT || null
	    }
	}
    }
};
