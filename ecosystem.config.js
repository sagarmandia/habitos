module.exports = {
  apps: [
    {
      name: "habitos-api",
      script: "./src/index.js",
      cwd: "/home/deploy/apps/habitos/server",

      instances: 1,
      exec_mode: "fork",

      autorestart: true,
      max_memory_restart: "300M",

      env: {
        NODE_ENV: "production"
      }
    },
    {
      name: "habitos-web",
      script: "npm",
      args: "start",
      cwd: "/home/deploy/apps/habitos/client",

      instances: 1,
      exec_mode: "fork",

      autorestart: true,

      env: {
        NODE_ENV: "production"
      }
    }
  ]
}