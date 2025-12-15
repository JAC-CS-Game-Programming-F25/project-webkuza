import Fighter from "../entities/Fighter.js";
import Factory from "./Factory.js";
import { fighterDefinition } from "../globals.js";

export default class FighterFactory extends Factory
{
    constructor()
    {
        super();
    }

    CreateFighter(name, x, y) 
    {
        let fighterParams = structuredClone(fighterDefinition[name]);
        return new Fighter(x, y, fighterParams.width, fighterParams.height, fighterParams.moveset);
    }
}