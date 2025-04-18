import { css, html, LitElement } from "lit";
import { t } from "../../i18n";

export class ConfirmationModal extends LitElement {

    static properties = {
        employeeName: {type: String},
        isOpen: {type: Boolean},
        mode: {type: String}
    }

    constructor() {
        super();
    }

    _cancel() {
      this.dispatchEvent(new CustomEvent('cancel'));
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
                ${t('areYouSure')}
                <button class="close-btn" @click=${this._cancel}>X</button>
            </div>

            <div class="modal-message">
              ${this.mode === 'delete' ? html`<p .innerHTML=${t('deleteConfirmation', {name: this.employeeName})}></p>` : html`<p .innerHTML=${t('updateConfirmation', {name: this.employeeName})}></p>`}
                
            </div>
            <div class="modal-buttons">
                <button class="proceed" @click=${this._proceed}>${t('proceed')}</button>
                <button class="cancel" @click=${this._cancel}>${t('cancel')}</button>
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
      color: var(--color-orange);
    }

    .close-btn {
      background: transparent;
      border: none;
      font-size: 18px;
      cursor: pointer;
      color: var(--color-orange);
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
      background-color: var(--color-orange);
      color: white;
    }

    .proceed:hover {
      background-color: var(--color-orange-dark);
    }

    .cancel {
      background-color: white;
      border: 1px solid #5c4efc !important;
      color: #5c4efc
    }

    .cancel:hover {
      background-color: #5c4efc;
      color: white;
    }
    `
}

customElements.define('confirmation-modal', ConfirmationModal);