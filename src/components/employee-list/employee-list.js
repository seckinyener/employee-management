import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { employee$ } from "../../store/employee-store";

export class EmployeeList extends LitElement {

    static properties = {
        selectedView: {state: true, type: String}
    }

    constructor() {
        super();
        this.selectedView = 'Table';
    };

    connectedCallback() {
        super.connectedCallback();
        employee$.subscribe((employees) => {
            console.log('employees -> ', employees)
        });
    }

    changeTheView = (selectedView) => {
        this.selectedView = selectedView;
    }

    render() {
        return html`
        <div class="employee-list-header-row">
            <div class="employee-list-header-text">
                <h2>Employee List</h2>
            </div>

            <div>
                <span class="material-icons ${this.selectedView === 'Table' ? 'active' : 'inactive'}" @click=${() => this.changeTheView('Table')}>menu</span>
                <span class="material-icons ${this.selectedView === 'Card' ? 'active' : 'inactive'}" @click=${() => this.changeTheView('Card')}>apps</span>
            </div>
        </div>

        <div>
            ${this.selectedView === 'Table' ? html `<employee-table></employee-table` : html `<employee-cards></employee-cards`}
        </div>
        `
    }

    static styles = css`
        .employee-list-header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .employee-list-header-text {
            color: #ff7e00;
            font-weight: 600;
        }

        .material-icons {
            font-family: 'Material Icons';
            font-size: 24px;
            vertical-align: middle;
            cursor: pointer;
        }

        .active {
            color: #ff7e00
        }

        .inactive {
            color: grey
        }
    `
}

customElements.define('employee-list', EmployeeList);