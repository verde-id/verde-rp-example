import * as busInterface from './busInterface';
//import * as userDirectoryInterface from './userDirectoryInterface';

// Wait for all event.
busInterface.event.on('success', function(event) {
  // Get requestId from event
  const requestId = event.requestId;
  const resultCode = event.resultCode;
  const resultMsg = event.resultMsg;

  console.log("Authentication success");
  console.log("request id: " + requestId + ", code: " + resultCode + ", msg: " + resultMsg);
});

busInterface.event.on('error', function(error) {
  const requestId = error.requestId;
  const errorCode = error.code;
  const errorMsg = error.message;

  console.error("Error request id: " + requestId + ", code: " + 
      errorCode + ", msg: " + errorMsg);
});

const user = {
  id: '1100023145268',
  namespace: 'cid'
}

//===================== API as in whitepaper =================================

export const send_request_to_id_at_idp = async (input) => {
  let { 
    idp_list, identifier = user, request_message, min_loa,
    min_authentication_count, time_out 
  } = input;
  const requestId = await busInterface.createIdpRequest(user, idps, false, request_message);
  console.log("Request sent with request ID: " + requestId);
  return requestId;
};
