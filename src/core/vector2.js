


function vector2(x, y) {
    return {
        x: x,
        y: y,
        distance: function (pos) {
            return Math.sqrt(Math.pow(pos.x - this.x, 2) + Math.pow(pos.y - this.y, 2));
        },
        direction: function (pos) {
            return vector2(normalize(pos.x - this.x, 'x'), normalize(pos.y - this.y, 'y'));
        },
        flatNormal:function(){
            return vector2(this.x, this.y);//flatten(this.x), flatten(this.y));
        },
        projectPoint:function(dir, length){
            
            var result = vector2(this.x + ((dir.x.toFixed(2) * 10) * length), this.y + ((dir.y.toFixed(2)*10) * length));

            //console.log(angles)
            return result;
        },
        shift:function(factor){
            let signX = this.x/Math.abs(this.x);
            let signY = this.y/Math.abs(this.y);



            return vector2(this.x * factor.x, this.y * factor.y);
        }
    }
}

function calcAngle(a, b, c){
    return  Math.acos((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a,2))/(2*b*c))

}

function clamp(check, a, b){
    return check()?a:b;
}

function flatten(value){
    if(value > 0.5)
    {
        return 1;
    }
    else if (result < -0.5)
    {
        return -1;
    }
    else{
        return 0;
    }
}

function normalize(value, axis) {
    
    return value / gameEngine.Size[axis];

    
}