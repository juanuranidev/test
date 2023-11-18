export class CreateTodoDto {
  //   El "private" indica que sólo se va a poder llamar intérnamente dentro de esta clase

  private constructor(public readonly text: string) {}

  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    const { text } = props;

    if (!text) return ["Text property is required", undefined];

    return [undefined, new CreateTodoDto(text)];
  }
}
