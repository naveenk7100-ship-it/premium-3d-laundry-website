'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Customer } from '@/types/database';
import { db, SEED_CUSTOMERS } from '@/services/storage';

interface AuthContextType {
  currentUser: Customer | null;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (email: string) => boolean;
  signup: (name: string, email: string, phone: string, address: string) => Customer;
  logout: () => void;
  switchUser: (userId: string) => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Customer | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const refreshUser = () => {
    if (typeof window !== 'undefined') {
      db.init();
      const user = db.getCurrentUser();
      setCurrentUser(user);
    }
  };

  useEffect(() => {
    refreshUser();

    const handleUpdate = () => {
      refreshUser();
    };

    window.addEventListener('freshfold_db_update', handleUpdate);
    return () => window.removeEventListener('freshfold_db_update', handleUpdate);
  }, []);

  const login = (email: string) => {
    const customers = db.getCustomers();
    const found = customers.find(
      (c) => c.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (found) {
      db.setCurrentUser(found);
      setCurrentUser(found);
      setIsAuthModalOpen(false);
      return true;
    }
    // If not found, create a new customer
    const newCust = signup(
      email.split('@')[0],
      email,
      '+1 (555) 234-5678',
      '742 Evergreen Terrace, Metropolis'
    );
    db.setCurrentUser(newCust);
    setCurrentUser(newCust);
    setIsAuthModalOpen(false);
    return true;
  };

  const signup = (name: string, email: string, phone: string, address: string) => {
    const customers = db.getCustomers();
    const newCustomer: Customer = {
      id: `cust-${Date.now()}`,
      name,
      email,
      phone,
      address,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      tier: 'Silver',
      loyaltyPoints: 100, // welcome bonus
      totalOrders: 0,
      totalSpent: 0,
      referralCode: name.toUpperCase().slice(0, 5) + '25',
      joinedDate: new Date().toISOString().split('T')[0],
      role: 'customer',
    };
    customers.push(newCustomer);
    localStorage.setItem('freshfold_customers', JSON.stringify(customers));
    db.setCurrentUser(newCustomer);
    setCurrentUser(newCustomer);
    setIsAuthModalOpen(false);
    return newCustomer;
  };

  const logout = () => {
    // default back to a customer or null
    const def = SEED_CUSTOMERS[0];
    db.setCurrentUser(def);
    setCurrentUser(def);
  };

  const switchUser = (userId: string) => {
    const customer = db.getCustomerById(userId);
    if (customer) {
      db.setCurrentUser(customer);
      setCurrentUser(customer);
    }
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        login,
        signup,
        logout,
        switchUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
