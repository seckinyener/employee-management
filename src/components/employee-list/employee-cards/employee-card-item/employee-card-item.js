import { css, html, LitElement } from "lit";

export class EmployeeCardItem extends LitElement {

    static properties = {
        employee: {type: Object}
    }

    constructor() {
        super();
        this.employee = {};
    }

    connectedCallback() {
        super.connectedCallback();
        console.log('employee card -> ', this.employee);
    }

    render() {
        return html`
        <div class="card">
            <div class="card-details">
                <div class="input-block">
                    <div class="input-block-label">First Name:</div> 
                    <div><strong>${this.employee.firstName}</strong></div>
                </div>
                <div class="input-block">
                    <div class="input-block-label">Last Name:</div> 
                    <div><strong>${this.employee.lastName}</strong></div>
                </div>
                <div class="input-block">
                    <div class="input-block-label">Date of Employment:</div> 
                    <div><strong>${this.employee.dateOfEmployment}</strong></div>
                </div>
                <div class="input-block">
                    <div class="input-block-label">Date of Birth:</div> 
                    <div><strong>${this.employee.dateOfBirth}</strong></div>
                </div>
                <div class="input-block">
                    <div class="input-block-label">Phone:</div> 
                    <div><strong>${this.employee.phone}</strong></div>
                </div>
                <div class="input-block">
                    <div class="input-block-label">Email:</div>
                    <div><strong>${this.employee.email}</strong></div>
                </div>
                <div class="input-block">
                    <div class="input-block-label">Department:</div> 
                    <div><strong>${this.employee.department}</strong></div>
                </div>
                <div class="input-block">
                    <div class="input-block-label">Position:</div> 
                    <div><strong>${this.employee.position}</strong></div>
                </div>
                <div class="btns">
                    <button class="edit">✏️ Edit</button>
                    <button class="delete">🗑 Delete</button>
                </div>
            </div>
      </div>
        `
    }

    static styles = css`
        .card { 
            border: 1px solid #ccc; 
            padding: 1rem; 
            border-radius: 8px;
            background-color: white
        }

        .card-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px 16px;
        },

        .input-block {
            display: flex !important;
            flex-direction: column;
            gap: .5rem;
        }

        .input-block-label {
            opacity: .5;
        }

        .btns { 
            display: flex; 
            gap: 0.5rem; 
        }

        button { 
            padding: 0.5rem 1rem; 
            border: none; 
            cursor: pointer; 
            border-radius: 8px;
        }

        .edit { 
            background-color: #5c4efc; 
            color: white; 
        }

        .delete { 
            background-color: #ff6600; 
            color: white; 
        }
  `;
}

customElements.define("employee-card-item", EmployeeCardItem);