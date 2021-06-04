import React, { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { createServer, Model } from 'miragejs'
import { GlobalStyle } from "./styles/global";
import { throws } from "assert";
import { NewTrasactionModal } from "./components/NewTrasactionModal";
import { TransactionsProvider } from "./hooks/useTrasactionsContext";

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelancer",
          type: "deposit",
          category: 'DEV',
          amount: 6000,
          createdAt: new Date('2019-02-12 09:00:00')
        },
        {
          id: 2,
          title: "aluguel",
          type: "withdraw",
          category: 'casa',
          amount: 600,
          createdAt: new Date('2019-02-11 09:00:00')
        },
        {
          id: 3,
          title: "Freelancer",
          type: "deposit",
          category: 'DEV',
          amount: 6000,
          createdAt: new Date('2019-02-12 09:00:00')
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
  }
})

export default function App() {

  const [isNewTransactionIsOpen, setIsNewTransactionIsOpen] = useState(false)


  function handleOpenNewTransactionModal() {
    setIsNewTransactionIsOpen(true)
  }
  function handleCloseNewTransactionModal() {
    setIsNewTransactionIsOpen(false)
  }
  return (
    <TransactionsProvider>
      <Header onOpenNewTrasactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTrasactionModal isOpen={isNewTransactionIsOpen} onRequestClose={handleCloseNewTransactionModal} />

      <GlobalStyle />
    </TransactionsProvider>
  );
}
