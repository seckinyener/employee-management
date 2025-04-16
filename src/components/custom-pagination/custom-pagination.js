import { css, html, LitElement } from "lit";
import { employee$, updateStore } from "../../store/employee-store";

export class CustomPagination extends LitElement {

    static properties = {
        currentPage: { type: Number},
        totalPages: { type: Number}
    }

    connectedCallback() {
        super.connectedCallback();
        this.subscription = employee$.subscribe(state => {
            const total = Math.ceil(state.filteredEmployees.length / state.pageSize);
            this.totalPages = total;
            this.currentPage = state.currentPage;
        });
    }

      disconnectedCallback() {
        this.subscription.unsubscribe();
      }

      changePage(page) {
        updateStore({ currentPage: page });
      }

    render() {
        return html`
        <div class="pagination">
            <button ?disabled=${this.currentPage === 1} @click=${() => this.changePage(this.currentPage - 1)}>‹</button>
            ${Array.from({ length: this.totalPages }, (_, i) => html`
              <button
                @click=${() => this.changePage(i + 1)}
                ?disabled=${i + 1 === this.currentPage}
              >
                ${i + 1}
              </button>
            `)}
            <button ?disabled=${this.currentPage === this.totalPages} @click=${() => this.changePage(this.currentPage + 1)}>›</button>
          </div>
        `
    }

    static styles = css`
    .pagination {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      gap: 8px;
    }
    button {
      padding: 0.5rem 1rem;
      border: none;
      background-color: var(--color-orange);
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `;
}

customElements.define('custom-pagination', CustomPagination);