

function nodeInsertedCallback(event) {
    let div = event.srcElement;
		let message;
		if(div.className =="chat-line__message")
		{
			//	console.log(div);
			message = div.getElementsByClassName('text-fragment');
			image = div.getElementsByClassName('chat-image');
			for (let y = 0; y < image.length; y++) {
				//image[y].src = '//cdn.frankerfacez.com/f1/09/f109c812f9dac7d0af39473b3039c0ac.PNG';
				//image[y].srcset = '//cdn.frankerfacez.com/f1/09/f109c812f9dac7d0af39473b3039c0ac.PNG';
			}
			//message[0].innerHTML = "BRUH"
		}


};
//shift this to bg script
document.addEventListener('DOMNodeInserted', nodeInsertedCallback);

fetch('https://api.twitch.tv/helix/streams?user_login=justcooman', {
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
