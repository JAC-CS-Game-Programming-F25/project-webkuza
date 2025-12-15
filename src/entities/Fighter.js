import GameEntity from "./GameEntity.js";
import Direction from "../enums/Direction.js";
import StateMachine from "../../lib/StateMachine.js";
import InterpretMoveState from "../states/fighter/InterpretMoveState.js";

export default class Fighter extends GameEntity
{
    static FIGHTER_WIDTH = 64;
    static FIGHTER_HEIGHT = 64;

    constructor(x = 0, y = 0, width = 0, height = 0, moveset, direction, isEnemy, health, inputSource)
    {
        super(x, y, width, height);
        this.moveset = moveset;
        this.state = moveset.idle;
        this.direction = direction;
        this.isEnemy = isEnemy;
        this.maxHealth = health;
        this.currentHealth = health;
        this.inputSource = inputSource;
        this.initializeStateMachine();
    }

    initializeStateMachine()
    {
        this.stateMachine = new StateMachine();
        Object.keys(this.moveset).forEach(key => {
            console.log(key);
            this.stateMachine.add(key, new InterpretMoveState(this, this.moveset[key]));
        });
        this.stateMachine.change("idle", {});
    }

    update(dt)
    {
        super.update();
        this.inputSource.update(dt);
        this.stateMachine.update(dt);
        if(this.inputSource.keys["A"] === true)
        {
            this.direction = Direction.Left;
            this.renderOffset = -32;
        }
        if(this.inputSource.keys["D"] === true)
        {
            this.direction = Direction.Right;
            this.renderOffset = 0;
        }
    }
}