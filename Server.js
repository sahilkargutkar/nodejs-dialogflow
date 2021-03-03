const express = require('express')
const app = express();
const dfff =require('dialogflow-fulfillment');
const port = 3000

app.get('/',(req,res) =>{
    res.send('App is live')
});

app.post('/',express.json(),( req,res ) =>{
    const agent= new dfff.WebhookClient ({
        request:req,
        response:res,
    });
    function demo(agent){
        agent.add('Which type of Checkup do you want?')
    };
    function customMessages(agent){
        var customData = {
            "richContent": [
              [
                {
                  "type": "description",
                  "title": "Doctors Available",
                  "text": [
                    "Dr.Ramesh Salunkhe",
                    "Dr.Abhijeet",
                    "Dr.Pradyuman",
                    "Dr.Daya"
                  ]
                },
                {
                  "type": "chips",
                  "options": [
                    {
                      "text": "at 8:00am",
                      
                    },
                    {
                      "text": "at 9:00am",
                    },
                    {
                      "text": "at 10:00am",
                    },
                    {
                      "text": "at 1:00pm",
                    }
                  ]
                }
              ]
            ]
          }
          agent.add(new dfff.Payload(agent.UNSPECIFIED,customData,{sendAsMessage:true, rawPayload:true}))
          agent.add('Can I get your name and phone number please');
        }
    

    function getNameAndPhone(agent){
      var name = agent.context.get("awaiting_name").parameters['given-name'];
      var phone= agent.context.get("awaiting_phone").parameters.phone;

      console.log(name);
      console.log(phone);
      
      

      agent.add('Your Appointment has been confirmed!!!')
    }



    var intentMap = new Map();
    intentMap.set('WebhookResp',demo)
    intentMap.set('getNameAndPhone',getNameAndPhone)
    intentMap.set('CustomMessages',customMessages)
    agent.handleRequest(intentMap);
})


app.listen(port,( )=>console.log('server is live at 3000'));