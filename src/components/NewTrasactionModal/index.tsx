import { FormEvent, useState, useContext } from 'react'
import { api } from '../../services/api'

import Modal from 'react-modal'
import incomeImage from '../../assets/income.svg'
import outcomeImage from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg'
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import { useTransactions } from '../../hooks/useTrasactionsContext'

Modal.setAppElement('#root')

interface NewTrasactionModal {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTrasactionModal({ isOpen, onRequestClose }: NewTrasactionModal) {
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType] = useState('deposit')

    const { createTransaction } = useTransactions()

    async function handleCreateNewTrasaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        })

        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')
        onRequestClose()
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                overlayClassName='react-modal-overlay'
                className='react-modal-content'
            >
                <button
                    type='button'
                    onClick={onRequestClose}
                    className='react-modal-close'
                >
                    <img src={closeImg} alt="fechar" />
                </button>
                <Container onSubmit={handleCreateNewTrasaction}>
                    <h2>Cadastrar transação</h2>

                    <input
                        type="text"
                        placeholder="Titulo"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Valor"
                        value={amount}
                        onChange={event => setAmount(Number(event.target.value))}
                    />

                    <TransactionTypeContainer>
                        <RadioBox
                            type='button'
                            onClick={() => setType('deposit')}
                            isActive={type === 'deposit'}
                            color='#33cc9463'
                        >
                            <img src={incomeImage} alt="Entrada" />
                            <span>Entrada</span>
                        </RadioBox>
                        <RadioBox
                            type='button'
                            onClick={() => setType('withdraw')}
                            isActive={type === 'withdraw'}
                            color='#e52e4d63'
                        >
                            <img src={outcomeImage} alt="saida" />
                            <span>Saida</span>
                        </RadioBox>

                    </TransactionTypeContainer>

                    <input
                        type="text"
                        placeholder="Categoria"
                        value={category}
                        onChange={event => setCategory(event.target.value)}
                    />

                    <button type="submit">
                        Cadastrar
                    </button>
                </Container>
            </Modal>
        </>
    )
}