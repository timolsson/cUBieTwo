var context, playerOne, controller, platforms, winCondition, goal, loop;

context = document.getElementById('myCanvas').getContext('2d');
winCondition = document.getElementById('winCondition');

context.canvas.height = 1000;
context.canvas.width = 2000;


playerOne = { //Size of player and start position
    height: 25,
    width: 25,
    isOnGround: true,
    isJumping: false,
    positionX: /*(context.canvas.width - 25) / 2*/ 150,
    velocityX: 0,
    positionY: /*context.canvas.height - 25*/350,
    velocityY: 0,
};

platforms = [{ //new and improved platfrom structure
    height: 20,    // STARTING PLATFORM
    width: 100,
    positionX: 70,
    positionY: 400,
},
{
    height: 20,
    width: 100,
    positionX: 1850,
    positionY: 750,
},
{
    height: 20,
    width: 100,
    positionX: 1550,
    positionY: 650,
},
{
    height: 20,
    width: 50,
    positionX: 1750,
    positionY: 650,
},
{
    height: 20,
    width: 100,
    positionX: 1350,
    positionY: 730,
},
{
    height: 20,
    width: 100,
    positionX: 1150,
    positionY: 630,
},
redPortal = { //redPortal platform
    height: 20,
    width: 20,
    positionX: 300,
    positionY: 800,
},

bluePortal = { //bluePortal platform
    height: 20,
    width: 20,
    positionX: 1000,
    positionY: 600,
},
windTunnel = {  //windTunnel platform
    height: 20,
    width: 150,
    positionX: 690,
    positionY: 770,
},
// UPPER LEVEL
{
    height: 20,
    width: 200,
    positionX: 1600,
    positionY: 180,
},
{
    height: 20,
    width: 100,
    positionX: 1400,
    positionY: 290,
},
{
    height: 20,
    width: 100,
    positionX: 1200,
    positionY: 230,
},

{
    height: 20,
    width: context.canvas.width,
    positionX: (context.canvas.width - context.canvas.width) / 2,
    positionY: context.canvas.height -10, 
}];

goal = { //goal size and position
    height: 20,
    width: 100,
    positionX: 650,
    positionY: 300,
};

