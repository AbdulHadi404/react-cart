import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from "react-redux";
import { store } from '../store'
import Homepage from '../components/Homepage';
import '@testing-library/jest-dom'

const MockHomePage = () => {
    return (
        <Provider store={store}><Homepage /></Provider>
    )
}


it('has a heading of ReactCart', async () => {
    render(<MockHomePage />);
    const Heading = screen.getByText(/reactcart/i)
    expect(Heading).toBeInTheDocument()
})

it('should render "Max Price" equal to range', () => {
    render(<MockHomePage />);
    const Slider = screen.getByRole('slider')
    expect(Slider.textContent).toMatch(screen.getByTestId('price').textContent)
})

it('should check if slected size changes after each selection', () => {
    render(<MockHomePage />);
    const SizeCMB = screen.getByRole('combobox', { name: /size:/i });
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
//     render(<MockHomePage/>);
//     const CartButton = screen.getByTestId('cart-button')
//     fireEvent.click(CartButton)
//     expect(screen.getBy).toBeVisible // use fireEvent to toggle, then check for a true case and a false case // todo
// })

// FAILING TEST 
// it('should render cart-icon 0 as hidden', () => {
//     render(<MockHomePage/>);
//     const cartIcon = screen.getByTestId('cart-icon')
//     expect(cartIcon).toHaveStyle({ display: 'none' }) // todo
//     expect(cartIcon.textContent).toBe("0")
//     // expect(cartIcon).toBeInTheDocument(false) // should not be in the document  
// })

// FAILING TEST 
it('should update cart-icon value when Add To Cart is clicked', () => {
    render(<MockHomePage />);
    const AddToCart = screen.queryAllByTestId('addtocart')[1] // this is not working need a workaround for getting the addtocart button in the constant
    // console.log(AddToCart[1])
    fireEvent.click(AddToCart)
    fireEvent.click(AddToCart)
    const cartIcon = screen.getByTestId('cart-icon')
    expect(cartIcon.textContent).toBe("2");
})