const http = require("http");

port = 3000;

const routeMap = {
    "/movies" : "All Movies Data in JSON format from Mongo DB",
    "/genres" : "All Genres Data in JSON format from Mongo DB",
    "/artists" : "All Artists Data in JSON format from Mongo DB"
}

const app = http.createServer((req,res)=>{
    if(routeMap[req.url]){
        res.writeHead(200,{"Content-type": "text/html"});
        res.end(routeMap[req.url]);
    }else{
        res.writeHead(404,{"Content-type": "plain/text"});
        res.end()
    }
})

app.listen(port);
module.exports = {app,routeMap};
