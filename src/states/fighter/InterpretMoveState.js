import State from "../../../lib/State.js";
import Sprite from "../../../lib/Sprite.js"
import { images } from "../../globals.js";
import Fighter from "../../entities/Fighter.js";
export default class InterpretMoveState extends State
{
    constructor(fighter, move)
    {
        super();
        this.fighter = fighter;
        this.move = move;
        this.moveTime = 0;
        this.initializeSprites();
    }

    initializeSprites()
    {
        this.fighter.sprites = this.move.frames.map((frame) => new Sprite(images.get(frame.sprite), 0, 0, Fighter.FIGHTER_WIDTH, Fighter.FIGHTER_HEIGHT)
        );
        console.log(this.fighter.sprites);
    }

    update(dt)
    {
    }
}