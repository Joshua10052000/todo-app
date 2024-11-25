// @ts-check

import { Task } from "../model/task.js";
import { Tasks } from "../model/tasks.js";

const learnTask = new Task({
  name: "Learn JavaScript",
  description: "Learn es6 array methods.",
  priority: "medium",
});

const tasks = new Tasks();

tasks.set([...tasks.data, learnTask]);

export { tasks };
