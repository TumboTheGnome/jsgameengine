
class BoundingBox{
    constructor(id, top, bottom){
        this.Id = id;
        this.Top = top;
        this.Bottom = bottom;
    }

    Contains(point){
        let a = this.Top.x < point.x;
        let b = this.Top.y < point.y;
        let c = this.Bottom.x > point.x;
        let d = this.Bottom.y > point.y;
        return a&b&c&d;
    }

    get Corners(){
        return [
            vector2(this.Top.x, this.Top.y),
            vector2(this.Top.x, this.Bottom.y),
            vector2(this.Bottom.x, this.Bottom.y),
            vector2(this.Bottom.x, this.Top.y)
        ]
    }
}

class Collider {
    constructor(id, entity, height, width) {
        this.Id = id;
        this.Entity = entity;
        this.Height = height;
        this.Width = width;
        this.Tags = [];
    }

    get RadiusLength(){
        return Math.sqrt(Math.pow(this.Height,2) + Math.pow(this.Width,2));
    }

    IsColliding(collider) {

        let myBounds = collider.Bounds;        
        let isContained = false;
        let points = this.Bounds.Corners;
        for(var index = 0; index < points.length; index++)
        {
            let point = points[index];
            let contains = myBounds.Contains(point);

            if(contains)
            {
                isContained = contains;
                break;
            }
        }

        return isContained;
    }


    get Bounds() {
        return new BoundingBox(
            this.Id,
            vector2(this.Entity.Position.x - this.Width/2, this.Entity.Position.y - this.Height/2),
            vector2(this.Entity.Position.x + this.Width/2, this.Entity.Position.y + this.Height/2));
    }
}


class CollisionSystem {
    constructor() {
        this.colliders = [];
        this.index = 0;
    }

    RegisterCollider(entity, height, width) {
        let collider = new Collider(this.index, entity, height, width);
        this.colliders.push(collider);
        this.index++;
        return collider;
    }

    RemoveCollider(id){
        let index = this.colliders.findIndex(function(value){
            return value.Id === id;
        });

        if(index !== -1){
            this.colliders.splice(index, 1);
        }
    }

    GetCollisionsForCollider(collider) {
        let result = [];
        this.colliders.forEach(function (entry) {
            if (entry.Id !== collider.Id) {
                if (collider.IsColliding(entry)) {
                    result.push(entry);
                }
            }
        })

        return result;
    }

    GetCollisionsForPoint(point, id) {

        return this.GetCollisionsForCollider(new Collider(id, {
            Position:point
        }, 0,0));

    }
}