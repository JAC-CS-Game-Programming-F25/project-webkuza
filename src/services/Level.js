import FighterFactory from "./FighterFactory";

export default class Level
{
    constructor(definition)
    {
        this.enemiesDefinition = definition.enemies;
        this.sprite = definition.sprite;
        this.width = definition.width;
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
        this.entities.forEach(entity => {
            entity.render();
        });

        this.objects.forEach(object => {
            object.render();
        });
    }
}