import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartSidebar({ isOpen, onClose, cart, onUpdateQty, totalPrice, onCheckout }) {
  return (
    <>
      {/* Background Mask */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Main Container Core Slide Framework */}
      <aside 
        className={`fixed top-0 right-0 z-50 h-full w-full sm:max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl transition-transform duration-300 transform flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <ShoppingBag size={18} className="text-orange-500" />
            <span>Your Active Cart</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Dynamic Mapping List View */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 gap-2">
              <ShoppingBag size={40} strokeWidth={1.5} />
              <p className="text-sm">Your dynamic ordering tree state is currently empty.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center justify-between gap-4 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/60">
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-sm text-slate-800 dark:text-slate-200 truncate">{item.name}</h5>
                  <p className="text-xs font-semibold text-orange-500 mt-0.5">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-1 gap-2">
                  <button 
                    onClick={() => onUpdateQty(item.id, -1)}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQty(item.id, 1)}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Aggregations Panel */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex justify-between items-center mb-4 text-sm font-semibold">
            <span className="text-slate-500">Aggregate Due:</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-50">${totalPrice.toFixed(2)}</span>
          </div>
          <button
            disabled={cart.length === 0}
            onClick={onCheckout}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-600 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-orange-500/10 active:scale-[0.99]"
          >
            Confirm &amp; Complete Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
