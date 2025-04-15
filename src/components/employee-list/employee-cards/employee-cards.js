import { html, LitElement } from "lit";

export class EmployeeCards extends LitElement {
    render() {
        return html`
            <div>
                Employee Cards
            </div>
        `
    }
}

window.customElements.define("employee-cards", EmployeeCards);