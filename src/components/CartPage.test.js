import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import CartPage from './CartPage'
import { Provider } from "react-redux";
import { store } from '../store'

const MockCartPage = () => {
    return (
        <Provider store={store}>
            <CartPage />
        </Provider>
    )
}


it('should display "Complete Checkout" as disabled when cart is empty', () => {
    render(<MockCartPage />)
    const CompleteCheckoutBtn = screen.getByRole('button', {
        name: /complete checkout/i
    })
    expect(CompleteCheckoutBtn).toBeDisabled();

})

it('should display modal on complete checkout', () => {
    render(<MockCartPage />)

})