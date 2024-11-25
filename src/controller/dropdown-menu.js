// @ts-check

class DropdownMenu {
  #node;
  #triggerNode;
  /**
   * @type { DropdownMenuGroup[] }
   */
  #groups;

  /**
   * @param { Element | HTMLElement | null } node
   */
  constructor(node) {
    if (!node) throw new Error("DropdownMenu node is undefined");
    if (!(node instanceof HTMLElement))
      throw new Error("DropdownMenu node is not a HTMLElement");

    this.#node = node;

    const triggerNode = this.node.querySelector("[data-dropdown-menu-trigger]");
    const groupNodes = this.node.querySelectorAll("[data-dropdown-menu-group]");
    let groups = [];
    groupNodes.forEach((groupNode) => [
      groups.push(new DropdownMenuGroup(groupNode, this)),
    ]);

    if (!(triggerNode instanceof HTMLButtonElement))
      throw new Error("Trigger node is not HTMLButtonElement");

    this.#triggerNode = triggerNode;
    this.#groups = groups;

    this.triggerNode.addEventListener("click", () => this.toggleState());
    document.addEventListener("keydown", this.#handleEscape());
  }

  get node() {
    return this.#node;
  }

  get triggerNode() {
    return this.#triggerNode;
  }

  get groups() {
    return this.#groups;
  }

  getState() {
    const { dataset } = this.node;
    const { state } = dataset;

    if (state == undefined) throw new Error("State is undefined");

    return state;
  }

  /**
   * @param { string } state
   */
  setState(state) {
    this.node.dataset.state = state;
  }

  toggleState() {
    this.setState(this.getState() === "open" ? "closed" : "open");
  }

  #handleEscape() {
    /**
     * @param { KeyboardEvent } e
     */
    return (e) => {
      if (e.key === "Escape") {
        this.setState("closed");
      }
    };
  }
}

class DropdownMenuGroup {
  #node;
  #itemNodes;
  #dropdownMenu;

  /**
   * @param { Element | HTMLElement | null } node
   * @param { DropdownMenu } dropdownMenu - The parent DropdownMenu instance
   */
  constructor(node, dropdownMenu) {
    if (!node) throw new Error("DropdownMenuGroup node is undefined");
    if (!(node instanceof HTMLUListElement))
      throw new Error("DropdownMenu node is not a HTMLUlistElement");

    this.#node = node;
    this.#dropdownMenu = dropdownMenu;

    /**
     * @type { NodeListOf<HTMLElement> }
     */
    const itemNodes = this.node.querySelectorAll("[data-value]");

    this.#itemNodes = itemNodes;

    this.itemNodes.forEach((itemNode) =>
      itemNode.addEventListener("click", () => {
        const { dataset } = itemNode;
        const { value } = dataset;

        if (value == undefined) throw new Error("Value is undefined");

        this.setValue(value);

        this.dropdownMenu.setState("closed");
      })
    );
  }

  get node() {
    return this.#node;
  }

  get itemNodes() {
    return this.#itemNodes;
  }

  get dropdownMenu() {
    return this.#dropdownMenu;
  }

  getValue() {
    const { dataset } = this.node;
    const { value } = dataset;

    if (value == undefined) throw new Error("Value is undefined");

    return value;
  }

  /**
   * @param { string } value
   */
  setValue(value) {
    this.node.dataset.value = value;
  }
}

export { DropdownMenu };
