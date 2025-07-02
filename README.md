# CV Website - Deno Version

A cool interactive CV in Deno.

## Author
Max Day

## Version
0.2.3

## Description
This is a Deno version of the CV website, converted from the original Node.js implementation. It serves static files including HTML, CSS, JavaScript, PDFs, and images. Feel free to clone and modify for yourself.

## Requirements
- Deno 1.40+ (recommended)

## Installation & Setup

1. Install Deno if you haven't already:
   ```bash
   curl -fsSL https://deno.land/install.sh | sh
   ```

2. Navigate to the project directory:
   ```bash
   cd cv-deno
   ```

## Running the Application

### Development Mode
```bash
deno task dev
```
or
```bash
deno run --allow-net --allow-read --allow-env --watch server.ts
```

### Production Mode
```bash
deno task start
```
or
```bash
deno run --allow-net --allow-read --allow-env server.ts
```

### Using the startup script
```bash
./start-cv-deno.sh
```

## Configuration

- **Port**: 8700 (default) - can be changed via PORT environment variable
- **Environment**: Set DENO_ENV=production for production mode

## File Structure

```
cv-deno/
├── server.ts              # Main server file
├── deno.json              # Deno configuration
├── ecosystem.config.js    # PM2 configuration
├── cv-deno.service        # Systemd service file
├── start-cv-deno.sh       # Startup script
├── public/                # Static web files
│   ├── index.html
│   ├── main.js
│   └── styles.css
├── pdfs/                  # PDF files
└── images/                # Image files
```

## Permissions

The application requires the following Deno permissions:
- `--allow-net`: To serve HTTP requests
- `--allow-read`: To read static files
- `--allow-env`: To read environment variables (PORT, DENO_ENV)

## License
MIT
