// working file for sending xyz data as post requests

var http = require('http');
var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);


accel.on('ready', function () {
  console.log('Connected to accel');
  var start = new Date();

  // setImmediate(function loop () {
    accel.on('data', function (xyz) {
      console.log("position", xyz);

      var req = http.request(
        {
          hostname: '192.168.1.219',
          port: '3000',
          path: '/',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      req.on(
        'error',
        function(e) {
          console.log("Problem with request: %s", e.message)
        }
      )
      req.write(
        JSON.stringify( xyz )
      );
      req.end();
      // setTimeout(loop, 5000);
    });
  // });
});


// climate.on('ready', function () {
//   console.log('Connected to si7005');

//   // Loop forever
//   setImmediate(function loop () {
//     climate.readTemperature('f', function (err, temp) {
//       climate.readHumidity(function (err, humid) {
//         console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');
//         var req = http.request(
//           {
//             hostname: '192.168.0.107',
//             port: '8080',
//             path: '/data/packet',
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           }
//         )
//         req.on(
//           'error',
//           function(e) {
//             console.log("Problem with request: %s", e.message)
//           }
//         )
//         req.write(
//           JSON.stringify( {Degrees: temp.toFixed(4) + 'F', Humidity: humid.toFixed(4) + '%RH'} )
//         )
//         req.end()
//         setTimeout(loop, 300);
//       });
//     });
//   });
// });