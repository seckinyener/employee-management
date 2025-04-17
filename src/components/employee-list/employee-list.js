import { css, html, LitElement } from "lit";
import { employee$, updateStore, getState } from "../../store/employee-store";
import { session$, updateViewMode } from "../../store/session.store";
import { VIEW_MODE_CARD, VIEW_MODE_TABLE } from "../../utils/constants";
import { t } from "../../i18n";
import { materialIconStyles } from "../../style/common";

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
        session$.subscribe((data) => {
            this.selectedView = data.viewMode;
        })
    }

    changeTheView = (selectedView) => {
        updateViewMode(selectedView);
    }

    onSearch(e) {
        const query = e.target.value.toLowerCase();
        updateStore({ 
          searchQuery: query,
          currentPage: 1,
          filteredEmployees: getState().employees.filter(emp =>
            Object.values(emp).some(val => val.toLowerCase?.().includes(query))
          )
        });
      }

    render() {
        return html`
        <div class="seckin">
            <div class="employee-list-header-row">
                <div class="employee-list-header-text">
                    <h2>${t('employeeList')}</h2>
                </div>

                <div>
                    <input placeholder="Search..." @input=${this.onSearch} />
                </div>

                <div>
                    <span class="material-icons ${this.selectedView === VIEW_MODE_TABLE ? 'active' : 'inactive'}" @click=${() => this.changeTheView(VIEW_MODE_TABLE)}>menu</span>
                    <span class="material-icons ${this.selectedView === VIEW_MODE_CARD ? 'active' : 'inactive'}" @click=${() => this.changeTheView(VIEW_MODE_CARD)}>apps</span>
                </div>
            </div>

            <div>
                ${this.selectedView === 'Table' ? html `<employee-table></employee-table` : html `<employee-cards></employee-cards`}
            </div>
        </div>

        `
    }

    static styles = [
        materialIconStyles,
        css`
            .employee-list-header-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .employee-list-header-text {
                color: var(--color-orange);
                font-weight: 600;
            }

            .active {
                color: var(--color-orange)
            }

            .inactive {
                color: grey
            }
        `
    ]
}

customElements.define('employee-list', EmployeeList);