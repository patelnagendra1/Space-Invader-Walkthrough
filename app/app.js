

	document.addEventListener('DOMContentLoaded',()=>{
	// querysellectorAll function return array 
	const squares = document.querySelectorAll('.grid div')
	//query sellector function return element 
	const resultDisplay = document.querySelector('#result')
	let width= 15
	let currentShooterIndex = 220
	let currnetInvaderIndex = 1
	let alienInvasersTakenDowen = []
	let result = 0
	let direction = 1
	let invaderId

	const alienInvaderes = [
	0,1,2,3,4,5,6,7,8,9,
	15,16,17,18,19,20,21,22,23,24,
	30,31,32,33,34,35,36,37,38,39
	] 

	// Draw alien invader.....classList.add add css class 
	alienInvaderes.forEach(i => squares[currnetInvaderIndex + i].classList.add('invader'))

	// Draw the shooter
	squares[currentShooterIndex].classList.add('shooter')

	// //move shooter along line
	function moveShooter(e){
		squares[currentShooterIndex].classList.remove('shooter')
		switch(e.keyCode){
			case 37:
			
				if(currentShooterIndex % width !==0)
					currentShooterIndex-=1
				break
			
			case 39:
			
				if(currentShooterIndex % width < width-1)
					currentShooterIndex+=1
				break
			
		}

		squares[currentShooterIndex].classList.add('shooter')

	}



// var parent = document.querySelector('.game-over')



// move invader

	function moveInvader(){
		const leftEdge = alienInvaderes[0]%width === 0
		const rightEdge = alienInvaderes[alienInvaderes.length-1]%width === width-1

		if((leftEdge && direction === -1) || (rightEdge && direction === 1))
			direction = width
		else if(direction == width){
			if(leftEdge)
				direction = 1
			else
				direction = -1
		}

		for(let i = 0;i < alienInvaderes.length;i++)
			squares[alienInvaderes[i]].classList.remove('invader')

		for(let i = 0;i < alienInvaderes.length;i++)
			alienInvaderes[i]+=direction

		for(let i = 0;i < alienInvaderes.length;i++)
		{
			if(!alienInvasersTakenDowen.includes(i))
			squares[alienInvaderes[i]].classList.add('invader')
		}

		//Game over
		if(squares[currentShooterIndex].classList.contains('invader','shooter'))
		{
			resultDisplay.textContent = "Game Over"
			squares[currentShooterIndex].classList.add('boom')
			clearInterval(invaderId)
			document.querySelector('.game-over').style.display="block"
			
		}

		for(let i = 0; i < alienInvaderes.length;i++)
		{
			if(alienInvaderes[i] > (squares.length-(width-1)))
			{
				squares[currentShooterIndex].classList.add('boom')
				//resultDisplay.textContent = "Game Over"
				clearInterval(invaderId)
				document.querySelector('.game-over').style.display="block"
				
			}
			
		}			

		// Decide win
		if(alienInvasersTakenDowen.length === alienInvaderes.length){
			document.querySelector('.game-win').style.display="block"
			
			clearInterval(invaderId)
		}
	}
	
	// shoot alian 
	function shoot(e){
		let laserId
		let currentLaserIndex = currentShooterIndex

		//move laser from shooter to alien 
		function moveLaser(){
			squares[currentLaserIndex].classList.remove('laser')
			currentLaserIndex-=width
			squares[currentLaserIndex].classList.add('laser')
			if(squares[currentLaserIndex].classList.contains('invader')){
				squares[currentLaserIndex].classList.remove('laser')
				squares[currentLaserIndex].classList.remove('invader')
				squares[currentLaserIndex].classList.add('boom')
 
				setTimeout(() => squares[currentLaserIndex].classList.remove('boom'),250)
				clearInterval(laserId)

				const alienTakenDowen = alienInvaderes.indexOf(currentLaserIndex)
				alienInvasersTakenDowen.push(alienTakenDowen)
				result++
				resultDisplay.textContent = result

			}

			if(currentLaserIndex < width)
			{
				clearInterval(laserId)
				setTimeout(() => squares[currentLaserIndex].classList.remove('laser'),100)

			}



		} 
		switch(e.keyCode){
				case 32:
				laserId = setInterval(moveLaser,100)
				break
			}
	}


// start the game
var count=1;
var btn=document.querySelector('.button');
btn.addEventListener('click',start);

function start()
{
	
	if(count==1)
	{
		document.addEventListener('keyup',shoot)
		document.addEventListener('keydown',moveShooter)
		invaderId = setInterval(moveInvader,300)
		count++;
	}
}

	
})


