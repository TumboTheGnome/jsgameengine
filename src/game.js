var spritesheet = document.getElementById('spritesheet');



gameEngine.TileSize.x = 50;
gameEngine.TileSize.y = 50;
gameEngine.Spawner.push(vector2(100, 100));
gameEngine.Spawner.push(vector2(400, 400));

var target = new Unit('target', gameEngine.Spawner[1], 20);
target.Collider.Height = gameEngine.TileSize.y;
target.Collider.Width = gameEngine.TileSize.x;
target.Entity.Renderer.SetSprite(new Sprite(spritesheet, vector2(30, 10), 70, 151, vector2(gameEngine.TileSize.x, gameEngine.TileSize.y)));


var planner = new Unit('planner', gameEngine.Spawner[0], 20);
planner.Collider.Height = gameEngine.TileSize.y;
planner.Collider.Width = gameEngine.TileSize.x;
planner.Entity.Renderer.SetColor('green');
planner.Entity.Renderer.SetSprite(new Sprite(spritesheet, vector2(30, 10), 70, 151, vector2(gameEngine.TileSize.x, gameEngine.TileSize.y)));


//planner.Destination = target.Entity.Position;




let selectedUnit = null;


gameEngine.Input.onLeftClick(function(event, pos){
    
    var result = gameEngine.Physics.GetCollisionsForPoint(pos);

    if(result.length > 0)
    {
        if(selectedUnit !== null)
        {
            selectedUnit.Entity.Renderer.SetColor(null);
            selectedUnit = null;
        }

        selectedUnit = result[0].Entity.Parent;
        selectedUnit.Entity.Renderer.SetColor('blue');
    }
    else if(selectedUnit !== null){
        selectedUnit.Entity.Renderer.SetColor(null);
        selectedUnit = null;
    }
});

gameEngine.Input.onRightClick(function(event, pos){
    if(selectedUnit !== null)
    {
        selectedUnit.Destination = pos;
    }
});

//gameEngine.Update();
setInterval(function () { gameEngine.Update(); }, 100);

window.addEventListener('keypress', function(event){
    if(event.key === 'q')
    {
        gameEngine.Pause = !gameEngine.Pause;
    }
})