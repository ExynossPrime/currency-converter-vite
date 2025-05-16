import { fetchCurrencies } from './api.js';

export function initCurrencyList() {
    const currenciesList = document.getElementById('currencies-list');

    const getCurrencySymbol = (code) => {
        return code.charAt(0);
    };

    const getRandomGradient = () => {
        const gradients = [
            'linear-gradient(135deg, #6366f1, #8b5cf6)',
            'linear-gradient(135deg, #10b981, #059669)',
            'linear-gradient(135deg, #f59e0b, #d97706)',
            'linear-gradient(135deg, #ef4444, #dc2626)',
            'linear-gradient(135deg, #0ea5e9, #0284c7)',
            'linear-gradient(135deg, #8b5cf6, #7c3aed)'
        ];
        return gradients[Math.floor(Math.random() * gradients.length)];
    };

    async function loadCurrencies() {
        try {
            currenciesList.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Загрузка...</span></div></div>';
            const currencies = await fetchCurrencies();

            currenciesList.innerHTML = '';

            Object.entries(currencies).forEach(([code, currency]) => {
                const col = document.createElement('div');
                col.className = 'col-sm-6 col-md-4 col-lg-3';

                const card = document.createElement('div');
                card.className = 'card currency-card h-100';
                card.dataset.code = code;

                const symbol = getCurrencySymbol(code);
                const gradient = getRandomGradient();

                card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">
              <span class="currency-symbol" style="background: ${gradient}">${symbol}</span>
              ${code}
            </h5>
            <p class="card-text">Значение: ${currency.value}</p>
          </div>
        `;

                card.addEventListener('click', () => {
                    window.showCurrencyDetailPage();
                    window.loadCurrencyDetail(code);
                });

                col.appendChild(card);
                currenciesList.appendChild(col);
            });
        } catch (error) {
            currenciesList.innerHTML = `<div class="col-12"><div class="alert alert-danger">Не удалось загрузить валюты: ${error.message}</div></div>`;
        }
    }

    loadCurrencies();

    return { loadCurrencies };
}
