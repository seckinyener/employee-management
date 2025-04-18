import { css, html, LitElement } from "lit";
import employeeState from "../../store/employee-store";
import { Subject, takeUntil } from "rxjs";

export class CustomPagination extends LitElement {
  static properties = {
    currentPage: {type: Number },
    totalPages: {type: Number },
    destroyed$: {state: true}
  };

  constructor() {
    super();
    this.destroyed$ = new Subject(false);
  }

  connectedCallback() {
    super.connectedCallback();
    employeeState.employee$.pipe(takeUntil(this.destroyed$)).subscribe(state => {
      const total = Math.ceil(state.filteredEmployees.length / state.pageSize);
      this.totalPages = total;
      this.currentPage = state.currentPage;
    });
  }

  disconnectedCallback() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  changePage(page) {
    if (page >= 1 && page <= this.totalPages) {
      employeeState.updateStore({ currentPage: page });
    }
  }

  getPagesToDisplay() {
    const pages = [];
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    pages.push(1);

    if (current > 4) pages.push("...");

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 3) pages.push("...");

    pages.push(total);

    return pages;
  }

  render() {
    const pages = this.getPagesToDisplay();

    return html`
      <div class="pagination">
        <button ?disabled=${this.currentPage === 1} @click=${() => this.changePage(1)}>«</button>
        <button ?disabled=${this.currentPage === 1} @click=${() => this.changePage(this.currentPage - 1)}>‹</button>

        ${pages.map(p =>
          p === "..."
            ? html`<span class="dots">...</span>`
            : html`
                <button
                  class=${this.currentPage === p ? 'active' : ''}
                  @click=${() => this.changePage(p)}
                >
                  ${p}
                </button>
              `
        )}

        <button ?disabled=${this.currentPage === this.totalPages} @click=${() => this.changePage(this.currentPage + 1)}>›</button>
        <button ?disabled=${this.currentPage === this.totalPages} @click=${() => this.changePage(this.totalPages)}>»</button>
      </div>
    `;
  }

  static styles = css`
    .pagination {
      padding: 1rem;
      display: flex;
      justify-content: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    button {
      padding: 0.5rem;
      min-width: 2.2rem;
      border: none;
      background-color: #eee;
      color: #333;
      border-radius: 50%;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    button.active {
      background-color: var(--color-orange);
      color: white;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .dots {
      padding: 0.5rem;
      min-width: 2.2rem;
      text-align: center;
      color: #888;
      font-weight: bold;
    }
  `;
}

customElements.define('custom-pagination', CustomPagination);
