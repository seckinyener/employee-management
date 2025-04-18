import { css, html, LitElement } from "lit";
import employeeState from "../../store/employee-store";
import { session$, updateViewMode } from "../../store/session.store";
import { VIEW_MODE_CARD, VIEW_MODE_TABLE } from "../../utils/constants";
import { t } from "../../i18n";
import { materialIconStyles } from "../../style/common";

export class EmployeeList extends LitElement {

    static properties = {
        selectedView: {state: true, type: String},
        hasAnyEmployee: {state: true, type: Boolean},
        hasAnyFilteredEmployee: {state: true, type: Boolean}
    }

    constructor() {
        super();
        this.selectedView = VIEW_MODE_TABLE;
        this.hasAnyEmployee = false;
        this.hasAnyFilteredEmployee = false;
    };

    connectedCallback() {
        super.connectedCallback();
        session$.subscribe((data) => {
            this.selectedView = data.viewMode;
        })
        window.addEventListener('languageChanged', this.languageChanged);
        employeeState.employee$.subscribe((data) => {
            this.hasAnyEmployee = data.employees.length > 0;
            this.hasAnyFilteredEmployee = data.filteredEmployees.length > 0
        });
    }

    disconnectedCallback() {
        window.removeEventListener('languageChanged', this.languageChanged);
    }

    languageChanged = () => {
        this.requestUpdate(); 
    }

    changeTheView = (selectedView) => {
        updateViewMode(selectedView);
    }

    render() {
        return html`
        <div>
            <div class="employee-list-header-row">
                <div class="employee-list-header-text">
                    <h2>${t('employeeList')}</h2>
                </div>
                <div class="employee-list-actions">
                    <employee-search></employee-search>
                    <div class="employee-list-action-buttons">
                        <span class="material-icons ${this.selectedView === VIEW_MODE_TABLE ? 'active' : 'inactive'}" @click=${() => this.changeTheView(VIEW_MODE_TABLE)}>menu</span>
                        <span class="material-icons ${this.selectedView === VIEW_MODE_CARD ? 'active' : 'inactive'}" @click=${() => this.changeTheView(VIEW_MODE_CARD)}>apps</span>
                    </div>
                </div>
            </div>
            ${this.hasAnyEmployee ? html`${this.hasAnyFilteredEmployee ? html` <div>
                ${this.selectedView === 'Table' ? html `<employee-table></employee-table` : html `<employee-cards></employee-cards`}
            </div>` : html`<div class="no-records-warning">${t('noRecordsAfterSearch')}</div>`}` : html `<div class="no-records-warning">${t('noRecords')}</div>`}

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

            .employee-list-actions {
                display: flex;
                align-items: center;
                gap: 4rem;
            }

            .active {
                color: var(--color-orange)
            }

            .inactive {
                color: grey
            }

            .no-records-warning {
                border: 1px solid;
                padding: 1rem;
                background: white;
                border-radius: 16px;
                border-color: var(--color-orange);
                text-align: center;
            }

        `
    ]
}

customElements.define('employee-list', EmployeeList);