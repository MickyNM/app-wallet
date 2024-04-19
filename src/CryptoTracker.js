
import React from 'react';
import { useQuery } from 'react-query';

const useGetCardData = (cryptoName, options) => {
    return useQuery(`${cryptoName}-card`, async () => {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName}`);
        return await response.json();
    }, options);
};


export const formatPrice = (price) => {
    const formatConfig = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatConfig.format(price);
};

const formatPlusMinus = (priceChange) => {
    const isPositive = Math.sign(priceChange) >= 0;

    return (
        <span className={`${isPositive ? 'positive' : 'negative'}`}>
            {`${isPositive ? '+' : ''}${priceChange.toFixed(2)}%`}
        </span>
    );
};

const CryptoTracker = ({ cryptoName }) => {

    const { data, isLoading } = useGetCardData(cryptoName, {
        refetchInterval: 6000,
        staleTime: 6000,
    });

    if (isLoading) return null;
    const { market_data: marketData } = data;
    let value = (document.getElementById('value')).value;
    const btc_value = parseInt(formatPrice(marketData?.current_price?.usd).replace(/^\$/, '').replace(/,/g, ''));
    const btc_sum = formatPrice(value * (btc_value));

    document.getElementById('calculation').innerHTML = `${btc_sum} USD`;

    return (
        <div className="top-data">
            <h4 className="crypto-price">
                1BTC={formatPrice(marketData?.current_price?.usd)}
            </h4>

            <div className="crypto-price">
                {formatPlusMinus(marketData?.price_change_percentage_24h)}
            </div>
        </div>

    );
};

export default CryptoTracker;
