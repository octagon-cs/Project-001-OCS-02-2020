module.exports = {
    apps: [{
        name: 'won app',
        script: 'index.js',
        instances: 0,
        exec_mode: 'cluster',
        watch: true,
        env: {
            NODE_ENV: 'production',
            PORT: '3000'
        }
    }]
};