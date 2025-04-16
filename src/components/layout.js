import { css, html, LitElement } from "lit";

export class Layout extends LitElement {
    render() {
        return html`
        <app-bar></app-bar>
        <div class="child-routes">
            <slot></slot>
        </div>
        `
    }

    static styles = css`
        .child-routes {
            padding: 1rem 2rem;
        }

    `
}

customElements.define("layout-component", Layout);