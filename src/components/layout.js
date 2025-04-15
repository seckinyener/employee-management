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
        <div class="layout-banner-container">
            <div class="layout-banner-row">
                <div class="layout-banner-ing">
                    <img src="/assets/ing.svg"></img>
                    <span>ING</span>
                </div>
                <div class="layout-banner-actions">
                    <div class="layout-banner-action-item ${this.currentRoute === '/' ? 'active' : ''}" @click=${() => this.navigate('/')}>
                        <span class="material-icons">groups</span>
                        <span>Employees</span>     
                    </div>
                    <div class="layout-banner-action-item ${this.currentRoute === '/create' ? 'active' : ''}" @click=${() => this.navigate('/create')}>
                        <span class="material-icons">add</span>
                        <span>Add New</span>
                    </div>
                </div>
            </div>

        </div>

        <div class="child-routes">
            <slot></slot>
        </div>
        `
    }

    static styles = css`

        .layout-banner-container {
            background-color: white;
            padding: .5rem;
        }

        .layout-banner-row {
            display: flex;
            width: 100%;
            justify-content: space-between;
        }

        .layout-banner-ing {
            display: flex;
            align-items: center;
            gap: .5rem
        }

        .layout-banner-actions {
            display: flex;
            gap: .5rem;
        }

        .layout-banner-action-item {
            display: flex;
            align-items: center;
            gap: .2rem;
            cursor: pointer;
            color: #ff7e00a8;
        }

        .active {
            color: #ff7e00;
        }

        .material-icons {
            font-family: 'Material Icons';
            font-size: 24px;
            vertical-align: middle;
            cursor: pointer;
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