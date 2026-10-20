import page from "./page.html"

const html = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "public, max-age=0, must-revalidate",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin"
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { allow: "GET, HEAD" } })
    }

    if (url.pathname === "/health") {
      return Response.json({ name: "kinetic-lab", status: "online", studies: 7 })
    }

    if (url.pathname === "/robots.txt") {
      return new Response("User-agent: *\nAllow: /\n", {
        headers: { "content-type": "text/plain; charset=utf-8" }
      })
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(request.method === "HEAD" ? null : page, { headers: html })
    }

    return new Response("Not found", { status: 404, headers: { "content-type": "text/plain" } })
  }
}
