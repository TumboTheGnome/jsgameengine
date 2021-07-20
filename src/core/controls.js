class InputHandler
{
    constructor(gameEngine){
          
        this.onLeftClick = function(handler){
            gameEngine.Canvas.addEventListener('mousedown', function(event){  
                if(event.button === 0){              
                    const rect = gameEngine.Canvas.getBoundingClientRect();
                    const x = event.clientX - rect.left
                    const y = event.clientY - rect.top
                    handler(event, new vector2(x, y));
                }
            });
        }

        this.onRightClick = function(handler){
            gameEngine.Canvas.addEventListener('mousedown', function(event){  
                if(event.button === 2){
                    const rect = gameEngine.Canvas.getBoundingClientRect();
                    const x = event.clientX - rect.left
                    const y = event.clientY - rect.top
                    handler(event, new vector2(x, y));
                }
            });
        }
    }
}
