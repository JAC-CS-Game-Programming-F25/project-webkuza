import GameEntity from "./GameEntity.js";
import Direction from "../enums/Direction.js";
import StateMachine from "../../lib/StateMachine.js";
import InterpretMoveState from "../states/fighter/InterpretMoveState.js";

export default class Fighter extends GameEntity
{
    static FIGHTER_WIDTH = 64;
    static FIGHTER_HEIGHT = 64;

    constructor(x = 0, y = 0, width = 0, height = 0, moveset, direction, isEnemy, health)
    {
        super(x, y, width, height);
        this.moveset = moveset;
        this.state = moveset.idle;
        this.direction = direction;
        this.isEnemy = isEnemy;
        this.maxHealth = health;
        this.currentHealth = health;
        this.initializeStateMachine();
    }

    initializeStateMachine()
    {
        this.stateMachine = new StateMachine();
        Object.keys(this.moveset).forEach(key => {
            this.stateMachine.add(key, new InterpretMoveState(this, this.moveset[key]));
        });
        this.stateMachine.change("idle", {});
    }

    update(dt)
    {
        super.update();
        this.stateMachine.update(dt);
    }
}