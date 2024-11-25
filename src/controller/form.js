// @ts-check

class Form {
  #node;

  /**
   * @param { Element | HTMLElement | null } node
   */
  constructor(node) {
    if (!node) throw new Error("Form node is undefined");
    if (!(node instanceof HTMLFormElement))
      throw new Error("Form node is not a HTMLFormElement");

    this.#node = node;
  }

  get node() {
    return this.#node;
  }

  /**
   * @param { (data: Record<string, string>) => void } submitter
   * @returns { (e: SubmitEvent) => void }
   */
  handleSubmit(submitter) {
    return (e) => {
      e.preventDefault();

      const formData = new FormData(this.node);
      /**
       * @type { Record<string, string> }
       */
      const data = {};

      formData.forEach((value, key) => (data[key] = value.toString()));

      submitter(data);
    };
  }

  /**
   * Sets form values for editing
   * @param { Record<string, string> } values
   */
  setValues(values) {
    Object.keys(values).forEach((key) => {
      const input = this.node.querySelector(`[name="${key}"]`);

      if (!input) throw new Error("Input is not defined");

      if (input) {
        // @ts-ignore
        input.value = values[key];
      }
    });
  }
}

export { Form };
