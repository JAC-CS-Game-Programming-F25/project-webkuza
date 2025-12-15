import State from "../../../lib/State.js";
import Sprite from "../../../lib/Sprite.js"
import { images, input } from "../../globals.js";
import Fighter from "../../entities/Fighter.js";
import Animation from "../../../lib/Animation.js";

export default class InterpretMoveState extends State
{
    constructor(fighter, move)
    {
        super();
        this.fighter = fighter;
        this.move = move;
        //this.currentFrame = 0;
        this.initializeSprites();
        this.input = "nothing";
        this.currentAnimation = null;
    }

    initializeSprites()
    {
        this.sprites = this.move.frames.map((frame) => new Sprite(images.get(frame.sprite), 0, 0, Fighter.FIGHTER_WIDTH, Fighter.FIGHTER_HEIGHT));
    }

    enter(enterParameters)
    {
        super.enter(enterParameters);
        this.fighter.sprites = this.sprites;
        this.currentAnimation = new Animation(this.fighter.sprites, 0.05, 1);
        //console.log(enterParameters);
        this.applyFrameProperties();
    }

    followUp()
    {
        Object.keys(this.move.followUps).forEach(followInput => {
            if(followInput == this.input)
            {
                this.fighter.stateMachine.change(this.move.followUps[this.input], {name: this.move.followUps[this.input]});
            }
        });

        if(this.fighter.currentFrame == this.sprites.length - 1 && this.sprites.length > 1)
        {
            this.fighter.stateMachine.change(this.move.followUps["nothing"], {name: this.move.followUps["nothing"]});
        }
    }

    applyFrameProperties()
    {
        this.fighter.position.x += this.move.frames[this.fighter.currentFrame].transform.x;
    }

    exit()
    {
        super.exit();
        this.input = "nothing";
        this.fighter.currentFrame = 0;
        this.currentFrame = 0
    }

    update(dt)
    {
        let previousInput = this.input;
        this.input = Object.keys(input.keys).find((key) => input.keys[key] === true);
        if(this.input === undefined)
        {
            this.input = previousInput;
        }

        if(this.currentAnimation != null && this.currentAnimation != undefined)
        {
            this.currentAnimation.update(dt);
            let updated = this.fighter.currentFrame < this.currentAnimation.currentFrame
            this.fighter.currentFrame = this.currentAnimation.currentFrame;
            if(updated)
            {
                this.applyFrameProperties();
            }
        }

        this.followUp();
    }
}