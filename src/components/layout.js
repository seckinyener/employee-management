import { html, LitElement } from "lit";

export class Layout extends LitElement {
    render() {
        return html`
            <div>Hebele</div>
        `
    }
}

window.customElements.define("layout-component", Layout);