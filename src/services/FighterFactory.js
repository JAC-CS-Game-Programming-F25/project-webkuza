import Fighter from "../entities/Fighter.js";
import Factory from "./Factory.js";
import { fighterDefinition, input } from "../globals.js";
import Direction from "../enums/Direction.js";
import InputSource from "./InputSource.js";
export default class FighterFactory extends Factory
{
    constructor()
    {
        super();
    }

    CreateFighter(name, x, y) 
    {
        let fighterParams = structuredClone(fighterDefinition[name]);
        
        if(name == "Player")
        {
            return new Fighter(x, y, fighterParams.width, fighterParams.height, fighterParams.moveset, Direction.Right, false, fighterParams.health, input);
        }
        else
        {
            let result = new Fighter(x, y, fighterParams.width, fighterParams.height, fighterParams.moveset, Direction.Left, true, fighterParams.health, new InputSource());
            result.renderOffset = -32;
            result.inputSource.fighter = result;
            return result;
        }
    }
}