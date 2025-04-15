import { html, LitElement } from "lit";

export class LandingPage extends LitElement{
    render() {
        return html`
            <div>Test</div>
        `
    }
}

customElements.define('landing-page', LandingPage);