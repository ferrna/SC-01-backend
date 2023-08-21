import http from "http";


require("./app.ts");
const { } = require("./db.ts");

const port = process.env.PORT || 80;

export const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "It Works!",
    })
  );
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`)
})