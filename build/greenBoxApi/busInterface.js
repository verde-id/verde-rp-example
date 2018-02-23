'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIdpRequest = exports.event = undefined;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _interface_lib = require('verde-ethereum/build/lib/interface_lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const event = exports.event = new _events2.default();

//const RP_ID = process.env.RP_ID || 1;

// TO-DO
// interface with bus/blockchain

function handleApprove(argsObject) {
  //console.log('approve',argsObject);
  event.emit('approve', argsObject);
}

function handleDeny(argsObject) {
  //console.log('deny',argsObject);
  event.emit('deny', argsObject);
}

function handleAuthenFail(requestId) {
  event.emit('error', {
    requestId: requestId
  });
}

function handleAuthenSuccess(requestId) {
  event.emit('success', {
    requestId: requestId
  });
}

const createIdpRequest = exports.createIdpRequest = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (user, idps, hideSourceRpId = false) {
    let userAddress = yield _interface_lib.rpInterface.findUserAddress(user.namespace, user.id);
    let requestId = yield _interface_lib.rpInterface.createRequest({
      userAddress: userAddress,
      requestText: 'Mockup request details'
    });

    if (!requestId) {
      console.error("Cannot create request");
      return;
    }
    /*ipc.of.bus.emit('createRequest',{
      userId: user.id,
      requestId: requestId,
      rpId: hideSourceRpId ? null : RP_ID,
      // data: user,
    });*/

    _interface_lib.rpInterface.watchAuthenticationEvent(requestId, function (error, argsObject) {
      if (error) console.error('error:', error);
      //TODO check whether approve or denied
      //if(argsObject.code === 'true') handleApprove(argsObject);
      //else handleDeny(argsObject);
      handleAuthenSuccess(argsObject.requestContract);
    });

    return requestId;
  });

  return function createIdpRequest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

