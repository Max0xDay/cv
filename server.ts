/* Author: Max Day
 * Date: 03/04/2025
 */

import { serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";
import { extname } from "https://deno.land/std@0.224.0/path/mod.ts";
import { contentType } from "https://deno.land/std@0.224.0/media_types/mod.ts";

const PORT = Number(Deno.env.get("PORT")) || 8765;

async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === "/") {
    try {
      return await serveFile(request, "./public/index.html");
    } catch {
      return new Response("Not Found", { status: 404 });
    }
  }

  if (pathname.startsWith("/public/") || 
      pathname.startsWith("/main.js") || 
      pathname.startsWith("/styles.css") ||
      pathname.startsWith("/index.html")) {
    try {
      let filePath: string;
      if (pathname.startsWith("/public/")) {
        filePath = "." + pathname;
      } else {
        filePath = "./public" + pathname;
      }
      return await serveFile(request, filePath);
    } catch {
      return new Response("Not Found", { status: 404 });
    }
  }

  if (pathname.startsWith("/pdfs/")) {
    try {
      const filePath = "." + pathname;
      const response = await serveFile(request, filePath);
      
      if (pathname.endsWith(".pdf")) {
        const headers = new Headers(response.headers);
        headers.set("Content-Type", "application/pdf");
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers
        });
      }
      
      return response;
    } catch {
      return new Response("Not Found", { status: 404 });
    }
  }

  if (pathname.startsWith("/images/")) {
    try {
      const filePath = "." + pathname;
      const response = await serveFile(request, filePath);
      
      const ext = extname(pathname);
      const mimeType = contentType(ext);
      if (mimeType) {
        const headers = new Headers(response.headers);
        headers.set("Content-Type", mimeType);
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers
        });
      }
      
      return response;
    } catch {
      return new Response("Not Found", { status: 404 });
    }
  }

  return new Response("Not Found", { status: 404 });
}

console.log(`CV server is running at http://localhost:${PORT}`);
Deno.serve({ port: PORT }, handler);
