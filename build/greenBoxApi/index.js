'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestAuthen = undefined;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _busInterface = require('./busInterface');

var busInterface = _interopRequireWildcard(_busInterface);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import * as userDirectoryInterface from './userDirectoryInterface';

// Wait for all event.
busInterface.event.on('success', function (event) {
  // Get requestId from event
  const requestId = event.requestId;
  const resultCode = event.resultCode;
  const resultMsg = event.resultMsg;

  console.log("Authentication success");
  console.log("request id: " + requestId + ", code: " + resultCode + ", msg: " + resultMsg);
});

busInterface.event.on('error', function (error) {
  const requestId = error.requestId;
  const errorCode = error.code;
  const errorMsg = error.message;

  console.error("Error request id: " + requestId + ", code: " + errorCode + ", msg: " + errorMsg);
});

const user = {
  id: '1100023145268',
  namespace: 'cid'
};

const requestAuthen = exports.requestAuthen = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (idps, hideSourceRpId) {
    const requestId = yield busInterface.createIdpRequest(user, idps, hideSourceRpId);
    console.log("Request sent with request ID: " + requestId);
    return requestId;
  });

  return function requestAuthen(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmVlbkJveEFwaS9pbmRleC5qcyJdLCJuYW1lcyI6WyJidXNJbnRlcmZhY2UiLCJldmVudCIsIm9uIiwicmVxdWVzdElkIiwicmVzdWx0Q29kZSIsInJlc3VsdE1zZyIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImVycm9yQ29kZSIsImNvZGUiLCJlcnJvck1zZyIsIm1lc3NhZ2UiLCJ1c2VyIiwiaWQiLCJuYW1lc3BhY2UiLCJyZXF1ZXN0QXV0aGVuIiwiaWRwcyIsImhpZGVTb3VyY2VScElkIiwiY3JlYXRlSWRwUmVxdWVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7SUFBWUEsWTs7Ozs7O0FBQ1o7O0FBRUE7QUFDQUEsYUFBYUMsS0FBYixDQUFtQkMsRUFBbkIsQ0FBc0IsU0FBdEIsRUFBaUMsVUFBU0QsS0FBVCxFQUFnQjtBQUMvQztBQUNBLFFBQU1FLFlBQVlGLE1BQU1FLFNBQXhCO0FBQ0EsUUFBTUMsYUFBYUgsTUFBTUcsVUFBekI7QUFDQSxRQUFNQyxZQUFZSixNQUFNSSxTQUF4Qjs7QUFFQUMsVUFBUUMsR0FBUixDQUFZLHdCQUFaO0FBQ0FELFVBQVFDLEdBQVIsQ0FBWSxpQkFBaUJKLFNBQWpCLEdBQTZCLFVBQTdCLEdBQTBDQyxVQUExQyxHQUF1RCxTQUF2RCxHQUFtRUMsU0FBL0U7QUFDRCxDQVJEOztBQVVBTCxhQUFhQyxLQUFiLENBQW1CQyxFQUFuQixDQUFzQixPQUF0QixFQUErQixVQUFTTSxLQUFULEVBQWdCO0FBQzdDLFFBQU1MLFlBQVlLLE1BQU1MLFNBQXhCO0FBQ0EsUUFBTU0sWUFBWUQsTUFBTUUsSUFBeEI7QUFDQSxRQUFNQyxXQUFXSCxNQUFNSSxPQUF2Qjs7QUFFQU4sVUFBUUUsS0FBUixDQUFjLHVCQUF1QkwsU0FBdkIsR0FBbUMsVUFBbkMsR0FDVk0sU0FEVSxHQUNFLFNBREYsR0FDY0UsUUFENUI7QUFFRCxDQVBEOztBQVNBLE1BQU1FLE9BQU87QUFDWEMsTUFBSSxlQURPO0FBRVhDLGFBQVc7QUFGQSxDQUFiOztBQUtPLE1BQU1DO0FBQUEsNkNBQWdCLFdBQU9DLElBQVAsRUFBYUMsY0FBYixFQUFnQztBQUMzRCxVQUFNZixZQUFZLE1BQU1ILGFBQWFtQixnQkFBYixDQUE4Qk4sSUFBOUIsRUFBb0NJLElBQXBDLEVBQTBDQyxjQUExQyxDQUF4QjtBQUNBWixZQUFRQyxHQUFSLENBQVksbUNBQW1DSixTQUEvQztBQUNBLFdBQU9BLFNBQVA7QUFDRCxHQUpZOztBQUFBO0FBQUE7QUFBQTtBQUFBLElBQU4iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBidXNJbnRlcmZhY2UgZnJvbSAnLi9idXNJbnRlcmZhY2UnO1xuLy9pbXBvcnQgKiBhcyB1c2VyRGlyZWN0b3J5SW50ZXJmYWNlIGZyb20gJy4vdXNlckRpcmVjdG9yeUludGVyZmFjZSc7XG5cbi8vIFdhaXQgZm9yIGFsbCBldmVudC5cbmJ1c0ludGVyZmFjZS5ldmVudC5vbignc3VjY2VzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIC8vIEdldCByZXF1ZXN0SWQgZnJvbSBldmVudFxuICBjb25zdCByZXF1ZXN0SWQgPSBldmVudC5yZXF1ZXN0SWQ7XG4gIGNvbnN0IHJlc3VsdENvZGUgPSBldmVudC5yZXN1bHRDb2RlO1xuICBjb25zdCByZXN1bHRNc2cgPSBldmVudC5yZXN1bHRNc2c7XG5cbiAgY29uc29sZS5sb2coXCJBdXRoZW50aWNhdGlvbiBzdWNjZXNzXCIpO1xuICBjb25zb2xlLmxvZyhcInJlcXVlc3QgaWQ6IFwiICsgcmVxdWVzdElkICsgXCIsIGNvZGU6IFwiICsgcmVzdWx0Q29kZSArIFwiLCBtc2c6IFwiICsgcmVzdWx0TXNnKTtcbn0pO1xuXG5idXNJbnRlcmZhY2UuZXZlbnQub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyb3IpIHtcbiAgY29uc3QgcmVxdWVzdElkID0gZXJyb3IucmVxdWVzdElkO1xuICBjb25zdCBlcnJvckNvZGUgPSBlcnJvci5jb2RlO1xuICBjb25zdCBlcnJvck1zZyA9IGVycm9yLm1lc3NhZ2U7XG5cbiAgY29uc29sZS5lcnJvcihcIkVycm9yIHJlcXVlc3QgaWQ6IFwiICsgcmVxdWVzdElkICsgXCIsIGNvZGU6IFwiICsgXG4gICAgICBlcnJvckNvZGUgKyBcIiwgbXNnOiBcIiArIGVycm9yTXNnKTtcbn0pO1xuXG5jb25zdCB1c2VyID0ge1xuICBpZDogJzExMDAwMjMxNDUyNjgnLFxuICBuYW1lc3BhY2U6ICdjaWQnXG59XG5cbmV4cG9ydCBjb25zdCByZXF1ZXN0QXV0aGVuID0gYXN5bmMgKGlkcHMsIGhpZGVTb3VyY2VScElkKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3RJZCA9IGF3YWl0IGJ1c0ludGVyZmFjZS5jcmVhdGVJZHBSZXF1ZXN0KHVzZXIsIGlkcHMsIGhpZGVTb3VyY2VScElkKTtcbiAgY29uc29sZS5sb2coXCJSZXF1ZXN0IHNlbnQgd2l0aCByZXF1ZXN0IElEOiBcIiArIHJlcXVlc3RJZCk7XG4gIHJldHVybiByZXF1ZXN0SWQ7XG59O1xuIl19