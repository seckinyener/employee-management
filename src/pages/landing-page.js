import { html, LitElement } from "lit";

export class LandingPage extends LitElement{
    render() {
        return html`
            <employee-list></employee-list>
        `
    }
}

customElements.define('landing-page', LandingPage);