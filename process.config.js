module.exports = {
	name: 'DoitTest',
	script: `./src/index.js`,
	watch: true,
	env: {
		DEBUG_COLORS: true,
		FORCE_COLOR: true,
		args: ['--ignore-watch=\.git|logs/|node_modules/', '--color'] 
	}
}