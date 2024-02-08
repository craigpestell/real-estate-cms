module.exports = {
  apps: [
    {
      name: 'rg-group',
      exec_mode: 'fork',
      instances: '1', // Or a number of instances
      script: '/usr/bin/yarn',
      args: 'serve',
      interpreter: '/bin/bash',
      env_local: {
        APP_ENV: 'local' // APP_ENV=local
      },
      env_dev: {
        APP_ENV: 'dev' // APP_ENV=dev
      },
      env_prod: {
        APP_ENV: 'prod' // APP_ENV=prod
      }
    }
  ]
}
