export class SceneController {

    static get itemSize() { return 1; }
    static get carSize() { return 1; }
    static get roadSegmentSize() { return 2; }
    static get skyboxPositionDiff() { return 0.5; }

    constructor(canvas, physicsEnabled, gameSettings, systemOutput) {throw new Error("Abstract class SceneController cannot be instantiated directly.");}
    scale() { throw new Error("Method 'scale()' must be implemented."); }
    lockOrbitControls() { throw new Error("Method 'lockOrbitControls()' must be implemented."); }
    setOrbitControlsEnabled(enabled) { throw new Error("Method 'setOrbitControlsEnabled()' must be implemented."); }
    setFog(color, near, far) { throw new Error("Method 'setFog()' must be implemented."); }
    windowWidth() { throw new Error("Method 'windowWidth()' must be implemented."); }
    windowHeight() { throw new Error("Method 'windowHeight()' must be implemented."); }
    resize() { throw new Error("Method 'resize()' must be implemented."); }
    decorControlsDidRequestCommandWithName(decor, commandName) { throw new Error("Method 'decorControlsDidRequestCommandWithName()' must be implemented."); }
    isObjectWithNameOlderThan(name, date) { throw new Error("Method 'isObjectWithNameOlderThan()' must be implemented."); }
    controlsQuaternionForObject(controls, objectName) { throw new Error("Method 'controlsQuaternionForObject()' must be implemented."); }
    controlsRequireJump(controls, objectName) { throw new Error("Method 'controlsRequireJump()' must be implemented."); }
    controlsRequireObjectTranslate(controls, objectName, x, y, z) { throw new Error("Method 'controlsRequireObjectTranslate()' must be implemented."); }
    controlsRequireObjectRotation(controls, objectName, euler) { throw new Error("Method 'controlsRequireObjectRotation()' must be implemented."); }
    controlsCanMoveLeftObject(controls, objectName) { throw new Error("Method 'controlsCanMoveLeftObject()' must be implemented."); }
    controlsCanMoveRightObject(controls, objectName) { throw new Error("Method 'controlsCanMoveRightObject()' must be implemented."); }
    controlsCanMoveForwardObject(controls, objectName) { throw new Error("Method 'controlsCanMoveForwardObject()' must be implemented."); }
    controlsCanMoveBackwardObject(controls, objectName) { throw new Error("Method 'controlsCanMoveBackwardObject()' must be implemented."); }
    addCommand(name, type, time, x, y, z, rX, rY, rZ, nextCommandName) { throw new Error("Method 'addCommand()' must be implemented."); }
    commandWithName(name) { throw new Error("Method 'commandWithName()' must be implemented."); }
    addLight() { throw new Error("Method 'addLight()' must be implemented."); }
    addPointLight(objectName, position, color, intensity, distance, decay) { throw new Error("Method 'addPointLight()' must be implemented."); }
    addEnvironmentLight(color, intensity) { throw new Error("Method 'addEnvironmentLight()' must be implemented."); }
    stickObjectToObject(childName, parentName) { throw new Error("Method 'stickObjectToObject()' must be implemented."); }
    saveGameSettings() { throw new Error("Method 'saveGameSettings()' must be implemented."); }
    setToneMappingExposure(exposure) { throw new Error("Method 'setToneMappingExposure()' must be implemented."); }
    setLightIntensity(objectName, intensity) { throw new Error("Method 'setLightIntensity()' must be implemented."); }
    step() { throw new Error("Method 'step()' must be implemented."); }
    controlsStep(delta) { throw new Error("Method 'controlsStep()' must be implemented."); }
    animationsStep(delta) { throw new Error("Method 'animationsStep()' must be implemented."); }
    render() { throw new Error("Method 'render()' must be implemented."); }
    addSceneObject(sceneObject) { throw new Error("Method 'addSceneObject()' must be implemented."); }
    serializedSceneObjects() { throw new Error("Method 'serializedSceneObjects()' must be implemented."); }
    serializeSceneObject(name) { throw new Error("Method 'serializeSceneObject()' must be implemented."); }
    removeAllSceneObjectsExceptCamera() { throw new Error("Method 'removeAllSceneObjectsExceptCamera()' must be implemented."); }
    removeObjectWithName(name) { throw new Error("Method 'removeObjectWithName()' must be implemented."); }
    switchSkyboxIfNeeded(args) { throw new Error("Method 'switchSkyboxIfNeeded()' must be implemented."); }
    setBackgroundColor(red, green, blue) { throw new Error("Method 'setBackgroundColor()' must be implemented."); }
    preloadModels(modelNames) { throw new Error("Method 'preloadModels()' must be implemented."); }
    addModelAt(name, modelName, x, y, z, rX, rY, rZ, isMovable, controls, boxSize, successCallback, color, transparent, opacity) { throw new Error("Method 'addModelAt()' must be implemented."); }
    objectPlayAnimation(objectName, animationName) { throw new Error("Method 'objectPlayAnimation()' must be implemented."); }
    objectStopAnimation(objectName, animationName) { throw new Error("Method 'objectStopAnimation()' must be implemented."); }
    addBoxAt(name, x, y, z, textureName, size, color, transparent, opacity) { throw new Error("Method 'addBoxAt()' must be implemented."); }
    addPlaneAt(name, x, y, z, width, height, textureName, color, resetDepthBuffer, transparent, opacity, receiveShadow) { throw new Error("Method 'addPlaneAt()' must be implemented."); }
    objectsPickerControllerDidPickObject(picker, object) { throw new Error("Method 'objectsPickerControllerDidPickObject()' must be implemented."); }
    removeSceneObjectWithName(name) { throw new Error("Method 'removeSceneObjectWithName()' must be implemented."); }
    sceneObjectPosition(name) { throw new Error("Method 'sceneObjectPosition()' must be implemented."); }
    objectCollidesWithObject(alisaName, bobName) { throw new Error("Method 'objectCollidesWithObject()' must be implemented."); }
    sceneObject(name, x, y, z) { throw new Error("Method 'sceneObject()' must be implemented."); }
    controlsRequireObjectTeleport(controls, name, x, y, z) { throw new Error("Method 'controlsRequireObjectTeleport()' must be implemented."); }
    translateObject(name, x, y, z) { throw new Error("Method 'translateObject()' must be implemented."); }
    moveObjectTo(name, x, y, z) { throw new Error("Method 'moveObjectTo()' must be implemented."); }
    rotateObjectTo(name, x, y, z) { throw new Error("Method 'rotateObjectTo()' must be implemented."); }
    setObjectOpacity(name, opacity) { throw new Error("Method 'setObjectOpacity()' must be implemented."); }
    addInstancedModel(instanceName, modelName, positions) { throw new Error("Method 'addInstancedModel()' must be implemented."); }
}
