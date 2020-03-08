module.exports = {
    apps: [{
        name: 'won app',
        script: 'index.js',
        instances: 0,
        exec_mode: 'cluster',
        watch: true,
        env: {
            NODE_ENV: 'development',
            PORT: '3000'
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: '3000'
        },
        env_maintenance: {
            NODE_ENV: 'maintenance',
            PORT: '3000'
        }
    }]
};