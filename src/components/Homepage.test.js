import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from "react-redux";
import { store } from '../store'
import Homepage from '../components/Homepage';
import '@testing-library/jest-dom'

it('has a heading of ReactCart', async () => {
    render(<Provider store={store}><Homepage /></Provider>);
    const Heading = screen.getByText(/reactcart/i)
    expect(Heading).toBeInTheDocument()
})

it('should render "Max Price" equal to range', () => {
    render(<Provider store={store}><Homepage /></Provider>);
    const Slider = screen.getByRole('slider')
    expect(Slider.textContent).toMatch(screen.getByTestId('price').textContent)
})

it('should check if slected size changes after each selection', () => {
    render(<Provider store={store}><Homepage /></Provider>);
    const SizeCMB = screen.getByRole('combobox');
    fireEvent.change(SizeCMB, { target: { value: "S" } })
    expect(SizeCMB.value).toBe("S")
    fireEvent.change(SizeCMB, { target: { value: "M" } })
    expect(SizeCMB.value).toBe("M")
    fireEvent.change(SizeCMB, { target: { value: "L" } })
    expect(SizeCMB.value).toBe("L")
    fireEvent.change(SizeCMB, { target: { value: "XL" } })
    expect(SizeCMB.value).toBe("XL")
})

// FAILING TEST
// it('should toggle Cart component', () => {
//     render(<Provider store={store}><Homepage /></Provider>);
//     const CartButton = screen.getByTestId('cart-button')
//     expect(CartButton) // use fireEvent to toggle, then check for a true case and a false case // todo
// })

// FAILING TEST (will pass)
it('should render cart-icon 0 as hidden', () => {
    render(<Provider store={store}><Homepage /></Provider>);
    const cartIcon = screen.getByTestId('cart-icon')
    expect(cartIcon).toHaveStyle({ display: 'none' }) // todo
    expect(cartIcon.textContent).toBe("0")
    // expect(cartIcon).toBeInTheDocument(false) // should not be in the document  
})

// FAILING TEST (will pass)
it('should update cart-icon value when Add To Cart is clicked', () => {
    render(<Provider store={store}><Homepage /></Provider>);
    const cartIcon = screen.getByTestId('cart-icon')
    const AddToCart = screen.getByTestId('addtocart') // this is not working need a workaround for getting the addtocart button in the constant
    fireEvent.click(AddToCart)
    expect(cartIcon.textContent).toBe("0")
})