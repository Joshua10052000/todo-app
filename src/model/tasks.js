// @ts-check

import { Task } from "./task.js";

class Tasks {
  /**
   * @type { Task[] }
   */
  #data;

  constructor() {
    this.#data = [];
  }

  get data() {
    return this.#data;
  }

  /**
   * @param { ((tasks: Task[]) => Task[]) | Task[] } data
   */
  set(data) {
    if (data instanceof Function) {
      this.#data = data(this.data);
      return;
    }

    this.#data = data;
  }
}

export { Tasks };
