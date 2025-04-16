import { css, html, LitElement } from "lit";

export class ConfirmationModal extends LitElement {

    static properties = {
        employeeName: {type: String},
        employeeId: {type: Number},
        isOpen: {type: Boolean}
    }

    constructor() {
        super();
    }

    _cancel() {
        this.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
      }
    
      _proceed() {
        this.dispatchEvent(new CustomEvent('proceed', { bubbles: true, composed: true }));
      }
    
      _backgroundClick() {
        this._cancel(); 
      }

    render() {
        if(!this.isOpen) return html``;

        return html`
        <div class="modal-overlay" @click=${this._backgroundClick}>
            <div class="modal" @click=${(e) => e.stopPropagation()}>
            <div class="modal-header">
                Are you sure?
                <button class="close-btn" @click=${this._cancel}>❌</button>
            </div>
            <div>
                Selected employee record (<strong>${this.employeeName}</strong>) will be deleted.
            </div>
            <div class="modal-buttons">
                <button class="proceed" @click=${this._proceed}>Proceed</button>
                <button class="cancel" @click=${this._cancel}>Cancel</button>
            </div>
            </div>
        </div>
        `;
    }

    static styles = css`
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }

    .modal {
      background: #fff;
      padding: 24px;
      border-radius: 10px;
      width: 400px;
      max-width: 90%;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .modal-header {
      font-weight: bold;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .close-btn {
      background: transparent;
      border: none;
      font-size: 18px;
      cursor: pointer;
    }

    .modal-buttons {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .modal-buttons button {
      padding: 10px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      width: 100%;
    }

    .proceed {
      background-color: #d9534f;
      color: white;
    }

    .cancel {
      background-color: #f0f0f0;
    }
    `
}

customElements.define('confirmation-modal', ConfirmationModal);