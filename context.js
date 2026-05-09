import { ThreeSceneController } from './threeSceneController.js';
import { IdleState } from './idleState.js';
import { GameData } from './gameData.js';
import { Translator } from './translator.js';
import { SoundPlayer } from './soundPlayer.js';
import { GameSettings } from './gameSettings.js';

export class Context {
    constructor(debugEnabled) {
        this.isRunning = false;
        this.translator = new Translator();
        this.canvas = document.querySelector("canvas");
        this.soundPlayer = new SoundPlayer(0.7);
        this.soundPlayer.add("com.demensdeum.flamesteeldeathmask2.step.sound.ogg");
        this.soundPlayer.add("com.demensdeum.flamesteeldeathmask2.pickup.sound.ogg");
        this.soundPlayer.add("com.demensdeum.filter-aware.sound.ogg");
        this.debugEnabled = debugEnabled;
        this.gameData = new GameData();
        this.state = new IdleState("Idle State", this);
        if (!this.canvas || this.canvas == undefined) {
            this.raiseCriticalError("1Canvas in NULL!!!!");
        }
        const canvas = this.canvas;
        const gameSettings = GameSettings.loadOrDefault();
        this.soundPlayer.setMusicVolume(gameSettings.musicVolume);
        this.soundPlayer.setSoundVolume(gameSettings.soundVolume);
        this.sceneController = new ThreeSceneController(canvas, false, gameSettings, false, this);

        this.sceneController.preloadModels([
            "com.demensdeum.flame-steel-engine-2.cube",
        ]);

        debugPrint("Game Context Initialized...");
    }
    start(state) {
        this.state = state;
        this.isRunning = true;
        this.transitionTo(this.state);
    }
    debugPrint(message) {
        if (this.debugEnabled) {
            console.log(message)
        }
    }    
    raiseCriticalError(message) {
        console.error(message);
        this.isRunning = false;
    }
    transitionTo(state) {
        this.debugPrint(`Transitioning to ${state.name}`);
        this.state = state;
        this.state.initialize();
    }
    step() {
        this.state.step();
        this.terminal.step();
        this.sceneController.step();
    }
}
