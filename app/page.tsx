'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Car, MapPin, BarChart3, Navigation, LogIn, UserPlus, ArrowRight, Sparkles } from 'lucide-react';
import { CORES_TRAJECTA } from '@/constants/colors';

function HomeContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #ffffff, #bddef0)' }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50" style={{ boxShadow: 'none' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo-trajecta.png" 
              alt="Trajecta Logo" 
              width={150} 
              height={50}
              className="h-14 w-auto"
            />
          </Link>
          {isAuthenticated ? (
            <Link
              href="/consulta"
              className="px-6 py-2.5 text-white rounded-lg hover:opacity-90 transition-all flex items-center gap-2 font-medium"
              style={{ backgroundColor: CORES_TRAJECTA.azulMedio }}
            >
              <Navigation className="w-4 h-4" />
              Consultar Trajeto
            </Link>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-lg hover:opacity-80 transition-colors font-medium flex items-center gap-2"
                style={{ color: CORES_TRAJECTA.azulEscuro }}
              >
                <LogIn className="w-4 h-4" />
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="px-5 py-2.5 text-white rounded-lg hover:opacity-90 transition-all flex items-center gap-2 font-medium"
                style={{ backgroundColor: CORES_TRAJECTA.azulMedio }}
              >
                <UserPlus className="w-4 h-4" />
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Estime o Consumo do Seu{' '}
            <span style={{ color: CORES_TRAJECTA.azulMedio }}>
              Trajeto
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Calcule de forma precisa o consumo de combustível, custos e tempo estimado 
            para suas viagens com carros e motos.
          </p>
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cadastro"
                className="px-8 py-4 text-white rounded-xl text-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: CORES_TRAJECTA.azulMedio }}
              >
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 bg-white text-gray-700 rounded-xl text-lg font-semibold border-2 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                style={{ borderColor: CORES_TRAJECTA.azulMedio, color: CORES_TRAJECTA.azulMedio }}
              >
                <LogIn className="w-5 h-5" />
                Já tenho conta
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${CORES_TRAJECTA.verde}20` }}>
              <Car className="w-7 h-7" style={{ color: CORES_TRAJECTA.verde }} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Base de Veículos</h3>
            <p className="text-gray-600 leading-relaxed">
              Compare o consumo entre diferentes modelos de carros e motos com dados técnicos reais do mercado.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${CORES_TRAJECTA.verdeAgua}20` }}>
              <MapPin className="w-7 h-7" style={{ color: CORES_TRAJECTA.verdeAgua }} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Rotas Pré-definidas</h3>
            <p className="text-gray-600 leading-relaxed">
              Trajetos fixos com informações sobre pedágios, limites de velocidade e condições da via.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${CORES_TRAJECTA.azulMedio}20` }}>
              <BarChart3 className="w-7 h-7" style={{ color: CORES_TRAJECTA.azulMedio }} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Estimativas Precisas</h3>
            <p className="text-gray-600 leading-relaxed">
              Cálculos realistas considerando horário, trânsito e características do veículo.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl p-12 mb-20 border border-gray-100">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Como Funciona</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: CORES_TRAJECTA.azulMedio }}>
                1
              </div>
              <h4 className="font-bold mb-2 text-gray-900">Informe Origem e Destino</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Escolha entre rotas pré-definidas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: CORES_TRAJECTA.verdeAgua }}>
                2
              </div>
              <h4 className="font-bold mb-2 text-gray-900">Defina o Horário</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Informe quando pretende viajar</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: CORES_TRAJECTA.verde }}>
                3
              </div>
              <h4 className="font-bold mb-2 text-gray-900">Selecione o Veículo</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Escolha entre carros ou motos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: CORES_TRAJECTA.azulEscuro }}>
                4
              </div>
              <h4 className="font-bold mb-2 text-gray-900">Veja a Estimativa</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Consumo, custos e tempo estimado</p>
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        {!isAuthenticated && (
          <div className="rounded-2xl p-12 text-center text-white relative overflow-hidden" style={{ background: `linear-gradient(to right, ${CORES_TRAJECTA.azulMedio}, ${CORES_TRAJECTA.verdeAgua})` }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-12 h-12 text-yellow-300" />
              </div>
              <h3 className="text-4xl font-bold mb-4">Upgrade para Premium</h3>
              <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
                Compare múltiplos veículos simultaneamente por apenas{' '}
                <span className="font-bold text-yellow-300">R$ 9,90/mês</span>
              </p>
              <Link
                href="/cadastro"
                className="inline-flex items-center gap-2 px-10 py-4 bg-white rounded-xl text-lg font-bold hover:bg-gray-100 transition-all"
                style={{ color: CORES_TRAJECTA.azulMedio }}
              >
                Assinar Agora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 mt-20 text-white" style={{ backgroundColor: CORES_TRAJECTA.azulEscuro }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">&copy; 2024 Trajecta - Estimativa de Trajetos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}