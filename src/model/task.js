// @ts-check

class Task {
  #id;
  #name;
  #description;
  #priority;
  #createdAt;
  #updatedAt;

  /**
   * @param {{ name: string; description: string; priority: string; }} args
   */

  constructor(args) {
    this.#id = crypto.randomUUID();
    this.#name = args.name;
    this.#description = args.description;
    this.#priority = args.priority;
    this.#createdAt = new Date();
    this.#updatedAt = new Date();
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get description() {
    return this.#description;
  }

  get priority() {
    return this.#priority;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  set name(name) {
    this.#name = name;
  }

  set description(description) {
    this.#description = description;
  }

  set priority(priority) {
    this.#priority = priority;
  }

  set updatedAt(updatedAt) {
    this.#updatedAt = updatedAt;
  }

  /**
   * @param {{ name: string; description: string; priority: string; }} data
   */
  set(data) {
    this.name = data.name;
    this.description = data.description;
    this.priority = data.priority;
    this.updatedAt = new Date();
  }
}

export { Task };
