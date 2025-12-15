import Sprite from "../../lib/Sprite.js";
import { CANVAS_HEIGHT, images } from "../globals.js";
import FighterFactory from "./FighterFactory.js";

export default class Level
{
    constructor(definition)
    {
        this.enemiesDefinition = definition.enemies;
        this.sprite = new Sprite(images.get(definition.sprite), 0, 0, definition.width, CANVAS_HEIGHT);
        this.width = definition.width;
        this.initializeEntities();
    }

    update(dt)
    {
        this.sprite.render(0, 0);

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
        this.entities.forEach(entity => {
            entity.render();
        });

        this.objects.forEach(object => {
            object.render();
        });
    }
}