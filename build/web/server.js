'use strict';

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket2 = require('socket.io');

var _socket3 = _interopRequireDefault(_socket2);

var _greenBoxApi = require('../greenBoxApi');

var GreenBoxAPI = _interopRequireWildcard(_greenBoxApi);

var _busInterface = require('../greenBoxApi/busInterface');

var busInterface = _interopRequireWildcard(_busInterface);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.on('unhandledRejection', function (reason, p) {
  console.error('Unhandled Rejection:', p, '\nreason:', reason.stack || reason);
});
// import morgan from 'morgan';

const WEB_SERVER_PORT = process.env.SERVER_PORT || 8080;

const app = (0, _express2.default)();

app.use('/', _express2.default.static(_path2.default.join(__dirname, '../../web_files')));

app.use(_bodyParser2.default.urlencoded({ extended: false, limit: '2mb' }));
app.use(_bodyParser2.default.json({ limit: '2mb' }));

// app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../../../web_files/index.html'));
});

app.post('/verifyIdentity', (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (req, res) {
    const requestId = yield GreenBoxAPI.requestAuthen(req.body.selectedIdps, req.body.hideSourceRp);
    res.status(200).send({
      requestId
    });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

app.get('/idps', (req, res) => {
  res.status(200).send({
    idps: [{
      id: 1,
      name: 'IDP-1'
    }, {
      id: 2,
      name: 'IDP-2'
    }, {
      id: 3,
      name: 'IDP-3'
    }]
  });
});

const server = _http2.default.createServer(app);

/**
 * WebSocket
 */
const ws = (0, _socket3.default)(server);
let socket;

ws.on('connection', function (_socket) {
  socket = _socket;
});

busInterface.event.on('success', function (event) {
  if (socket) {
    socket.emit('success', { requestId: event.requestId });
  }
});

// TO BE REVISED
busInterface.event.on('deny', function (event) {
  if (socket) {
    socket.emit('deny', { requestId: event.requestId });
  }
});

busInterface.event.on('error', function (event) {
  if (socket) {
    socket.emit('fail', { requestId: event.requestId });
  }
});

server.listen(WEB_SERVER_PORT);

console.log(`RP Web Server is running. Listening to port ${WEB_SERVER_PORT}`);

console.log(`RP ID: ${process.env.RP_ID || 1}`);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvc2VydmVyLmpzIl0sIm5hbWVzIjpbIkdyZWVuQm94QVBJIiwiYnVzSW50ZXJmYWNlIiwicHJvY2VzcyIsIm9uIiwicmVhc29uIiwicCIsImNvbnNvbGUiLCJlcnJvciIsInN0YWNrIiwiV0VCX1NFUlZFUl9QT1JUIiwiZW52IiwiU0VSVkVSX1BPUlQiLCJhcHAiLCJ1c2UiLCJzdGF0aWMiLCJqb2luIiwiX19kaXJuYW1lIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwibGltaXQiLCJqc29uIiwiZ2V0IiwicmVxIiwicmVzIiwic2VuZEZpbGUiLCJwb3N0IiwicmVxdWVzdElkIiwicmVxdWVzdEF1dGhlbiIsImJvZHkiLCJzZWxlY3RlZElkcHMiLCJoaWRlU291cmNlUnAiLCJzdGF0dXMiLCJzZW5kIiwiaWRwcyIsImlkIiwibmFtZSIsInNlcnZlciIsImNyZWF0ZVNlcnZlciIsIndzIiwic29ja2V0IiwiX3NvY2tldCIsImV2ZW50IiwiZW1pdCIsImxpc3RlbiIsImxvZyIsIlJQX0lEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7OztBQUdBOzs7O0FBRUE7O0lBQVlBLFc7O0FBQ1o7O0lBQVlDLFk7Ozs7OztBQUVaQyxRQUFRQyxFQUFSLENBQVcsb0JBQVgsRUFBaUMsVUFBU0MsTUFBVCxFQUFpQkMsQ0FBakIsRUFBb0I7QUFDbkRDLFVBQVFDLEtBQVIsQ0FBYyxzQkFBZCxFQUFzQ0YsQ0FBdEMsRUFBeUMsV0FBekMsRUFBc0RELE9BQU9JLEtBQVAsSUFBZ0JKLE1BQXRFO0FBQ0QsQ0FGRDtBQVBBOztBQVdBLE1BQU1LLGtCQUFrQlAsUUFBUVEsR0FBUixDQUFZQyxXQUFaLElBQTJCLElBQW5EOztBQUVBLE1BQU1DLE1BQU0sd0JBQVo7O0FBRUFBLElBQUlDLEdBQUosQ0FBUSxHQUFSLEVBQWEsa0JBQVFDLE1BQVIsQ0FBZSxlQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsaUJBQXJCLENBQWYsQ0FBYjs7QUFFQUosSUFBSUMsR0FBSixDQUFRLHFCQUFXSSxVQUFYLENBQXNCLEVBQUVDLFVBQVUsS0FBWixFQUFtQkMsT0FBTyxLQUExQixFQUF0QixDQUFSO0FBQ0FQLElBQUlDLEdBQUosQ0FBUSxxQkFBV08sSUFBWCxDQUFnQixFQUFFRCxPQUFPLEtBQVQsRUFBaEIsQ0FBUjs7QUFFQTs7QUFFQVAsSUFBSVMsR0FBSixDQUFRLEdBQVIsRUFBYSxDQUFDQyxHQUFELEVBQU1DLEdBQU4sS0FBYztBQUN6QkEsTUFBSUMsUUFBSixDQUFhLGVBQUtULElBQUwsQ0FBVUMsU0FBVixFQUFxQiwrQkFBckIsQ0FBYjtBQUNELENBRkQ7O0FBSUFKLElBQUlhLElBQUosQ0FBUyxpQkFBVDtBQUFBLDZDQUE0QixXQUFPSCxHQUFQLEVBQVlDLEdBQVosRUFBb0I7QUFDOUMsVUFBTUcsWUFBWSxNQUFNMUIsWUFBWTJCLGFBQVosQ0FBMEJMLElBQUlNLElBQUosQ0FBU0MsWUFBbkMsRUFBaURQLElBQUlNLElBQUosQ0FBU0UsWUFBMUQsQ0FBeEI7QUFDQVAsUUFBSVEsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQ25CTjtBQURtQixLQUFyQjtBQUdELEdBTEQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBT0FkLElBQUlTLEdBQUosQ0FBUSxPQUFSLEVBQWlCLENBQUNDLEdBQUQsRUFBTUMsR0FBTixLQUFjO0FBQzdCQSxNQUFJUSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDbkJDLFVBQU0sQ0FDSjtBQUNFQyxVQUFJLENBRE47QUFFRUMsWUFBTTtBQUZSLEtBREksRUFLSjtBQUNFRCxVQUFJLENBRE47QUFFRUMsWUFBTTtBQUZSLEtBTEksRUFTSjtBQUNFRCxVQUFJLENBRE47QUFFRUMsWUFBTTtBQUZSLEtBVEk7QUFEYSxHQUFyQjtBQWdCRCxDQWpCRDs7QUFtQkEsTUFBTUMsU0FBUyxlQUFLQyxZQUFMLENBQWtCekIsR0FBbEIsQ0FBZjs7QUFFQTs7O0FBR0EsTUFBTTBCLEtBQUssc0JBQUdGLE1BQUgsQ0FBWDtBQUNBLElBQUlHLE1BQUo7O0FBRUFELEdBQUduQyxFQUFILENBQU0sWUFBTixFQUFvQixVQUFTcUMsT0FBVCxFQUFpQjtBQUNuQ0QsV0FBU0MsT0FBVDtBQUNELENBRkQ7O0FBSUF2QyxhQUFhd0MsS0FBYixDQUFtQnRDLEVBQW5CLENBQXNCLFNBQXRCLEVBQWlDLFVBQVNzQyxLQUFULEVBQWdCO0FBQy9DLE1BQUlGLE1BQUosRUFBWTtBQUNWQSxXQUFPRyxJQUFQLENBQVksU0FBWixFQUF1QixFQUFFaEIsV0FBV2UsTUFBTWYsU0FBbkIsRUFBdkI7QUFDRDtBQUNGLENBSkQ7O0FBTUE7QUFDQXpCLGFBQWF3QyxLQUFiLENBQW1CdEMsRUFBbkIsQ0FBc0IsTUFBdEIsRUFBOEIsVUFBU3NDLEtBQVQsRUFBZ0I7QUFDNUMsTUFBSUYsTUFBSixFQUFZO0FBQ1ZBLFdBQU9HLElBQVAsQ0FBWSxNQUFaLEVBQW9CLEVBQUVoQixXQUFXZSxNQUFNZixTQUFuQixFQUFwQjtBQUNEO0FBQ0YsQ0FKRDs7QUFNQXpCLGFBQWF3QyxLQUFiLENBQW1CdEMsRUFBbkIsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBU3NDLEtBQVQsRUFBZ0I7QUFDN0MsTUFBSUYsTUFBSixFQUFZO0FBQ1ZBLFdBQU9HLElBQVAsQ0FBWSxNQUFaLEVBQW9CLEVBQUVoQixXQUFXZSxNQUFNZixTQUFuQixFQUFwQjtBQUNEO0FBQ0YsQ0FKRDs7QUFNQVUsT0FBT08sTUFBUCxDQUFjbEMsZUFBZDs7QUFFQUgsUUFBUXNDLEdBQVIsQ0FBYSwrQ0FBOENuQyxlQUFnQixFQUEzRTs7QUFFQUgsUUFBUXNDLEdBQVIsQ0FBYSxVQUFTMUMsUUFBUVEsR0FBUixDQUFZbUMsS0FBWixJQUFxQixDQUFFLEVBQTdDIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XG5cbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcblxuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG4vLyBpbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5cbmltcG9ydCBpbyBmcm9tICdzb2NrZXQuaW8nO1xuXG5pbXBvcnQgKiBhcyBHcmVlbkJveEFQSSBmcm9tICcuLi9ncmVlbkJveEFwaSc7XG5pbXBvcnQgKiBhcyBidXNJbnRlcmZhY2UgZnJvbSAnLi4vZ3JlZW5Cb3hBcGkvYnVzSW50ZXJmYWNlJztcblxucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgZnVuY3Rpb24ocmVhc29uLCBwKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBSZWplY3Rpb246JywgcCwgJ1xcbnJlYXNvbjonLCByZWFzb24uc3RhY2sgfHwgcmVhc29uKTtcbn0pO1xuXG5jb25zdCBXRUJfU0VSVkVSX1BPUlQgPSBwcm9jZXNzLmVudi5TRVJWRVJfUE9SVCB8fCA4MDgwO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbmFwcC51c2UoJy8nLCBleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vLi4vd2ViX2ZpbGVzJykpKTtcblxuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UsIGxpbWl0OiAnMm1iJyB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IGxpbWl0OiAnMm1iJyB9KSk7XG5cbi8vIGFwcC51c2UobW9yZ2FuKCdjb21iaW5lZCcpKTtcblxuYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4ge1xuICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uLy4uL3dlYl9maWxlcy9pbmRleC5odG1sJykpO1xufSk7XG5cbmFwcC5wb3N0KCcvdmVyaWZ5SWRlbnRpdHknLCBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgcmVxdWVzdElkID0gYXdhaXQgR3JlZW5Cb3hBUEkucmVxdWVzdEF1dGhlbihyZXEuYm9keS5zZWxlY3RlZElkcHMsIHJlcS5ib2R5LmhpZGVTb3VyY2VScCk7XG4gIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHtcbiAgICByZXF1ZXN0SWQsXG4gIH0pO1xufSk7XG5cbmFwcC5nZXQoJy9pZHBzJywgKHJlcSwgcmVzKSA9PiB7XG4gIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHtcbiAgICBpZHBzOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICBuYW1lOiAnSURQLTEnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IDIsXG4gICAgICAgIG5hbWU6ICdJRFAtMicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMyxcbiAgICAgICAgbmFtZTogJ0lEUC0zJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSk7XG59KTtcblxuY29uc3Qgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKTtcblxuLyoqXG4gKiBXZWJTb2NrZXRcbiAqL1xuY29uc3Qgd3MgPSBpbyhzZXJ2ZXIpO1xubGV0IHNvY2tldDtcblxud3Mub24oJ2Nvbm5lY3Rpb24nLCBmdW5jdGlvbihfc29ja2V0KXtcbiAgc29ja2V0ID0gX3NvY2tldDtcbn0pO1xuXG5idXNJbnRlcmZhY2UuZXZlbnQub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbihldmVudCkge1xuICBpZiAoc29ja2V0KSB7XG4gICAgc29ja2V0LmVtaXQoJ3N1Y2Nlc3MnLCB7IHJlcXVlc3RJZDogZXZlbnQucmVxdWVzdElkIH0pO1xuICB9XG59KTtcblxuLy8gVE8gQkUgUkVWSVNFRFxuYnVzSW50ZXJmYWNlLmV2ZW50Lm9uKCdkZW55JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKHNvY2tldCkge1xuICAgIHNvY2tldC5lbWl0KCdkZW55JywgeyByZXF1ZXN0SWQ6IGV2ZW50LnJlcXVlc3RJZCB9KTtcbiAgfVxufSk7XG5cbmJ1c0ludGVyZmFjZS5ldmVudC5vbignZXJyb3InLCBmdW5jdGlvbihldmVudCkge1xuICBpZiAoc29ja2V0KSB7XG4gICAgc29ja2V0LmVtaXQoJ2ZhaWwnLCB7IHJlcXVlc3RJZDogZXZlbnQucmVxdWVzdElkIH0pO1xuICB9XG59KTtcblxuc2VydmVyLmxpc3RlbihXRUJfU0VSVkVSX1BPUlQpO1xuXG5jb25zb2xlLmxvZyhgUlAgV2ViIFNlcnZlciBpcyBydW5uaW5nLiBMaXN0ZW5pbmcgdG8gcG9ydCAke1dFQl9TRVJWRVJfUE9SVH1gKTtcblxuY29uc29sZS5sb2coYFJQIElEOiAke3Byb2Nlc3MuZW52LlJQX0lEIHx8IDF9YCk7XG4iXX0=