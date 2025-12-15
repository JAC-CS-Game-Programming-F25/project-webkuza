import GameObject from "./GameObject.js";
import { timer } from "../globals.js";

export default class AttackHitbox extends GameObject
{
    constructor(x, y, width, height, damage, lifetime)
    {
        super(x, y, width, height);
        this.damage = damage;
        this.lifetime = lifetime;
        timer.addTask(exist, 0, lifetime, this.disapear()); 
    }

    exist()
    {

    }

    disapear()
    {
        this.remove = true;
    }
}