controller = {  //Controlles for the player
    left: false,
    right: false,
    up: false,
    down: false,
    keyListner: function (event) {
        var keyState = (event.type == 'keydown') ? true : false; //cheacks if it is keydown or not
        switch (event.keyCode) {
            case 39:
                controller.right = keyState;
                break;
            case 37:
                controller.left = keyState;
                break;
            case 38:
                controller.up = keyState;
                break;
        }
    }
};
loop = function () {
    playerOne.velocityY *= 0.9; //friction
    playerOne.velocityX *= 0.9;

    if (controller.up && playerOne.isOnGround == true && playerOne.isJumping == false) { //set speed of which object will move in.
        playerOne.velocityY -= 30;
        playerOne.isOnGround = false;
    }
    else if (controller.right) {
        playerOne.velocityX += 1;
    }
    else if (controller.left) {
        playerOne.velocityX -= 1;
    };

    if (playerOne.velocityX < -4) { //max velocity
        playerOne.velocityX = -4;
    }
    if (playerOne.velocityX > 4) {
        playerOne.velocityX = 4;
    }
    if (playerOne.velocityY <= -30) {
        playerOne.velocityY = -30;
    }
    if (playerOne.velocityY > 8) {
        playerOne.velocityY = 8;
    }

    playerOne.isOnGround = false; //allways assum that player is not on the ground
    

    if (playerOne.positionY > context.canvas.height - 25) { //collision with floor
        //playerOne.positionY = context.canvas.height - 25; //this causes the shaking but removing this makes it not possible to jump on the floor.
        playerOne.isOnGround = true;
        playerOne.isJumping = false;
    } else if (playerOne.positionY < 0) { //collision with roof
        playerOne.velocityY = 1;
    } else if (playerOne.positionX > context.canvas.width - 25) { //collision with right wall. player reapers on opposite side
        playerOne.positionX = 0;
    } else if (playerOne.positionX < 0) { //collision with left wall. player reapers on opposite side
        playerOne.positionX = context.canvas.width - 25;
    }
    

    for (let i = 0; i < platforms.length; i++) { //new and improved platfrom collision
        const platform = platforms[i];

        if (playerOne.positionX + playerOne.width > platform.positionX && playerOne.positionX < platform.positionX + platform.width) {
            
            // Topside
            if (playerOne.positionY + playerOne.height + 4 > platform.positionY && playerOne.positionY + playerOne.height < platform.positionY + platform.height) {
                playerOne.isOnGround = true;
                if (controller.up && playerOne.isOnGround == true && playerOne.isJumping == false) { //set speed of which object will move in.
                    playerOne.velocityY -= 30;
                    playerOne.isOnGround = false;
                }
            };

            // Underside
            if (playerOne.positionY - 1 < platform.positionY + platform.height && playerOne.positionY > platform.positionY) {
                playerOne.velocityY = 0;
                playerOne.isOnGround = false;
            };

        }
    }
    
    
    //Goal platfrom
    if (playerOne.positionX + playerOne.width > goal.positionX && playerOne.positionX < goal.positionX + goal.width && 
    playerOne.positionY > goal.positionY - playerOne.height && playerOne.positionY < goal.positionY + goal.height) {
        playerOne.isOnGround = true;
        winCondition.style.left = '40%';
    }
    
    //bluePortal platfrom
    if (playerOne.positionX + playerOne.width > bluePortal.positionX && playerOne.positionX < bluePortal.positionX + bluePortal.width &&
        playerOne.positionY > bluePortal.positionY - playerOne.height && playerOne.positionY < bluePortal.positionY + bluePortal.height) {
        playerOne.positionX = 1680;
        playerOne.positionY = 10;
    }

    //redPortal platfrom
    if (playerOne.positionX + playerOne.width > redPortal.positionX && playerOne.positionX < redPortal.positionX + redPortal.width &&
        playerOne.positionY > redPortal.positionY - playerOne.height && playerOne.positionY < redPortal.positionY + redPortal.height) {
        playerOne.positionX = 150;
        playerOne.positionY = 350;
    }

    //onground function
    if (!playerOne.isOnGround) { //gravity
        playerOne.velocityY += 1.5;
        playerOne.isJumping = true;
        console.log('Ground false');
    } else {
        playerOne.velocityY = 0;
        playerOne.isJumping = false;
        console.log('Ground true');
    }

    playerOne.positionX += playerOne.velocityX; //transfroms the speed to position.
    playerOne.positionY += playerOne.velocityY;

    //windTunnel start
    if (playerOne.positionX > 765 && playerOne.positionX < 800 && playerOne.positionY < 780) {
        playerOne.velocityY = -3;
    };
    //windTunnel end

    context.fillStyle = 'black';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height); //x, y, w, h
    context.fillStyle = 'white';
    context.beginPath();
    //drawing the player
    context.fillRect(playerOne.positionX, playerOne.positionY, playerOne.width, playerOne.height);

    //drawing the platforms
    for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        context.fillStyle="salmon";
        context.fillRect(platform.positionX, platform.positionY, platform.width, platform.height);
    };

    //drawing the bluePortal
    context.fillStyle = 'blue'; bluePortal
    context.fillRect(bluePortal.positionX, bluePortal.positionY, bluePortal.width, bluePortal.height);

     //drawing the redPortal
     context.fillStyle = 'red'; redPortal
     context.fillRect(redPortal.positionX, redPortal.positionY, redPortal.width, redPortal.height);

    //drawing the Windtunnel
    context.fillStyle = 'purple'; windTunnel
    context.fillRect(windTunnel.positionX, windTunnel.positionY, windTunnel.width, windTunnel.height);

    //drawing the goal
    context.fillStyle ='mediumspringgreen';
    context.fillRect(goal.positionX, goal.positionY, goal.width, goal.height);
    
    window.requestAnimationFrame(loop);
    
};
window.addEventListener('keydown', controller.keyListner);
window.addEventListener('keyup', controller.keyListner);

window.requestAnimationFrame(loop);
