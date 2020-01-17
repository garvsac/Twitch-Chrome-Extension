javascript:(
	function(){
		
		let name = document.getElementsByClassName('text-fragment');
		let emote = document.getElementsByClassName('chat-image');
		let x;
		for(let x=0;x<name.length; x++)
			{
				console.log(emote[x]);
				name[x].innerHTML = 'weebs';
			}
		for(let y=0;y<emote.length; y++)
			{
				console.log(emote[y]);
				emote[y].src = '//cdn.frankerfacez.com/f1/09/f109c812f9dac7d0af39473b3039c0ac.PNG';
				emote[y].srcset = '//cdn.frankerfacez.com/f1/09/f109c812f9dac7d0af39473b3039c0ac.PNG';
			}
		}
		)();
