import { css, html, LitElement } from "lit";
import router from '../router.js';
import { Router } from "@vaadin/router";

export class Layout extends LitElement {

    static properties = {
        currentRoute: { state: true }
    };

    connectedCallback() {
        super.connectedCallback();
        this.currentRoute = router.location.pathname;
        window.addEventListener("vaadin-router-location-changed", this.handleRouteChange);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("vaadin-router-location-changed", this.handleRouteChange);
    }

    handleRouteChange = (e) => {
        const event = e;
        this.currentRoute = event.detail.location.pathname;
    };

    navigate = (path) => {
        Router.go(path)
    }

    render() {
        return html`
        <nav>
            <div class="${this.currentRoute === '/' ? 'active' : ''}" @click=${() => this.navigate("/")}>Employees</div>
            <div class="${this.currentRoute === '/create' ? 'active' : ''}" @click=${() => this.navigate("/create")}>Create Employee</div>
        </nav>
        <div class="child-routes">
            <slot></slot>
        </div>
        `
    }

    static styles = css`

        .material-icons {
            font-family: 'Material Icons';
            font-size: 24px;
            vertical-align: middle;
        }

        .navigation-menu {
            background-color: white;
        }

        .child-routes {
            padding: 1rem 2rem;
        }

        nav {
            background: #2c3e50;
            color: white;
            padding: 1rem;
            display: flex;
            gap: 1rem;
        }

        nav div {
            cursor: pointer;
            padding: 0.5rem 1rem;
            border-radius: 4px;
        }

        nav div.active {
            background-color: #1abc9c;
            font-weight: bold;
        }
    `
}

customElements.define("layout-component", Layout);