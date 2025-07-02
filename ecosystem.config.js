// PM2 ecosystem configuration for Deno CV application
// Note: This requires pm2 with deno support or use a process manager that supports Deno
module.exports = {
  apps: [{
    name: "cv-website-deno",
    script: "server.ts",
    interpreter: "deno",
    interpreter_args: "run --allow-net --allow-read --allow-env",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "200M",
    env: {
      DENO_ENV: "production",
      PORT: 8765
    }
  }]
};
