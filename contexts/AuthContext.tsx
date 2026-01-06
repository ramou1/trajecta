'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Usuario } from '@/types';

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string) => boolean;
  cadastrar: (nome: string, email: string, telefone: string, senha: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage (apenas no client-side)
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('trajecta_user');
      if (storedUser) {
        setUsuario(JSON.parse(storedUser));
      }
    }
  }, []);

  const cadastrar = (nome: string, email: string, telefone: string, senha: string): boolean => {
    // MVP - aceita qualquer dado
    if (typeof window === 'undefined') return false;
    
    const novoUsuario: Usuario = {
      id: Date.now().toString(),
      nome: nome || 'Usuário',
      email: email || 'usuario@email.com',
      telefone: telefone || '',
      senha: senha || 'senha',
      premium: false,
      createdAt: new Date()
    };

    // Salvar no localStorage (mock)
    const existingUsers = JSON.parse(localStorage.getItem('trajecta_users') || '[]');
    existingUsers.push(novoUsuario);
    localStorage.setItem('trajecta_users', JSON.stringify(existingUsers));
    localStorage.setItem('trajecta_user', JSON.stringify(novoUsuario));
    setUsuario(novoUsuario);
    return true;
  };

  const login = (email: string, senha: string): boolean => {
    // MVP - aceita qualquer email e senha
    if (typeof window === 'undefined') return false;
    
    // Buscar usuário ou criar um temporário
    const users = JSON.parse(localStorage.getItem('trajecta_users') || '[]');
    let user = users.find((u: Usuario) => u.email === email && u.senha === senha);
    
    // Se não encontrou, aceita mesmo assim (autenticação fictícia)
    if (!user) {
      user = {
        id: Date.now().toString(),
        nome: email.split('@')[0] || 'Usuário',
        email: email || 'usuario@email.com',
        telefone: '',
        senha: senha || 'senha',
        premium: false,
        createdAt: new Date()
      };
    }

    localStorage.setItem('trajecta_user', JSON.stringify(user));
    setUsuario(user);
    return true;
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('trajecta_user');
    }
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        cadastrar,
        logout,
        isAuthenticated: !!usuario
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
