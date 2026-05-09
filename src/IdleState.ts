import { State } from "./State.js";
import { debugPrint } from "./runtime.js";
export class IdleState extends State {
    step() {
        debugPrint("IdleState step");
    }
    initialize() {
    }
}
