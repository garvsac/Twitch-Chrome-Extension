chrome.runtime.onInstalled.addListener(function() {
  console.log("bg.js")
});

clientid = "wkx1l5vtmsi33feoavz1xu0q17861g";
url = "https://ptsv2.com/t/r8zkh-1579820545/post";
follows_api = "https://api.twitch.tv/helix/users/follows?from_id=";
userID_api = "https://api.twitch.tv/helix/users?login=";
streamdata_api = "https://api.twitch.tv/helix/streams?user_login=";
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
  //not all follows returned use cursor fix
  .then(resp => resp.json())
  .then(channels => {
    data = channels.data
    for ( var i = 0; i < data.length; i++)
      {
        data[i] = data[i].to_name
      }
    return data;
  })
  return answer;
}

async function getFollowsStatus(username){
  let channels = await getFollows(username);
  let answer = [];
  var i=0;
  for ( channel of channels )
  {
    x =  await fetch( streamdata_api + channel, { headers: { 'client-id': clientid }})
    .then(resp => resp.json())
    .then(resp => resp.data);
    console.log(x)
    if(x.length>0)
    {
      answer[i] = x[0];
      i++;
    }
  }
  return answer;
}
//fetch( url , {method: "POST", body: JSON.stringify(getFollows("gorgc"))});
getFollowsStatus("shroud")
.then(resp => {
  console.log("end")
  console.log(resp);

})
.catch( err => console.log (err));
