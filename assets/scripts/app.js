import modular from 'modujs';
import globals from './globals';
import * as modules from './modules';
import { html } from './utils/environment';

const app = new modular({
    modules: modules
});

window.onload = (event) => {
    // const $style = document.getElementById("stylesheet");
    const $style = document.getElementById("app-css");

    if ($style.isLoaded) {
        init();
    } else {
        $style.addEventListener('load', (event) => {
            init();
        });
    }
};

function init() {
    app.init(app);
    globals();

    html.classList.add('is-loaded', 'is-ready');
    html.classList.remove('is-loading');
}

