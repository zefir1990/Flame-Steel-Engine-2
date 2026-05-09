import { Context } from "./AppContext.js";

export const AppStart = (options: AppStartOptions) => {
    const debugEnabled = options.debugEnabled
    const context = new Context(debugEnabled)
    const initialStateClassName = options.initialStateClassName
    const initialState = new initialStateClassName(context)
    context.start(initialState)
    function step() {
        if (!context.isRunning) {
            return
        }
        context.step()
        requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
}
