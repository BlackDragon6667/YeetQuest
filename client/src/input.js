// input.js - Handles keyboard and mouse input
import { Orientations } from "../../shared/js/gametypes.js";

export default class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = {
            W: 87,
            A: 65,
            S: 83,
            D: 68,
            UP: 38,
            LEFT: 37,
            DOWN: 40,
            RIGHT: 39,
            ENTER: 13,
            SPACE: 32,
            ESC: 27
        };
        
        this.pressedKeys = new Set();
        this.moveDirections = new Set();
        this.initKeyboardControls();
    }

    initKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            const key = e.keyCode;
            this.pressedKeys.add(key);

            // Handle WASD and arrow keys
            switch(key) {
                case this.keys.W:
                case this.keys.UP:
                    this.moveDirections.add(Orientations.UP);
                    break;
                case this.keys.A:
                case this.keys.LEFT:
                    this.moveDirections.add(Orientations.LEFT);
                    break;
                case this.keys.S:
                case this.keys.DOWN:
                    this.moveDirections.add(Orientations.DOWN);
                    break;
                case this.keys.D:
                case this.keys.RIGHT:
                    this.moveDirections.add(Orientations.RIGHT);
                    break;
            }

            this.updatePlayerMovement();
        });

        document.addEventListener('keyup', (e) => {
            const key = e.keyCode;
            this.pressedKeys.delete(key);

            // Handle WASD and arrow keys release
            switch(key) {
                case this.keys.W:
                case this.keys.UP:
                    this.moveDirections.delete(Orientations.UP);
                    break;
                case this.keys.A:
                case this.keys.LEFT:
                    this.moveDirections.delete(Orientations.LEFT);
                    break;
                case this.keys.S:
                case this.keys.DOWN:
                    this.moveDirections.delete(Orientations.DOWN);
                    break;
                case this.keys.D:
                case this.keys.RIGHT:
                    this.moveDirections.delete(Orientations.RIGHT);
                    break;
            }

            this.updatePlayerMovement();
        });
    }

    updatePlayerMovement() {
        const player = this.game.player;
        if (!player || this.moveDirections.size === 0) return;

        // Get the primary movement direction
        const direction = Array.from(this.moveDirections)[0];
        
        // Calculate new position based on direction
        let newX = player.gridX;
        let newY = player.gridY;
        
        switch(direction) {
            case Orientations.UP:
                newY -= 1;
                break;
            case Orientations.DOWN:
                newY += 1;
                break;
            case Orientations.LEFT:
                newX -= 1;
                break;
            case Orientations.RIGHT:
                newX += 1;
                break;
        }

        // Check if the new position is walkable
        if (this.game.map.isWalkable(newX, newY)) {
            player.orientation = direction;
            this.game.makePlayerMoveTo(newX, newY);
        }
    }

    isKeyDown(keyCode) {
        return this.pressedKeys.has(keyCode);
    }
}