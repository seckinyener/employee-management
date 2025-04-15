import { html, LitElement } from "lit";

export class CreateEmployee extends LitElement {
    render() {
        return html `
            <div>
                Create Employee..
            </div>
        `
    }
}

customElements.define('create-employee', CreateEmployee);