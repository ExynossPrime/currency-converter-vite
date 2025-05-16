import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.scss';

import { initCurrencyList } from './js/currencyList.js';
import { initCurrencyDetail } from './js/currencyDetail.js';
import { initConverter } from './js/converter.js';

const initThemeToggle = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('bi-moon-stars');
        icon.classList.add('bi-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('bi-moon-stars');
            icon.classList.add('bi-sun');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('bi-sun');
            icon.classList.add('bi-moon-stars');
        }
    });
};

const initNavigation = () => {
    const homeLink = document.getElementById('home-link');
    const converterLink = document.getElementById('converter-link');
    const backButton = document.getElementById('back-button');

    const currenciesPage = document.getElementById('currencies-page');
    const currencyDetailPage = document.getElementById('currency-detail-page');
    const converterPage = document.getElementById('converter-page');

    window.showCurrenciesPage = () => {
        currenciesPage.classList.add('active');
        currencyDetailPage.classList.remove('active');
        converterPage.classList.remove('active');

        homeLink.classList.add('active');
        converterLink.classList.remove('active');
    };

    window.showCurrencyDetailPage = () => {
        currencyDetailPage.classList.add('active');
        currenciesPage.classList.remove('active');
        converterPage.classList.remove('active');

        homeLink.classList.add('active');
        converterLink.classList.remove('active');
    };

    window.showConverterPage = () => {
        converterPage.classList.add('active');
        currenciesPage.classList.remove('active');
        currencyDetailPage.classList.remove('active');

        converterLink.classList.add('active');
        homeLink.classList.remove('active');
    };

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.showCurrenciesPage();
    });

    converterLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.showConverterPage();
    });

    backButton.addEventListener('click', () => {
        window.showCurrenciesPage();
    });
};

const initSearch = () => {
    const searchInput = document.getElementById('currency-search');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const currencyCards = document.querySelectorAll('.currency-card');

        currencyCards.forEach(card => {
            const code = card.dataset.code.toLowerCase();
            const parent = card.parentElement;

            if (code.includes(searchTerm)) {
                parent.style.display = 'block';
            } else {
                parent.style.display = 'none';
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initThemeToggle();
    initSearch();

    initCurrencyList();
    initCurrencyDetail();
    initConverter();
});
