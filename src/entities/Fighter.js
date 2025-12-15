import GameEntity from "./GameEntity.js";
import Direction from "../enums/Direction.js";
import StateMachine from "../../lib/StateMachine.js";
import InterpretMoveState from "../states/fighter/InterpretMoveState.js";

export default class Fighter extends GameEntity
{
    constructor(x = 0, y = 0, width = 0, height = 0, moveset, direction, isEnemy, health)
    {
        super(x, y, width, height);
        this.moveset = moveset;
        this.state = moveset.idle;
        this.direction = direction;
        this.isEnemy = isEnemy;
        this.maxHealth = health;
        this.currentHealth = health;
        
    }

    initializeStateMachine()
    {
        this.stateMachine = new StateMachine();
        Object.keys(this.moveset).forEach(key => {
            this.stateMachine.add(key, new InterpretMoveState(this, this.moveset.idle))
        });
    }
}