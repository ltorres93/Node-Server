var express = require ('express');
var app = express();
var port = process.env.PORT || 3000;


var checkin = [];
checkin[0]= ({
  "messages": [
  {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "airline_checkin",
        "intro_message": "Welcome Mr $surname",
        "locale": "en_US",
		"theme_color":"#d61a2b",
        "pnr_number": "Code",
        "flight_info": [
          {
            "flight_number": "f001",
            "departure_airport": {
              "airport_code": "MAD",
              "city": "Madrid",
              "terminal": "T4",
              "gate": "G1"
            },
            "arrival_airport": {
              "airport_code": "SEA",
              "city": "Seattle",
              "terminal": "T4",
              "gate": "G8"
            },
            "flight_schedule": {
              "boarding_time": "2017-07-05T15:05",
              "departure_time": "2017-07-05T15:45",
              "arrival_time": "2017-07-05T23:30"
            }
          }
        ],
        "checkin_url": "http://www.iberia.com/es/autocheckin-online/"
      }
    }
  }]
})

app.get ('/*', function(req, res){
	var surname = req.param ('surname');
	var codigo = req.param ('codigo');
	checkin[0].messages[0].attachment.payload.intro_message= (`Checkin is available Mr ${surname}`);
	checkin[0].messages[0].attachment.payload.pnr_number= (`${codigo}`);
	 res.setHeader('Content-type', 'application/json');
	res.json((checkin[0]));
});

app.listen (port);
console.log (`Server started at ${port}`)
