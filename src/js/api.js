const API_KEY = 'cur_live_LdOIgSAss7D1OA19VIeBBZ22sx9kkahNN8Zb8b5Q';
const BASE_URL = 'https://api.currencyapi.com/v3';

export const fetchCurrencies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/latest?apikey=${API_KEY}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Ошибка при получении валют:', error);
        throw error;
    }
};

export const fetchCurrencyDetails = async (code) => {
    try {
        const response = await fetch(`${BASE_URL}/latest?apikey=${API_KEY}&currencies=${code}&base_currency=USD`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Ошибка при получении деталей валюты:', error);
        throw error;
    }
};

export const convertCurrency = async (from, to, amount) => {
    try {
        const response = await fetch(`${BASE_URL}/latest?apikey=${API_KEY}&currencies=${to}&base_currency=${from}`);
        const data = await response.json();
        const rate = data.data[to].value;
        return amount * rate;
    } catch (error) {
        console.error('Ошибка при конвертации валюты:', error);
        throw error;
    }
};
