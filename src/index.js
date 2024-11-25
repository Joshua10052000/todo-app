// @ts-check
import { Dialog } from "./controller/dialog.js";
import { DropdownMenu } from "./controller/dropdown-menu.js";
import { Form } from "./controller/form.js";
import { tasks } from "./data/tasks.js";
import { Task } from "./model/task.js";
import { Tasks } from "./model/tasks.js";

const taskDialogNode = document.querySelector(
  "[data-dialog-provider=task-dialog]"
);
const searchDialogNode = document.querySelector(
  "[data-dialog-provider=search-dialog]"
);
const taskFormNode = document.querySelector("[data-form-provider=task-form]");
const searchFormNode = document.querySelector(
  "[data-form-provider=search-form]"
);
const tableNode = document.querySelector("table");
const tableBodyNode = tableNode?.querySelector("tbody");

const taskDialog = new Dialog(taskDialogNode);
const searchDialog = new Dialog(searchDialogNode);
const taskForm = new Form(taskFormNode);
const searchForm = new Form(searchFormNode);

taskForm.node.addEventListener(
  "submit",
  taskForm.handleSubmit((data) => {
    const task = new Task({
      name: data.name,
      description: data.description,
      priority: data.priority,
    });

    tasks.set([...tasks.data, task]);
    taskForm.node.reset();
    taskDialog.setState("closed");
    renderTasks(tasks);
  })
);

searchForm.node.addEventListener(
  "submit",
  searchForm.handleSubmit((data) => {
    const searchTasks = new Tasks();

    const foundTasks = tasks.data.filter((task) =>
      task.name.toLowerCase().includes(data.name.toLowerCase())
    );

    searchTasks.set(foundTasks);
    searchForm.node.reset();
    searchDialog.setState("closed");
    renderTasks(searchTasks);
  })
);

/**
 * @param { Tasks } tasks
 */
function renderTasks(tasks) {
  if (!tableNode) return;
  if (!tableBodyNode) return;

  const dateFormatter = new Intl.DateTimeFormat();

  const tbody = tasks.data
    .map(
      (task) => `
    <tr class="border-b transition-colors hover:bg-muted/50">
      <td class="p-4 pr-0 align-middle">
        <input type="checkbox" role="checkbox" />
      </td>
      <td class="p-4 align-middle">${task.id}</td>
      <td class="p-4 align-middle">${task.name}</td>
      <td class="p-4 align-middle">${task.description}</td>
      <td class="p-4 align-middle font-semibold capitalize ${
        task.priority === "high"
          ? "text-destructive"
          : task.priority === "medium"
          ? "text-emerald-500"
          : "text-yellow-500"
      }">
        ${task.priority}
      </td>
      <td class="p-4 align-middle">
        ${dateFormatter.format(task.createdAt)}
      </td>
      <td class="p-4 align-middle">
        ${dateFormatter.format(task.updatedAt)}
      </td>
      <td class="p-4 align-middle">
        <div
          id="${task.id}"
          data-dropdown-menu-provider="${task.id}"
          data-state="closed"
          class="group/dropdown relative"
        >
          <button
            data-dropdown-menu-trigger="${task.id}"
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10"
          >
            <svg
              class="size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
          <div
            class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md group-data-[state=closed]/dropdown:hidden w-52 absolute bg-background top-10 right-1/2 translate-x-1/2"
          >
            <div class="px-2 py-1.5 text-sm font-semibold">
              Actions
            </div>
            <div
              role="separator"
              class="-mx-1 my-1 h-px bg-muted"
            ></div>
            <ul
              data-dropdown-menu-group="${task.id}"
              data-value=""
              class="grid"
            >
              <li
                data-value="delete"
                class="relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground cursor-default hover:bg-accent"
              >
                <svg
                  class="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                <span>Delete</span>
              </li>
              <li
                data-value="edit"
                class="relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground cursor-default hover:bg-accent"
              >
                <svg
                  class="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                  />
                  <path d="m15 5 4 4" />
                </svg>
                <span>Edit</span>
              </li>
              <li
                data-value="copy"
                class="relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground cursor-default hover:bg-accent"
              >
                <svg
                  class="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect
                    width="8"
                    height="4"
                    x="8"
                    y="2"
                    rx="1"
                    ry="1"
                  />
                  <path
                    d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                  />
                </svg>
                <span>Copy ID to clipboard</span>
              </li>
            </ul>
          </div>
        </div>
      </td>
    </tr>
  `
    )
    .join("");

  tableBodyNode.innerHTML = tbody;

  tasks.data.forEach((task) => {
    const dropdownNode = tableBodyNode.querySelector(
      `[data-dropdown-menu-provider="${task.id}"]`
    );

    if (!dropdownNode) {
      return;
    }

    const dropdown = new DropdownMenu(dropdownNode);

    dropdown.groups.forEach((group) => {
      group.itemNodes.forEach((itemNode) => {
        itemNode.addEventListener("click", () => {
          switch (group.getValue()) {
            case "delete":
              tasks.set((tasks) => tasks.filter((t) => t.id !== task.id));
              renderTasks(tasks);
              break;
            case "edit":
              taskForm.setValues({
                name: task.name,
                description: task.description,
                priority: task.priority,
              });
              tasks.set((tasks) => tasks.filter((t) => t.id !== task.id));
              taskDialog.setState("open");
              break;
            case "copy":
              navigator.clipboard.writeText(task.id);
          }
        });
      });
    });
  });
}

renderTasks(tasks);
