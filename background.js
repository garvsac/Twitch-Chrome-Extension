  chrome.runtime.onInstalled.addListener(function() {
    console.log("bg.js")
  });

  fetch('https://api.twitch.tv/helix/streams?user_login=justcooman&user_login=gorgc&user_login=masondota2', {
      headers: {
          'client-id': 'wkx1l5vtmsi33feoavz1xu0q17861g'
      }
  }).then(resp => {
      return resp.json()
  }).then(resp => {
      console.log(resp)
  }).catch(err => {
      console.log(err)
  });
