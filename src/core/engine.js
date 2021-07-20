class GameEngine {

    constructor() {
        this.Size = vector2(1024, 768);
        this.TileSize = vector2(20, 20);
        this.Entities = [];
        this.Spawner = [];
        this.background = document.getElementById('background');
        this.Physics = new CollisionSystem();
        this.Input = new InputHandler(this);
        this.Pause = false;

        this.Canvas = document.createElement("canvas");
        this.Canvas.setAttribute('oncontextmenu', 'return false;')
        this.Canvas.width = this.Size.x;
        this.Canvas.height = this.Size.y;
        this.Context = this.Canvas.getContext("2d");

        this.id = 0;
        document.body.appendChild(this.Canvas);
    }

    Update() {
        if(!this.Pause){
            this.Context.clearRect(0, 0, this.Size.x, this.Size.y);
            this.Context.drawImage(this.background, 25, 350, 500, 500, 0, 0, this.Size.x, this.Size.y, this.Size.x * 1000, this.Size.y * 1000);
            this.Entities.forEach(function(entry){
                entry.Update();

                if(entry.Parent.TestingPoint != null){
                    gameEngine.Context.fillStyle = 'red';
                    entry.Parent.TestingPoint.forEach(function(point){
                        gameEngine.Context.fillRect(point.x -2, point.y -2, 4, 4);
                    });
                    gameEngine.Context.fillRect(entry.Parent.TestingPoint.x -2, entry.Parent.TestingPoint.y -2, 4, 4);
                    gameEngine.Context.fillRect(entry.Position.x -2, entry.Position.y -2,4, 4);
                }

                
                entry.Parent.TestingPoint
            });
        }
    }

    GetUniqueId(){
        let id = this.id;
        this.id++;
        return id;
    }
}

const gameEngine = new GameEngine();