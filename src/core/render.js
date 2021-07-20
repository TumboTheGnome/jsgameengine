
class Sprite{
    constructor(source, top, width, height, scale){
        this.source = source;
        this.top = top;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.animator = null;
    }

    SetAnimator(animator){
        this.animator = animator;
    }

    Update(){
        if(this.animator !== null)
        {
            this.animator(this);
        }
    }
}

class Renderer{

    constructor(entity){
        this.entity = entity;
        this.sprite = null;
        this.color = null;
    }

    SetSprite(sprite){
        this.sprite = sprite;
        return this;
    }

    SetColor(color){
        this.color = color;
    }

    Render(gameContext){
        var ctx = gameEngine.Context;
    
        if(this.color != null){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.entity.Position.x - gameEngine.TileSize.x/2, this.entity.Position.y - gameEngine.TileSize.y/2, gameEngine.TileSize.x, gameEngine.TileSize.y);
        }

        if(this.sprite != null){
            this.sprite.Update();
            ctx.drawImage(this.sprite.source, this.sprite.top.x, this.sprite.top.y, this.sprite.width, this.sprite.height, this.entity.Position.x - this.sprite.scale.x/2, this.entity.Position.y - this.sprite.scale.y/2, this.sprite.scale.x, this.sprite.scale.y);
        }
    }
}


    