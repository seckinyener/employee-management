import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { employee$ } from "../../store/employee-store";
import { session$, updateViewMode } from "../../store/session.store";
import { VIEW_MODE_CARD, VIEW_MODE_TABLE } from "../../utils/constants";

export class EmployeeList extends LitElement {

    static properties = {
        selectedView: {state: true, type: String}
    }

    constructor() {
        super();
        this.selectedView = VIEW_MODE_TABLE;
    };

    connectedCallback() {
        super.connectedCallback();
        employee$.subscribe((employees) => {
            console.log('employees -> ', employees)
        });

        session$.subscribe((data) => {
            console.log('view mode -> ', data.viewMode);
            this.selectedView = data.viewMode;
        })
    }

    changeTheView = (selectedView) => {
        updateViewMode(selectedView);
    }

    render() {
        return html`
        <div class="employee-list-header-row">
            <div class="employee-list-header-text">
                <h2>Employee List</h2>
            </div>

            <div>
                <span class="material-icons ${this.selectedView === VIEW_MODE_TABLE ? 'active' : 'inactive'}" @click=${() => this.changeTheView(VIEW_MODE_TABLE)}>menu</span>
                <span class="material-icons ${this.selectedView === VIEW_MODE_CARD ? 'active' : 'inactive'}" @click=${() => this.changeTheView(VIEW_MODE_CARD)}>apps</span>
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