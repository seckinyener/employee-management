import { css, html, LitElement } from "lit";
import router from "../../router";
import { Router } from "@vaadin/router";
import { t, setLang, getLang } from "../../i18n";
import { materialIconStyles } from "../../style/common";

export class AppBar extends LitElement {

    static properties = {
        currentRoute: { state: true },
        selectedLang: { state: true, type: String }
    };

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this.currentRoute = router.location.pathname;
        window.addEventListener("vaadin-router-location-changed", this.handleRouteChange);
        this.selectedLang = getLang();
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

    setLang(lang) {
        document.documentElement.lang = lang;
        this.selectedLang = lang
        setLang(lang);
        this.requestUpdate();
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
                            <span>${t('employees')}</span>     
                        </div>
                        <div class="layout-banner-action-item ${this.currentRoute === '/create' ? 'active' : ''}" @click=${() => this.navigate('/create')}>
                            <span class="material-icons">add</span>
                            <span>${t('addNew')}</span>
                        </div>
                        <div class="languages">
                            <span class=${this.selectedLang === 'tr' ? 'active-lang' : 'passive-lang'} @click=${() => this.setLang('tr')}><img src="/assets/tr.png"></img></span>
                            <span class=${this.selectedLang === 'en' ? 'active-lang' : 'passive-lang'} @click=${() => this.setLang('en')}><img src="/assets/gb-eng.png"></img></span>
                        </div>
                    </div>    
                </div>
            </div>
        
        `
    }

    static styles = [
        materialIconStyles,
        css`
        .layout-banner-container {
            background-color: white;
            padding: .5rem;
            display: flex;
            height: 2rem
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
            align-items: center;
        }

        .layout-banner-action-item {
            display: flex;
            align-items: center;
            gap: .2rem;
            cursor: pointer;
            color: var(--color-orange-light);
        }

        .active {
            color: var(--color-orange);
        }

        .passive-lang {
            opacity: .5;
        }

        .languages {
            cursor: pointer;
            display: flex;
            gap: .5rem;
        }

        .languages img {
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            border-radius: 4px;
        }

        .languages img:hover {
            transform: scale(1.1);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }
        `
    ]
}

customElements.define('app-bar', AppBar);