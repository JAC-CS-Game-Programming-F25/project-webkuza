import State from "../../../lib/State.js";

export default class InterpretMoveState extends State
{
    constructor(fighter, move)
    {
        this.fighter = fighter;
        this.move = move;
    }
}