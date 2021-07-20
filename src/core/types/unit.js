
class Unit{
    constructor(name, pos, speed){
        this.Id = gameEngine.GetUniqueId();
        this.Name = name;
        this.Entity = new Entity(pos, this);
        this.Destination = null;
        this.Speed = speed;
        this.Collider = gameEngine.Physics.RegisterCollider(this.Entity, gameEngine.TileSize.x, gameEngine.TileSize.y);
        this.TestingPoint = null;
        var self = this;

        this.Entity.OnUpdate = function(){ self.Update(self)};        
    }

    Update(unit){
        if (unit.Destination !== null) {
            
            var distance = unit.Entity.Position.distance(unit.Destination);
            var direction = unit.Entity.Position.direction(unit.Destination);

var point = unit.Entity.Position.projectPoint(direction, this.Collider.RadiusLength);

this.TestingPoint = [];
           
            this.TestingPoint.push(point);

            var upComingCollisions = gameEngine.Physics.GetCollisionsForPoint(this.TestingPoint, this.Collider.Id);
/*
            if(upComingCollisions.length !== 0)
            {*/
                
                var upPoint = unit.Entity.Position.projectPoint(direction.shift(vector2(1.5, 1.5)), this.Collider.RadiusLength);
                this.TestingPoint.push(upPoint);
                var upCollissions = gameEngine.Physics.GetCollisionsForPoint(upPoint);

                var downPoint = unit.Entity.Position.projectPoint(direction.shift(vector2(1.5, -1.5)), this.Collider.RadiusLength);
                
                this.TestingPoint.push(downPoint);
                var downCollisions = gameEngine.Physics.GetCollisionsForPoint(downPoint);                
           // }

            var collisions = gameEngine.Physics.GetCollisionsForCollider(this.Collider);
           
            

            if(collisions.length === 0 && upComingCollisions.length === 0) {
                
                
                var propPos = vector2(
                    unit.Entity.Position.x + clamp(
                        () =>{ return distance > 1}, 
                        direction.flatNormal().x * unit.Speed, 
                        direction.x * unit.Speed), 
                    unit.Entity.Position.y + clamp(
                        () => {return distance > 1}, 
                        direction.flatNormal().y * unit.Speed, 
                        direction.y * unit.Speed * distance));

                if (propPos.x <= gameEngine.Size.x && propPos.x >= 0 && propPos.y <= gameEngine.Size.y && propPos.y >= 0) {

                    //myGameArea.grid[this.position.y][this.position.x] = null;
                    //myGameArea.grid[propPos.y][propPos.x] = this;
                    unit.Entity.Position = propPos;
                }

            }
            else {
               //console.log('Collisions', collisions);
            }
        }
    }
}