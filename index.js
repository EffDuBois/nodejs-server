import http from "node:http";
import fs from "fs/promises";

const port = 8080;
const host = "localhost";
const _resources = "./resources/";

let homePage, contactPage, aboutPage, notFoundPage;

fs.readFile(_resources + "index.html")
  .then((data) => {
    homePage = data;
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

fs.readFile(_resources + "about.html")
  .then((data) => {
    aboutPage = data;
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

fs.readFile(_resources + "contact-me.html")
  .then((data) => {
    contactPage = data;
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

fs.readFile(_resources + "404.html")
  .then((data) => {
    notFoundPage = data;
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  console.log(req.url);
  switch (req.url) {
    case "/":
      res.writeHead(200);
      res.end(homePage);
      break;
    case "/about":
      res.writeHead(200);
      res.end(aboutPage);
      break;
    case "/contact-me":
      res.writeHead(200);
      res.end(contactPage);
      break;

    default:
      res.writeHead(404);
      res.end(notFoundPage);
      break;
  }
});
server.listen(port, host, (req, res) => {
  console.log(`Server listening on ${port}`);
});
