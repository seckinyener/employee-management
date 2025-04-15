import { html, LitElement } from "lit";

export class UpdateEmployee extends LitElement {
    render() {
        return html `
            <div>
                Update Employee
            </div>
        `
    }
}

customElements.define('update-employee', UpdateEmployee);