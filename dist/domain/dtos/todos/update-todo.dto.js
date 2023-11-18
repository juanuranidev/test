"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoDto = void 0;
class UpdateTodoDto {
    //   El "private" indica que sólo se va a poder llamar intérnamente dentro de esta clase
    constructor(id, text, completedAt) {
        this.id = id;
        this.text = text;
        this.completedAt = completedAt;
    }
    get values() {
        const returnObject = {};
        if (this.text)
            returnObject.text = this.text;
        if (this.completedAt)
            returnObject.completedAt = this.completedAt;
        return returnObject;
    }
    static update(props) {
        const { text, completedAt, id } = props;
        let newCompletedAt = completedAt;
        if (!id) {
            return ["Should enter an id", undefined];
        }
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (newCompletedAt.toString() === "Invalid Date") {
                return ["Invalid Date", undefined];
            }
        }
        return [undefined, new UpdateTodoDto(id, text, completedAt)];
    }
}
exports.UpdateTodoDto = UpdateTodoDto;
