import { html, LitElement } from "lit";

export class Layout extends LitElement {
    render() {
        return html`
            <div>Hebele</div>
            <slot></slot>
        `
    }
}

customElements.define("layout-component", Layout);