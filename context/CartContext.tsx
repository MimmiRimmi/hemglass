import React, { createContext, useContext, useState, ReactNode } from 'react';
type CartContextType = {
    cart: any[];
    addToCart: (item: any) => void;
    emptyCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

type CartProviderProps = {
    children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<any[]>([]);

    const addToCart = (item: any) => setCart((prev) => [...prev, item]);
    const emptyCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, emptyCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};