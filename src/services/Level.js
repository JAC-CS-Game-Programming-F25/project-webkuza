import Sprite from "../../lib/Sprite.js";
import Fighter from "../entities/Fighter.js";
import { CANVAS_HEIGHT, fighterFactory, images, sounds } from "../globals.js";

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
        sounds.play("battle-loop");
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
        this.enemiesDefinition.forEach((enemy) => {
            let result = fighterFactory.CreateFighter(enemy, Level.PLAYER_SPAWN, this.ground - Fighter.FIGHTER_HEIGHT)
            result.inputSource.player = this.entities[0];
            this.entities.push(result);
        });
        this.objects = [];
    }
}