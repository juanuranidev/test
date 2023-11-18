export class UpdateTodoDto {
  //   El "private" indica que sólo se va a poder llamar intérnamente dentro de esta clase

  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObject: { [key: string]: any } = {};

    if (this.text) returnObject.text = this.text;
    if (this.completedAt) returnObject.completedAt = this.completedAt;

    return returnObject;
  }

  static update(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
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
