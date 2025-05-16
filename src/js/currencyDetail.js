import { fetchCurrencyDetails } from './api.js';

export function initCurrencyDetail() {
    const currencyDetail = document.getElementById('currency-detail');

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

    async function loadCurrencyDetail(code) {
        try {
            currencyDetail.innerHTML = '<div class="card-body"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Загрузка...</span></div></div>';
            const data = await fetchCurrencyDetails(code);
            const currency = data[code];

            const symbol = getCurrencySymbol(code);
            const gradient = getRandomGradient();

            currencyDetail.innerHTML = `
        <div class="card-header d-flex align-items-center">
          <span class="currency-symbol" style="background: ${gradient}">${symbol}</span>
          <h3 class="mb-0">Детали ${code}</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6 mb-3">
              <div class="detail-item">
                <h5>Код валюты</h5>
                <p class="fs-4">${code}</p>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="detail-item">
                <h5>Значение (к USD)</h5>
                <p class="fs-4">${currency.value}</p>
              </div>
            </div>
            <div class="col-12">
              <div class="detail-item">
                <h5>Последнее обновление</h5>
                <p>${new Date(currency.last_updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      `;
        } catch (error) {
            currencyDetail.innerHTML = `<div class="card-body"><div class="alert alert-danger">Не удалось загрузить детали валюты: ${error.message}</div></div>`;
        }
    }

    window.loadCurrencyDetail = loadCurrencyDetail;

    return { loadCurrencyDetail };
}
