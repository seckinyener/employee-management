import { html, LitElement } from "lit";

export class EmployeeForm extends LitElement{
    render() {
        return html`
            <div>Employee form</div>
        `
    }
}

window.customElements.define("employee-form", EmployeeForm);