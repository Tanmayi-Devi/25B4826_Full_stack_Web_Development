import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, Moon, Sun, Search, CheckCircle } from 'lucide-react';
import MenuGrid from './components/MenuGrid';
import CartSidebar from './components/CartSidebar';

// Reusable structural configuration array for our menu database
const MENU_DATA = [
  { id: 1, name: "Pepperoni Passion", price: 14.99, category: "pizza", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=80" },
  { id: 2, name: "Margherita Classic", price: 11.99, category: "pizza", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=80" },
  { id: 3, name: "Cheesy Bacon Smash", price: 9.99, category: "burger", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80" },
  { id: 4, name: "Spicy Crispy Zinger", price: 8.49, category: "burger", img: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500&auto=format&fit=crop&80" },
  { id: 5, name: "Premium Salmon Roll", price: 16.99, category: "sushi", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=80" }
];

export default function App() {
  // Application Dynamic Hooks States
  const [cart, setCart] = useState(() => {
    const local = localStorage.getItem('hub_cart');
    return local ? JSON.parse(local) : [];
  });
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('hub_theme') === 'dark');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Sync hooks states securely to persistent engine
  useEffect(() => {
    localStorage.setItem('hub_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('hub_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('hub_theme', 'light');
    }
  }, [darkMode]);

  // Derived Performance optimization calculations
  const globalItemCount = useMemo(() => cart.reduce((acc, curr) => acc + curr.quantity, 0), [cart]);
  const aggregateTotal = useMemo(() => cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0), [cart]);
  
  const filteredMenu = useMemo(() => {
    return MENU_DATA.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Cart State Modifiers
  const handleAddToCart = (item) => {
    setCart(prev => {
      const match = prev.find(i => i.id === item.id);
      if (match) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dynamic Shell Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Bites Hub
          </h1>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-full transition-all shadow-md shadow-orange-500/20"
            >
              <ShoppingBag size={20} />
              {globalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                  {globalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Control Filters Section */}
      <section className="max-w-7xl mx-auto px-4 w-full mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search items..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'pizza', 'burger', 'sushi'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                activeCategory === cat 
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Dynamic Grid Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-8">
        <MenuGrid items={filteredMenu} onAdd={handleAddToCart} />
      </main>

      {/* Sliding Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onUpdateQty={handleUpdateQuantity}
        totalPrice={aggregateTotal}
        onCheckout={() => {
          setIsCartOpen(false);
          setShowCheckoutModal(true);
        }}
      />

      {/* Innovation Tier: Dynamic Checkout State Animation Modal Overlay */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full text-center shadow-xl animate-scale-up border border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-lg font-bold">Order Dispatched Successfully!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Your kitchen hub assignment state pipeline is rendering properly!
            </p>
            <button
              onClick={() => {
                setShowCheckoutModal(false);
                setCart([]);
              }}
              className="mt-6 w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm rounded-xl transition-colors"
            >
              Back to Marketplace
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