_interface_lib.rpInterface.watchIDPResponseEvent(function (error, argsObject) {
  if (error) console.error('error:', error);
  argsObject.requestId = argsObject.requestID;
  delete argsObject.requestID;

  //check whether approve or denied
  if (Number(argsObject.code) == 0) handleApprove(argsObject);else handleDeny(argsObject);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmVlbkJveEFwaS9idXNJbnRlcmZhY2UuanMiXSwibmFtZXMiOlsiZXZlbnQiLCJoYW5kbGVBcHByb3ZlIiwiYXJnc09iamVjdCIsImVtaXQiLCJoYW5kbGVEZW55IiwiaGFuZGxlQXV0aGVuRmFpbCIsInJlcXVlc3RJZCIsImhhbmRsZUF1dGhlblN1Y2Nlc3MiLCJjcmVhdGVJZHBSZXF1ZXN0IiwidXNlciIsImlkcHMiLCJoaWRlU291cmNlUnBJZCIsInVzZXJBZGRyZXNzIiwiZmluZFVzZXJBZGRyZXNzIiwibmFtZXNwYWNlIiwiaWQiLCJjcmVhdGVSZXF1ZXN0IiwicmVxdWVzdFRleHQiLCJjb25zb2xlIiwiZXJyb3IiLCJ3YXRjaEF1dGhlbnRpY2F0aW9uRXZlbnQiLCJyZXF1ZXN0Q29udHJhY3QiLCJ3YXRjaElEUFJlc3BvbnNlRXZlbnQiLCJyZXF1ZXN0SUQiLCJOdW1iZXIiLCJjb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFTyxNQUFNQSx3QkFBUSxzQkFBZDs7QUFFUDs7QUFFQTtBQUNBOztBQUVBLFNBQVNDLGFBQVQsQ0FBdUJDLFVBQXZCLEVBQW1DO0FBQ2pDO0FBQ0FGLFFBQU1HLElBQU4sQ0FBVyxTQUFYLEVBQXNCRCxVQUF0QjtBQUNEOztBQUVELFNBQVNFLFVBQVQsQ0FBb0JGLFVBQXBCLEVBQWdDO0FBQzlCO0FBQ0FGLFFBQU1HLElBQU4sQ0FBVyxNQUFYLEVBQW1CRCxVQUFuQjtBQUNEOztBQUVELFNBQVNHLGdCQUFULENBQTBCQyxTQUExQixFQUFxQztBQUNuQ04sUUFBTUcsSUFBTixDQUFXLE9BQVgsRUFBb0I7QUFDbEJHLGVBQVdBO0FBRE8sR0FBcEI7QUFHRDs7QUFFRCxTQUFTQyxtQkFBVCxDQUE2QkQsU0FBN0IsRUFBd0M7QUFDdENOLFFBQU1HLElBQU4sQ0FBVyxTQUFYLEVBQXNCO0FBQ3BCRyxlQUFXQTtBQURTLEdBQXRCO0FBR0Q7O0FBRU0sTUFBTUU7QUFBQSw2Q0FBbUIsV0FBT0MsSUFBUCxFQUFhQyxJQUFiLEVBQW1CQyxpQkFBaUIsS0FBcEMsRUFBOEM7QUFDNUUsUUFBSUMsY0FBYyxNQUFNLDJCQUFZQyxlQUFaLENBQTRCSixLQUFLSyxTQUFqQyxFQUEyQ0wsS0FBS00sRUFBaEQsQ0FBeEI7QUFDQSxRQUFJVCxZQUFZLE1BQU0sMkJBQVlVLGFBQVosQ0FBMEI7QUFDOUNKLG1CQUFhQSxXQURpQztBQUU5Q0ssbUJBQWE7QUFGaUMsS0FBMUIsQ0FBdEI7O0FBS0EsUUFBRyxDQUFDWCxTQUFKLEVBQWU7QUFDYlksY0FBUUMsS0FBUixDQUFjLHVCQUFkO0FBQ0E7QUFDRDtBQUNEOzs7Ozs7O0FBT0EsK0JBQVlDLHdCQUFaLENBQXFDZCxTQUFyQyxFQUErQyxVQUFTYSxLQUFULEVBQWdCakIsVUFBaEIsRUFBNEI7QUFDekUsVUFBR2lCLEtBQUgsRUFBVUQsUUFBUUMsS0FBUixDQUFjLFFBQWQsRUFBdUJBLEtBQXZCO0FBQ1Y7QUFDQTtBQUNBO0FBQ0FaLDBCQUFvQkwsV0FBV21CLGVBQS9CO0FBQ0QsS0FORDs7QUFRQSxXQUFPZixTQUFQO0FBQ0QsR0EzQlk7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTjs7QUE2QlAsMkJBQVlnQixxQkFBWixDQUFrQyxVQUFTSCxLQUFULEVBQWdCakIsVUFBaEIsRUFBNEI7QUFDNUQsTUFBR2lCLEtBQUgsRUFBVUQsUUFBUUMsS0FBUixDQUFjLFFBQWQsRUFBdUJBLEtBQXZCO0FBQ1ZqQixhQUFXSSxTQUFYLEdBQXVCSixXQUFXcUIsU0FBbEM7QUFDQSxTQUFPckIsV0FBV3FCLFNBQWxCOztBQUVBO0FBQ0EsTUFBR0MsT0FBT3RCLFdBQVd1QixJQUFsQixLQUEyQixDQUE5QixFQUFpQ3hCLGNBQWNDLFVBQWQsRUFBakMsS0FDS0UsV0FBV0YsVUFBWDtBQUNOLENBUkQiLCJmaWxlIjoiYnVzSW50ZXJmYWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xuaW1wb3J0IHsgcnBJbnRlcmZhY2UgfSBmcm9tICd2ZXJkZS1ldGhlcmV1bS9idWlsZC9saWIvaW50ZXJmYWNlX2xpYic7XG5cbmV4cG9ydCBjb25zdCBldmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuLy9jb25zdCBSUF9JRCA9IHByb2Nlc3MuZW52LlJQX0lEIHx8IDE7XG5cbi8vIFRPLURPXG4vLyBpbnRlcmZhY2Ugd2l0aCBidXMvYmxvY2tjaGFpblxuXG5mdW5jdGlvbiBoYW5kbGVBcHByb3ZlKGFyZ3NPYmplY3QpIHtcbiAgLy9jb25zb2xlLmxvZygnYXBwcm92ZScsYXJnc09iamVjdCk7XG4gIGV2ZW50LmVtaXQoJ2FwcHJvdmUnLCBhcmdzT2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRGVueShhcmdzT2JqZWN0KSB7XG4gIC8vY29uc29sZS5sb2coJ2RlbnknLGFyZ3NPYmplY3QpO1xuICBldmVudC5lbWl0KCdkZW55JywgYXJnc09iamVjdCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUF1dGhlbkZhaWwocmVxdWVzdElkKSB7XG4gIGV2ZW50LmVtaXQoJ2Vycm9yJywge1xuICAgIHJlcXVlc3RJZDogcmVxdWVzdElkXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVBdXRoZW5TdWNjZXNzKHJlcXVlc3RJZCkge1xuICBldmVudC5lbWl0KCdzdWNjZXNzJywge1xuICAgIHJlcXVlc3RJZDogcmVxdWVzdElkXG4gIH0pO1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlSWRwUmVxdWVzdCA9IGFzeW5jICh1c2VyLCBpZHBzLCBoaWRlU291cmNlUnBJZCA9IGZhbHNlKSA9PiB7XG4gIGxldCB1c2VyQWRkcmVzcyA9IGF3YWl0IHJwSW50ZXJmYWNlLmZpbmRVc2VyQWRkcmVzcyh1c2VyLm5hbWVzcGFjZSx1c2VyLmlkKTtcbiAgbGV0IHJlcXVlc3RJZCA9IGF3YWl0IHJwSW50ZXJmYWNlLmNyZWF0ZVJlcXVlc3Qoe1xuICAgIHVzZXJBZGRyZXNzOiB1c2VyQWRkcmVzcyxcbiAgICByZXF1ZXN0VGV4dDogJ01vY2t1cCByZXF1ZXN0IGRldGFpbHMnXG4gIH0pOyBcblxuICBpZighcmVxdWVzdElkKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCBjcmVhdGUgcmVxdWVzdFwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgLyppcGMub2YuYnVzLmVtaXQoJ2NyZWF0ZVJlcXVlc3QnLHtcbiAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgcmVxdWVzdElkOiByZXF1ZXN0SWQsXG4gICAgcnBJZDogaGlkZVNvdXJjZVJwSWQgPyBudWxsIDogUlBfSUQsXG4gICAgLy8gZGF0YTogdXNlcixcbiAgfSk7Ki9cblxuICBycEludGVyZmFjZS53YXRjaEF1dGhlbnRpY2F0aW9uRXZlbnQocmVxdWVzdElkLGZ1bmN0aW9uKGVycm9yLCBhcmdzT2JqZWN0KSB7XG4gICAgaWYoZXJyb3IpIGNvbnNvbGUuZXJyb3IoJ2Vycm9yOicsZXJyb3IpO1xuICAgIC8vVE9ETyBjaGVjayB3aGV0aGVyIGFwcHJvdmUgb3IgZGVuaWVkXG4gICAgLy9pZihhcmdzT2JqZWN0LmNvZGUgPT09ICd0cnVlJykgaGFuZGxlQXBwcm92ZShhcmdzT2JqZWN0KTtcbiAgICAvL2Vsc2UgaGFuZGxlRGVueShhcmdzT2JqZWN0KTtcbiAgICBoYW5kbGVBdXRoZW5TdWNjZXNzKGFyZ3NPYmplY3QucmVxdWVzdENvbnRyYWN0KVxuICB9KTtcbiAgXG4gIHJldHVybiByZXF1ZXN0SWQ7XG59O1xuXG5ycEludGVyZmFjZS53YXRjaElEUFJlc3BvbnNlRXZlbnQoZnVuY3Rpb24oZXJyb3IsIGFyZ3NPYmplY3QpIHtcbiAgaWYoZXJyb3IpIGNvbnNvbGUuZXJyb3IoJ2Vycm9yOicsZXJyb3IpO1xuICBhcmdzT2JqZWN0LnJlcXVlc3RJZCA9IGFyZ3NPYmplY3QucmVxdWVzdElEO1xuICBkZWxldGUgYXJnc09iamVjdC5yZXF1ZXN0SUQ7XG5cbiAgLy9jaGVjayB3aGV0aGVyIGFwcHJvdmUgb3IgZGVuaWVkXG4gIGlmKE51bWJlcihhcmdzT2JqZWN0LmNvZGUpID09IDApIGhhbmRsZUFwcHJvdmUoYXJnc09iamVjdCk7XG4gIGVsc2UgaGFuZGxlRGVueShhcmdzT2JqZWN0KTtcbn0pO1xuIl19