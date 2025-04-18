import { css, html, LitElement } from "lit";
import { updateStore, getState, employee$ } from "../../store/employee-store";
import { session$, updateViewMode } from "../../store/session.store";
import { VIEW_MODE_CARD, VIEW_MODE_TABLE } from "../../utils/constants";
import { t } from "../../i18n";
import { materialIconStyles } from "../../style/common";

export class EmployeeList extends LitElement {

    static properties = {
        selectedView: {state: true, type: String},
        debounceTimer: {state: true},
        hasAnyEmployee: {state: true, type: Boolean}
    }

    constructor() {
        super();
        this.selectedView = VIEW_MODE_TABLE;
        this.debounceTimer = null;
        this.hasAnyEmployee = false;
    };

    connectedCallback() {
        super.connectedCallback();
        session$.subscribe((data) => {
            this.selectedView = data.viewMode;
        })
        window.addEventListener('languageChanged', this.languageChanged);
        employee$.subscribe((data) => {
            this.hasAnyEmployee = data.employees.length > 0
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

    debounce(fn, delay = 300) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(fn, delay);
    }
      
    handleSearch(e) {
        const query = e.target.value.trim().toLowerCase();
        this.debounce(() => {
            const { employees } = getState();
        
            const filtered = employees.filter(employee =>
            Object.values(employee).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(query)
            )
            );
        
            updateStore({
            searchQuery: query,
            currentPage: 1,
            filteredEmployees: filtered
            });
        });
    }

    render() {
        return html`
        <div>
            <div class="employee-list-header-row">
                <div class="employee-list-header-text">
                    <h2>${t('employeeList')}</h2>
                </div>
                <div class="employee-list-actions">
                    <div class="search-container">
                        <input class="search-input" placeholder="${t('search')}..." @input=${this.handleSearch} />
                    </div>
                    <div class="employee-list-action-buttons">
                        <span class="material-icons ${this.selectedView === VIEW_MODE_TABLE ? 'active' : 'inactive'}" @click=${() => this.changeTheView(VIEW_MODE_TABLE)}>menu</span>
                        <span class="material-icons ${this.selectedView === VIEW_MODE_CARD ? 'active' : 'inactive'}" @click=${() => this.changeTheView(VIEW_MODE_CARD)}>apps</span>
                    </div>
                </div>
            </div>
            ${this.hasAnyEmployee ? html` <div>
                ${this.selectedView === 'Table' ? html `<employee-table></employee-table` : html `<employee-cards></employee-cards`}
            </div>` : html `<div class="no-records-warning">There is no employee record. Please create a record.</div>`}

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
                gap: 2rem;
            }

            .active {
                color: var(--color-orange)
            }

            .inactive {
                color: grey
            }

            .search-container {
                display: flex;
                justify-content: center;
                margin: 1.5rem 0;
            }

            .search-input {
                width: 100%;
                max-width: 400px;
                padding: 0.75rem 1rem;
                border: 1px solid #ccc;
                border-radius: 16px; /* Tam yuvarlak kenarlar */
                outline: none;
                transition: border-color 0.2s ease, box-shadow 0.2s ease;
                background-color: #fff;
                box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            }

            .search-input:focus {
                box-shadow: 0 0 0 1px var(--color-orange);
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