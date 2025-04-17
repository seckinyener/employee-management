import { css, html, LitElement } from "lit";

export class LandingPage extends LitElement{
    render() {
        return html`
        <div class="landing-page">
            <employee-list></employee-list>
        <div>
        `
    }

    static styles = css`
        .landing-page {
            height: 100%;
        }
    `
}

customElements.define('landing-page', LandingPage);