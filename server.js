var express = require ('express');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

app.use(router);
router.all('/', function (req, res, next) {  
  console.log('Someone made a request!');
  next();
});


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

var BoardingPass = [];
BoardingPass[0]= (
{
 "messages": [
  {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "airline_boardingpass",
        "intro_message": "You are checked in.",
        "locale": "en_US",
        "theme_color":"#d61a2b",
        "boarding_pass": 
          [{
            "passenger_name": "LUIS TORRES",
            "pnr_number": "CG4X7U",
            "travel_class": "business",
            "seat": "74J",
            "auxiliary_fields": [
              {
                "label": "Terminal",
                "value": "T1"
              },
              {
                "label": "Departure",
                "value": "30OCT 19:05"
              }
            ],
            "secondary_fields": [
              {
                "label": "Boarding",
                "value": "18:30"
              },
              {
                "label": "Gate",
                "value": "D57"
              },
              {
                "label": "Seat",
                "value": "74J"
              },
              {
                "label": "Sec.Nr.",
                "value": "003"
              }
            ],
            "logo_image_url": "http://www.outono.net/elentir/wp-content/uploads/2013/10/10334967323_f1b359c78a_o.png",
            "header_image_url": "https:\/\/www.example.com\/en\/fb\/header.png",
            "qr_code": "M1SMITH\/NICOLAS  CG4X7U nawouehgawgnapwi3jfa0wfh",
            "above_bar_code_image_url": "https:\/\/www.example.com\/en\/PLAT.png",
            "flight_info": {
              "flight_number": "KL0642",
              "departure_airport": {
                "airport_code": "JFK",
                "city": "New York",
                "terminal": "T1",
                "gate": "D57"
              },
              "arrival_airport": {
                "airport_code": "AMS",
                "city": "Amsterdam"
              },
              "flight_schedule": {
                "departure_time": "2016-01-02T19:05",
                "arrival_time": "2016-01-05T17:30"
              }
            }
          }]
      }
    }
  }]
})

router.get ('/', function(req, res){
  global.surname = req.param ('surname');
  global.codigo = req.param ('codigo');
  checkin[0].messages[0].attachment.payload.intro_message= (`Checkin is available Mr ${surname}`);
  checkin[0].messages[0].attachment.payload.pnr_number= (`${codigo}`);
  res.setHeader('Content-type', 'application/json');
  res.json((checkin[0]));
});



router.get ('/bpass', function(req, res){
  global.surname = req.param ('surname');
  global.codigo = req.param ('codigo');
  BoardingPass[0].messages[0].attachment.payload.boarding_pass.passenger_name= (`Mr ${surname}`);
  BoardingPass[0].messages[0].attachment.payload.boarding_pass.pnr_number= (`${codigo}`);
  res.setHeader('Content-type', 'application/json');
  res.json((BoardingPass[0]));
});
app.listen (port);
console.log (`Server started at ${port}`)
