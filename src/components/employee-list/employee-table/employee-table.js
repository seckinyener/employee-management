import { html, LitElement } from "lit";

export class EmployeeTable extends LitElement {
    render() {
        return html`
            <div>
                Employee Table
            </div>
        `
    }
}

window.customElements.define("employee-table", EmployeeTable);