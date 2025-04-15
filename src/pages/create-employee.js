import { css, html, LitElement } from "lit";

export class CreateEmployee extends LitElement {
    render() {
        return html`
            <div>
                <h2 class="create-employee-label">Create Employee</h2>
                <employee-form></employee-form>
            </div>
            `
    }

    static styles = css`
        .create-employee-label {
            color: darkorange;
        }
    `
}

customElements.define('create-employee', CreateEmployee);