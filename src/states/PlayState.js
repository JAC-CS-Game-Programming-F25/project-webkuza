import State from "../../lib/State.js";
import Level from "../services/Level.js";

export default class PlayState extends State {
	constructor(level) {
		super();
		this.level = new Level(level);
	}

	update(dt)
	{
		super.update(dt);
		this.level.update(dt);
	}

	render()
	{
		super.render();
		this.level.render();
	}
}
