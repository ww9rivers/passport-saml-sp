module.exports = [
    {
	name: 'server',
        entry: './app.js',
	target: 'node',
	mode: "production",
	output: {
	    path: __dirname + '/dist/server',
	    filename: 'hits-passport.js',
	}
    }
];
