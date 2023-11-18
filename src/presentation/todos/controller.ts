import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {
  //* no va a tener métodos estáticos porque vamos a querer hacer el dependecy injección
  // Por ejemplo inyectar un repositorio, que nuestras rutas usen ese repositorio.
  // O bien inyectar el repositorio para usarlo mediante casos de uso
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID argument is not a number" });
    }
    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });
    res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    // const { text } = req.body;

    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({ error: error });
    }

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    // if (isNaN(id))
    //   return res.status(400).json({ error: "ID argument is not a number" });

    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

    if (error) {
      return res.status(400).json(error);
    }

    const todo = await prisma.todo.findFirst({
      where: {
        id: updateTodoDto!.id,
      },
    });

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: updateTodoDto!,
    });

    res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    res.json(todo);
  };
}
