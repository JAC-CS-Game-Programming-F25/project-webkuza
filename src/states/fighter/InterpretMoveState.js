import State from "../../../lib/State.js";
import Sprite from "../../../lib/Sprite.js"

export default class InterpretMoveState extends State
{
    constructor(fighter, move)
    {
        this.fighter = fighter;
        this.move = move;
        this.moveTime = 0;
        
    }

    update(dt)
    {
        this.fighter.sprites = this.move.frames.map((frame) => frame.sprite);
    }
}