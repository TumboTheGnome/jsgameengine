class Entity{
    constructor(pos, parent){
        this.Position = pos;
        this.Tags = [];
        this.Renderer = new Renderer(this);
        gameEngine.Entities.push(this);
        this.OnUpdate = null;
        this.Parent = parent;
    }

    Update()
    {
        if(this.OnUpdate !== null)
        {
            this.OnUpdate();
        }

        this.Renderer.Render();
    }
}