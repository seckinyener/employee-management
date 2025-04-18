import { css, html, LitElement } from "lit";
import { t } from "../i18n";

export class CreateEmployee extends LitElement {

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

    render() {
        return html`
            <div>
                <h2 class="create-employee-label">${t('addNew')}</h2>
                <div class="employee-form">
                    <employee-form></employee-form>
                </div>
            </div>
            `
    }

    static styles = css`
        .create-employee-label {
            color: var(--color-orange);
        }

        @media (max-width: 768px) {
            .employee-form {
                padding-bottom: 1rem;
            }
        }
    `
}

customElements.define('create-employee', CreateEmployee);