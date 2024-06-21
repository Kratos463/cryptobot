import React, { createContext, useState, useContext } from 'react';

const ExchangeContext = createContext();
const useExchangeContext = () => useContext(ExchangeContext);

const ExchangeProvider = ({ children }) => {
  const [selectedExchange, setSelectedExchange] = useState(null);

  const storeSelectedExchange = (exchange) => {
    setSelectedExchange(exchange);
  };

  return (
    <ExchangeContext.Provider
      value={{
        selectedExchange,
        storeSelectedExchange
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
};

export { ExchangeProvider, useExchangeContext };
