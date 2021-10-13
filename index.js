const express = require("express");
const app = express();
const {WebhookClient} = require('dialogflow-fulfillment');
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/webhook", express.json(), function (req, res) {
    const agent = new WebhookClient({ request:req, response:res });
    console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
   
    function welcome(agent) {
      agent.add(`Welcome to my agent!`);
    }
   
    function fallback(agent) {
      agent.add(`I didn't understand`);
      agent.add(`I'm sorry, can you try again?`);
    }
    function calendario(agent) {
        agent.add(`Estoy enviando esta respuesta desde webhook`);
      }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('calendario', calendario);


 
    app.listen(3000);