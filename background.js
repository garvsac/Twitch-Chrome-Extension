chrome.runtime.onInstalled.addListener(function() {
  console.log("bg.js")
});

clientid = "wkx1l5vtmsi33feoavz1xu0q17861g";
url = "https://ptsv2.com/t/r8zkh-1579820545/post";
follows_api = "https://api.twitch.tv/helix/users/follows?from_id=";
userID_api = "https://api.twitch.tv/helix/users?login=";
//https://api.twitch.tv/helix/streams?user_login=justcooman&user_login=gorgc'
//fetch( url , {method: "POST", body: JSON.stringify(resp[0])});

function getID(username) {
  let answer =  fetch( userID_api + username, { headers: { 'client-id': clientid}})
  .then(resp => resp.json())
  .then(val => {
    return val.data[0].id;
  })
  return answer;
}

async function getFollows(username) {
  let userID = await getID(username);
  let answer =  fetch( follows_api + userID, { headers: { 'client-id': clientid}})
  .then(resp => resp.json())
  .then(val => {
    return val.data;
  })
  return answer;
}

async function getFollowsStatus(username){
  let channels = await getFollows(username);
  for ( channel of channels)
    {
      console.log(channel)
    }
    return channels
}
//fetch( url , {method: "POST", body: JSON.stringify(getFollows("gorgc"))});
getFollowsStatus("gorgc")
.then(resp => {
  console.log(resp);

});
