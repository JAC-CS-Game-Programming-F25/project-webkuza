import Sprite from "../../lib/Sprite.js";
import Fighter from "../entities/Fighter.js";
import { CANVAS_HEIGHT, fighterFactory, images } from "../globals.js";
import FighterFactory from "./FighterFactory.js";

export default class Level
{
    static PLAYER_SPAWN = 45;

    constructor(definition)
    {
        this.enemiesDefinition = definition.enemies;
        this.sprite = new Sprite(images.get(definition.sprite), 0, 0, definition.width, CANVAS_HEIGHT);
        this.width = definition.width;
        this.ground = definition.groundY;
        this.initializeEntities();
    }

    update(dt)
    {
        this.entities.forEach(entity => {
            entity.update(dt);
        });

        this.objects.forEach(object => {
            object.update(dt);
        });

        this.objects = this.objects.filter(object => !object.remove);
    }

    render()
    {
        this.sprite.render(0, 0);

        this.entities.forEach(entity => {
            entity.render();
        });

        this.objects.forEach(object => {
            object.render();
        });
    }

    initializeEntities()
    {
        this.entities = [fighterFactory.CreateFighter("Player", Level.PLAYER_SPAWN, this.ground - Fighter.FIGHTER_HEIGHT)];
        console.log(this.entities[0]);
        this.objects = [];
    }
}