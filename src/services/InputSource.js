export default class InputSource
{
    constructor()
    {
        this.keys = {};
    }

    update(dt)
    {
        if(this.player != null && this.player != undefined)
		{
            let distance = Math.abs(this.player.position.x - this.fighter.position.x);
            if(distance < 32)
            {
                this.keys["A"] = false;
                this.keys["D"] = false;
                this.keys["E"] = true;
            }
			else if(this.player.position.x < this.fighter.position.x)
            {
                this.keys["A"] = true;
                this.keys["D"] = false;
                this.keys["E"] = false;
            }
            else if(this.player.position.x > this.fighter.position.x && distance)
            {
                this.keys["A"] = false;
                this.keys["D"] = true;
                this.keys["E"] = false;
            }
		}
    }
}