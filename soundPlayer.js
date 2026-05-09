export class SoundPlayer {
    constructor(volume = 1.0, poolSize = 3) {
        this.masterVolume = volume;
        this.poolSize = poolSize;
        this.audioPools = {};
        this.loopInstances = {};
        this.musicVolume = 1.0;
        this.soundVolume = 1.0;
    }
    createAudioElement(audioPath) {
        console.log(`SoundPlayer: Creating audio element for ${audioPath} with master volume ${this.masterVolume}`);
        const audio = new Audio(audioPath);
        audio.volume = this.masterVolume;
        audio.addEventListener('ended', () => {
            console.log(`SoundPlayer: Sound ended, returning to pool: ${audioPath}`);
            audio.currentTime = 0;
            if (this.audioPools[audioPath]) {
                this.audioPools[audioPath].push(audio);
            }
        });
        return audio;
    }
    add(audioPath) {
        console.log(`SoundPlayer: Registering sound ${audioPath} (pool size: ${this.poolSize})`);
        if (!this.audioPools[audioPath]) {
            this.audioPools[audioPath] = [];
            for (let i = 0; i < this.poolSize; i++) {
                const audio = this.createAudioElement(audioPath);
                this.audioPools[audioPath].push(audio);
            }
        }
    }
    setMasterVolume(volume) {
        this.masterVolume = volume;
        this.updateAllVolumes();
    }
    setMusicVolume(volume) {
        this.musicVolume = volume;
        Object.values(this.loopInstances).forEach((audio) => {
            audio.volume = this.masterVolume * this.musicVolume * (audio._volumeScale || 1.0);
        });
    }
    setSoundVolume(volume) {
        this.soundVolume = volume;
        Object.values(this.audioPools).forEach((audioPool) => {
            audioPool.forEach((audio) => {
                audio.volume = this.masterVolume * this.soundVolume * (audio._volumeScale || 1.0);
            });
        });
    }
    updateAllVolumes() {
        this.setMusicVolume(this.musicVolume);
        this.setSoundVolume(this.soundVolume);
    }
    play(audioPath, volumeScale = 1.0) {
        if (this.soundVolume <= 0) {
            return;
        }
        let audioPool = this.audioPools[audioPath];
        if (!audioPool) {
            console.error(`SoundPlayer: Sound not registered: ${audioPath}`);
            return;
        }

        let audio;
        if (audioPool.length > 0) {
            audio = audioPool.pop();
        } else {
            console.warn(`SoundPlayer: Pool empty for ${audioPath}, creating temporary instance.`);
            audio = this.createAudioElement(audioPath);
        }

        if (audio) {
            audio._volumeScale = volumeScale;
            audio.volume = this.masterVolume * this.soundVolume * volumeScale;
            console.log(`SoundPlayer: Trying to play ${audioPath} at volume ${audio.volume} (scale: ${volumeScale})`);
            audio.currentTime = 0;
            audio.play().catch(e => {
                console.error(`SoundPlayer: Play failed for ${audioPath}:`, e);

                if (e.name === 'NotAllowedError') {
                    console.warn(`SoundPlayer: Autoplay blocked for ${audioPath}. Attempting to create fresh element in gesture...`);
                    const freshAudio = this.createAudioElement(audioPath);
                    freshAudio._volumeScale = volumeScale;
                    freshAudio.volume = this.masterVolume * this.soundVolume * volumeScale;
                    freshAudio.play().then(() => {
                        console.log(`SoundPlayer: Successfully played fresh element for ${audioPath}`);
                    }).catch(e2 => {
                        console.error(`SoundPlayer: Even fresh element failed for ${audioPath}:`, e2);
                    });
                } else {
                    if (!audioPool.includes(audio)) {
                        audioPool.push(audio);
                    }
                }
            });
        }
    }
    playAll() {
        if (this.soundVolume <= 0) return;
        Object.values(this.audioPools).forEach((audioPool) => {
            if (audioPool.length > 0) {
                const audio = audioPool.pop();
                if (audio) {
                    audio.play();
                }
            }
        });
    }
    stopAll() {
        Object.values(this.audioPools).forEach((audioPool) => {
            audioPool.forEach((audio) => {
                audio.pause();
                audio.currentTime = 0;
            });
        });
        Object.values(this.loopInstances).forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
    }

    playLoop(audioPath, volumeScale = 1.0) {
        if (this.loopInstances[audioPath]) {
            console.warn(`Looping sound already playing: ${audioPath}`);
            return;
        }
        const audio = new Audio(audioPath);
        audio._volumeScale = volumeScale;
        audio.volume = this.masterVolume * this.musicVolume * volumeScale;
        audio.loop = true;
        this.loopInstances[audioPath] = audio;

        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                if (error.name === 'NotAllowedError') {
                    console.warn(`Autoplay blocked for loop: ${audioPath}. Waiting for interaction...`);
                    const onInteraction = () => {
                        audio.play().catch(e => console.error("Failed to play loop after interaction:", e));
                        window.removeEventListener('mousedown', onInteraction);
                        window.removeEventListener('keydown', onInteraction);
                    };
                    window.addEventListener('mousedown', onInteraction);
                    window.addEventListener('keydown', onInteraction);
                } else {
                    console.error("Error playing loop:", error);
                }
            });
        }
    }
}
