// @ts-check

class Dialog {
  #node;
  #overlayNode;
  #triggerNode;
  #closeNode;

  /**
   * @param { Element | HTMLElement | null } node
   */
  constructor(node) {
    if (!node) throw new Error("Dialog node is undefined");

    if (!(node instanceof HTMLElement))
      throw new Error("Diloag node is not a HTMLElement");

    this.#node = node;

    const triggerNode = this.node.querySelector("[data-dialog-trigger]");
    const closeNode = this.node.querySelector("[data-dialog-close]");
    const overlayNode = this.node.querySelector("[data-dialog-overlay]");

    if (!(triggerNode instanceof HTMLButtonElement))
      throw new Error("Trigger node is not HTMLButtonElement");
    if (!(closeNode instanceof HTMLButtonElement))
      throw new Error("Close node is not HTMLButtonElement");
    if (!(overlayNode instanceof HTMLDivElement))
      throw new Error("Overlay node is HTMLDivElement");

    this.#triggerNode = triggerNode;
    this.#closeNode = closeNode;
    this.#overlayNode = overlayNode;

    this.triggerNode.addEventListener("click", () => this.toggleState());
    this.closeNode.addEventListener("click", () => this.toggleState());
    this.overlayNode.addEventListener("click", () => this.toggleState());
    document.addEventListener("keydown", this.#handleEscape());
  }

  get node() {
    return this.#node;
  }

  get overlayNode() {
    return this.#overlayNode;
  }

  get triggerNode() {
    return this.#triggerNode;
  }

  get closeNode() {
    return this.#closeNode;
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

export { Dialog };
