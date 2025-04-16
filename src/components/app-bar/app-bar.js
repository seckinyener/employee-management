import { css, html, LitElement } from "lit";
import router from "../../router";
import { Router } from "@vaadin/router";
import { t } from "../../i18n";
import { session$, updateSelectedLanguage } from "../../store/session.store";
import { materialIconStyles } from "../../style/common";

export class AppBar extends LitElement {

    static properties = {
        currentRoute: { state: true },
        selectedLang: { state: true, type: String }
    };

    constructor() {
        super();
        this.fetchCurrentLang();
    }

    connectedCallback() {
        super.connectedCallback();
        this.currentRoute = router.location.pathname;
        window.addEventListener("vaadin-router-location-changed", this.handleRouteChange);
        session$.subscribe((sessionDetails) => {
            this.selectedLang = sessionDetails.selectedLang;
        })
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
        this.requestUpdate();
    }

    fetchCurrentLang() {
        const lang = document.documentElement.lang || 'en';
        updateSelectedLanguage(lang);
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
                        <div>
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
            color: #ff7e00a8;
        }

        .active {
            color: #ff6600;
        }

        .passive-lang {
            opacity: .5;
        }
        `
    ]
}

customElements.define('app-bar', AppBar);