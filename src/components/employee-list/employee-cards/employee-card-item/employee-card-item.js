import { css, html, LitElement } from "lit";
import { removeEmployee } from "../../../../store/employee-store";
import { Router } from "@vaadin/router";
import { t } from "../../../../i18n";
import { state } from "lit/decorators.js";

export class EmployeeCardItem extends LitElement {

    static properties = {
        employee: {type: Object},
        showConfirmationModal: {type: Boolean},
        actionType: {state: true, type: String}
    }

    constructor() {
        super();
        this.employee = {};
        this.actionType = '';
    }

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

    deleteEmployee = () => {
        this.showConfirmationModal = true;
        this.actionType = 'delete'
    }

    deleteProceedHandler = () => {
        removeEmployee(this.employee.id);
        this.showConfirmationModal = false;
    }

    editEmployee = () => {
        this.showConfirmationModal = true;
    }

    editProceedHandler = () => {
        this.showConfirmationModal = false;
        Router.go(`/update/${this.employee.id}`)
    }

    confirmationProceedHandler = () => {
        if(this.actionType === 'delete') {
            this.deleteProceedHandler();
        } else {
            this.editProceedHandler();
        }
    }

    confirmationCancelHandler = () => {
        this.showConfirmationModal = false;
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
        .mode=${this.actionType}
        @proceed=${this.confirmationProceedHandler}
        @cancel=${this.confirmationCancelHandler}
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
            flex-direction: column !important;
            gap: .5rem !important;
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