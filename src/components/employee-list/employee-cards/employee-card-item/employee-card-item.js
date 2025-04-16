import { css, html, LitElement } from "lit";
import { removeEmployee } from "../../../../store/employee-store";
import { Router } from "@vaadin/router";
import { t } from "../../../../i18n";

export class EmployeeCardItem extends LitElement {

    static properties = {
        employee: {type: Object},
        showConfirmationModal: {type: Boolean}
    }

    constructor() {
        super();
        this.employee = {};
    }

    connectedCallback() {
        super.connectedCallback();
        console.log('employee card -> ', this.employee);
    }

    deleteEmployee = () => {
        console.log('delete employee..')
        this.showConfirmationModal = true;
    }

    deleteProceedHandler = () => {
        console.log('delete proceed handler')
        removeEmployee(this.employee.id);
        this.showConfirmationModal = false;
    }

    deleteCancelHandler = (e) => {
        this.showConfirmationModal = false;
    }

    editEmployee = () => {
        Router.go(`/update/${this.employee.id}`)
    }

    render() {
        return html`
        <div class="card">
            <div class="card-details">
                <div class="input-block">
                    <div class="input-block-label">${t('firstName')}:</div> 
                    <div><strong>${this.employee.firstName}</strong></div>
                </div>
                <div class="input-block">
                    <div class="input-block-label">${t('lastName')}:</div> 
                    <div><strong>${this.employee.lastName}</strong></div>
                </div>
                <div class="input-block">
                    <div class="input-block-label">${t('dateOfEmployment')}:</div> 
                    <div><strong>${this.employee.dateOfEmployment}</strong></div>
                </div>
                <div class="input-block">
                    <div class="input-block-label">${t('dateOfBirth')}:</div> 
                    <div><strong>${this.employee.dateOfBirth}</strong></div>
                </div>
                <div class="input-block">
                    <div class="input-block-label">${t('phone')}:</div> 
                    <div><strong>${this.employee.phone}</strong></div>
                </div>
                <div class="input-block">
                    <div class="input-block-label">${t('email')}:</div>
                    <div><strong>${this.employee.email}</strong></div>
                </div>
                <div class="input-block">
                    <div class="input-block-label">${t('department')}:</div> 
                    <div><strong>${this.employee.department}</strong></div>
                </div>
                <div class="input-block">
                    <div class="input-block-label">${t('position')}:</div> 
                    <div><strong>${this.employee.position}</strong></div>
                </div>
                <div class="btns">
                    <button class="edit" @click=${this.editEmployee}>✏️ ${t('edit')}</button>
                    <button class="delete" @click=${this.deleteEmployee}>🗑 ${t('delete')}</button>
                </div>
            </div>
      </div>
      <confirmation-modal 
        .employeeName=${this.employee.firstName + " " + this.employee.lastName}
        .isOpen=${this.showConfirmationModal}
        .employeeId=${this.employee.id}
        @proceed=${this.deleteProceedHandler}
        @cancel=${this.deleteCancelHandler}
        >
      </confirmation-modal>
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