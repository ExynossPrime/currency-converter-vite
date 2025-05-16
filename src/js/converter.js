import { fetchCurrencies, convertCurrency } from './api.js';

export function initConverter() {
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const resultInput = document.getElementById('result-input');
    const convertButton = document.getElementById('convert-button');
    const swapButton = document.getElementById('swap-button');
    const resultDiv = document.getElementById('result');

    async function loadCurrencyOptions() {
        try {
            const currencies = await fetchCurrencies();

            fromCurrencySelect.innerHTML = '';
            toCurrencySelect.innerHTML = '';

            Object.keys(currencies).forEach(code => {
                const fromOption = document.createElement('option');
                fromOption.value = code;
                fromOption.textContent = code;

                const toOption = document.createElement('option');
                toOption.value = code;
                toOption.textContent = code;

                fromCurrencySelect.appendChild(fromOption);
                toCurrencySelect.appendChild(toOption);
            });

            fromCurrencySelect.value = 'USD';
            toCurrencySelect.value = 'EUR';
        } catch (error) {
            console.error('Не удалось загрузить варианты валют:', error);
        }
    }

    convertButton.addEventListener('click', async () => {
        try {
            const from = fromCurrencySelect.value;
            const to = toCurrencySelect.value;
            const amount = parseFloat(amountInput.value);

            if (isNaN(amount) || amount <= 0) {
                alert('Пожалуйста, введите корректную сумму');
                return;
            }

            convertButton.disabled = true;
            convertButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Конвертация...';
            resultDiv.style.display = 'none';

            const convertedAmount = await convertCurrency(from, to, amount);

            resultInput.value = convertedAmount.toFixed(2);

            resultDiv.innerHTML = `
        <h4 class="mb-0">${amount} ${from} = <strong>${convertedAmount.toFixed(2)} ${to}</strong></h4>
        <p class="mb-0 mt-2">1 ${from} = ${(convertedAmount / amount).toFixed(4)} ${to}</p>
      `;
            resultDiv.style.display = 'block';

            convertButton.disabled = false;
            convertButton.textContent = 'Конвертировать';
        } catch (error) {
            resultDiv.className = 'alert alert-danger mt-4';
            resultDiv.innerHTML = `<p class="mb-0">Ошибка конвертации: ${error.message}</p>`;
            resultDiv.style.display = 'block';

            convertButton.disabled = false;
            convertButton.textContent = 'Конвертировать';
        }
    });

    swapButton.addEventListener('click', () => {
        const fromValue = fromCurrencySelect.value;
        const toValue = toCurrencySelect.value;

        fromCurrencySelect.value = toValue;
        toCurrencySelect.value = fromValue;

        if (resultInput.value) {
            amountInput.value = resultInput.value;
            resultInput.value = '';
            resultDiv.style.display = 'none';
        }
    });

    loadCurrencyOptions();

    return { loadCurrencyOptions };
}
