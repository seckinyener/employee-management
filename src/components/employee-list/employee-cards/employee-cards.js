import { css, html, LitElement } from "lit";
import { employee$ } from "../../../store/employee-store";

export class EmployeeCards extends LitElement {

    static properties = {
        employees: {state: true}
    }

    constructor() {
        super();
        this.employees = [];
    }

    connectedCallback() {
        super.connectedCallback();
        employee$.subscribe((data) => {
            this.employees = data.filteredEmployees
        })
    }

    render() {
        return html`
        <div class="grid">
            ${this.employees.map(
                emp => html`<employee-card-item .employee=${emp}></employee-card-item>`
            )}
      </div>
        `
    }

    static styles = css`

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }

  `;
}

window.customElements.define("employee-cards", EmployeeCards);