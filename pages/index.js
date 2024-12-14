import { useState, useEffect } from 'react';
import Select from 'react-select';
import styles from '../styles/Home.module.css';

const currencies = [
  { value: 'USD', label: 'United States Dollar' },
  { value: 'EUR', label: 'Euro' },
  { value: 'GBP', label: 'British Pound' },
  { value: 'JPY', label: 'Japanese Yen' },
  { value: 'PHP', label: 'Philippine Peso' },
  { value: 'SGD', label: 'Singapore Dollar' },
  { value: 'AUD', label: 'Australian Dollar' },
  { value: 'CAD', label: 'Canadian Dollar' },
  { value: 'CHF', label: 'Swiss Franc' },
  { value: 'CNY', label: 'Chinese Yuan' },
  { value: 'HKD', label: 'Hong Kong Dollar' },
  { value: 'KRW', label: 'South Korean Won' },
  { value: 'INR', label: 'Indian Rupee' },
  { value: 'MYR', label: 'Malaysian Ringgit' }
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState({ value: 'USD', label: 'United States Dollar' });
  const [toCurrency, setToCurrency] = useState({ value: 'PHP', label: 'Philippine Peso' });
  const [rate, setRate] = useState(55.86);

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  const handleConvert = () => {
    const rates = {
      'USD-PHP': 55.86,
      'EUR-PHP': 61.23,
      'GBP-PHP': 71.45,
      'SGD-PHP': 41.25,
      'USD-SGD': 1.35,
      'EUR-SGD': 1.48,
      'GBP-SGD': 1.73
    };
    setRate(rates[`${fromCurrency.value}-${toCurrency.value}`] || 55.86);
  };

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: darkMode ? '#2d3748' : 'white',
      borderColor: darkMode ? '#4a5568' : '#e2e8f0',
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: darkMode ? '#2d3748' : 'white',
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isFocused 
        ? darkMode ? '#4a5568' : '#e2e8f0'
        : darkMode ? '#2d3748' : 'white',
      color: darkMode ? 'white' : 'black',
    }),
    singleValue: (styles) => ({
      ...styles,
      color: darkMode ? 'white' : 'black',
    }),
    input: (styles) => ({
      ...styles,
      color: darkMode ? 'white' : 'black',
    }),
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ''}`}>
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className={styles.themeToggle}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      <h1 className={styles.title}>Currency Exchange</h1>
      
      <div className={styles.grid}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={styles.input}
          placeholder="Enter amount"
        />
        
        <Select
          options={currencies}
          value={fromCurrency}
          onChange={setFromCurrency}
          className={styles.select}
          isSearchable
          styles={selectStyles}
        />
        
        <Select
          options={currencies}
          value={toCurrency}
          onChange={setToCurrency}
          className={styles.select}
          isSearchable
          styles={selectStyles}
        />
        
        <button onClick={handleConvert} className={styles.button}>
          Convert
        </button>
      </div>

      <div className={styles.result}>
        {amount} {fromCurrency.value} = {(amount * rate).toFixed(2)} {toCurrency.value}
      </div>
    </div>
  );
}
