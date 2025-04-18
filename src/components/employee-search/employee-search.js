import { css, html, LitElement } from "lit";
import employeeStore from "../../store/employee-store";
import { t } from "../../i18n";

export class EmployeeSearch extends LitElement{

    static properties = {
        debounceTimer: {state: true}, 
    }

    constructor() {
        super();
        this.debounceTimer = null;
    };

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('languageChanged', this.languageChanged);
    }

    disconnectedCallback() {
        window.removeEventListener('languageChanged', this.languageChanged);
    }

    languageChanged = () => {
        this.requestUpdate(); 
    }

    debounce(fn, delay = 300) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(fn, delay);
    }

    handleSearch(e) {
        const query = e.target.value.trim().toLowerCase();
        this.debounce(() => {
            const { employees } = employeeStore.getState();
        
            const filtered = employees.filter(employee =>
            Object.values(employee).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(query)
            )
            );
        
            employeeStore.updateStore({
                searchQuery: query,
                currentPage: 1,
                filteredEmployees: filtered
            });
        });
    }

    render() {
        return html`
            <div class="search-container">
                <input class="search-input" placeholder="${t('search')}..." @input=${this.handleSearch} />
            </div>
        `
    }

    static styles = css`
        search-container {
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
    `
}

customElements.define('employee-search', EmployeeSearch);