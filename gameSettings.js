import { Utils } from "./utils.js";
import { debugPrint } from "./runtime.js";
export class GameSettings {
    static default() {
        return new GameSettings(4, 0, 0.5, 0.5);
    }
    static fromJson(savedGameSettings) {
        const mouseSensitivity = Utils.numberOrConstant(savedGameSettings.mouseSensitivity, 1);
        const frameDelay = Utils.numberOrConstant(savedGameSettings.frameDelay, 0);
        const musicVolume = Utils.numberOrConstant(savedGameSettings.musicVolume, 0.5);
        const soundVolume = Utils.numberOrConstant(savedGameSettings.soundVolume, 0.5);
        return new GameSettings(mouseSensitivity, frameDelay, musicVolume, soundVolume);
    }
    constructor(mouseSensitivity, frameDelay, musicVolume, soundVolume) {
        this.mouseSensitivity = mouseSensitivity;
        this.frameDelay = frameDelay;
        this.musicVolume = musicVolume;
        this.soundVolume = soundVolume;
    }
    save() {
        const serializedGameSettings = JSON.stringify(this);
        debugPrint(serializedGameSettings);
        window.localStorage.setItem(GameSettings.databaseKey, serializedGameSettings);
    }
    static loadOrDefault() {
        const savedGameSettingsJson = window.localStorage.getItem(GameSettings.databaseKey);
        var savedGameSettings = null;
        if (savedGameSettingsJson != null) {
            savedGameSettings = JSON.parse(savedGameSettingsJson);
        }
        const gameSettings = savedGameSettings != null ? GameSettings.fromJson(savedGameSettings) : GameSettings.default();
        return gameSettings;
    }
}
GameSettings.databaseKey = "GameSettings";
