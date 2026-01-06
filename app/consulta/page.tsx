'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { veiculosMockados } from '@/data/veiculos';
import { rotasFixas } from '@/data/rotas';
import { Veiculo, Rota, TipoVeiculo } from '@/types';
import { MapPin, Clock, Filter, Car, Bike, Search, LogOut, Home, Calculator, Gauge, Zap, Fuel } from 'lucide-react';
import { CORES_TRAJECTA } from '@/constants/colors';
import Image from 'next/image';

function ConsultaContent() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [rotaSelecionada, setRotaSelecionada] = useState<Rota | null>(null);
  const [horario, setHorario] = useState('');
  const [tipoVeiculo, setTipoVeiculo] = useState<TipoVeiculo | 'todos'>('todos');
  const [marcaFiltro, setMarcaFiltro] = useState('');
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<Veiculo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('trajecta_user');
    if (!storedUser) {
      router.replace('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #ffffff, #bddef0)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-4" style={{ borderColor: CORES_TRAJECTA.azulMedio, borderTopColor: 'transparent' }}></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  const veiculosFiltrados = veiculosMockados.filter((v) => {
    if (tipoVeiculo !== 'todos' && v.tipo !== tipoVeiculo) return false;
    if (marcaFiltro && !v.marca.toLowerCase().includes(marcaFiltro.toLowerCase())) return false;
    return true;
  });

  const handleCalcular = () => {
    if (!rotaSelecionada || !horario || !veiculoSelecionado) {
      alert('Por favor, preencha todos os campos: rota, horário e selecione um veículo');
      return;
    }

    const params = new URLSearchParams({
      rotaId: rotaSelecionada.id,
      veiculoId: veiculoSelecionado.id,
      horario
    });
    router.push(`/resultado?${params.toString()}`);
  };

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
          <div className="flex gap-3 items-center">
            <Link
              href="/"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 font-medium"
            >
              <Home className="w-4 h-4" />
              Início
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 text-red-600 hover:text-red-700 transition-colors flex items-center gap-2 font-medium"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Consultar Trajeto</h1>
          <p className="text-gray-600">Selecione a rota, horário e veículo para calcular a estimativa</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${CORES_TRAJECTA.verdeAgua}20` }}>
                <MapPin className="w-5 h-5" style={{ color: CORES_TRAJECTA.verdeAgua }} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Informações do Trajeto</h2>
            </div>

            {/* Seleção de Rota */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Selecione a Rota
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={rotaSelecionada?.id || ''}
                  onChange={(e) => {
                    const rota = rotasFixas.find((r) => r.id === e.target.value);
                    setRotaSelecionada(rota || null);
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white text-gray-900"
                >
                  <option value="">Selecione uma rota...</option>
                  {rotasFixas.map((rota) => (
                    <option key={rota.id} value={rota.id}>
                      {rota.origem} → {rota.destino} ({rota.distancia} km)
                    </option>
                  ))}
                </select>
              </div>
              {rotaSelecionada && (
                <div className="mt-4 p-4 rounded-xl border" style={{ backgroundColor: `${CORES_TRAJECTA.azulMedio}15`, borderColor: `${CORES_TRAJECTA.azulMedio}40` }}>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Distância: </span>
                      <span className="font-semibold text-gray-900">{rotaSelecionada.distancia} km</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Pedágios: </span>
                      <span className="font-semibold text-gray-900">
                        {rotaSelecionada.numeroPedagios} ({rotaSelecionada.valorPedagios.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Tempo estimado: </span>
                      <span className="font-semibold text-gray-900">
                        {Math.floor(rotaSelecionada.tempoEstimado / 60)}h {rotaSelecionada.tempoEstimado % 60}min
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Horário */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Horário de Partida
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                />
              </div>
            </div>

            {/* Filtros de Veículos */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Filtros de Veículos</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo
                  </label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={tipoVeiculo}
                      onChange={(e) => setTipoVeiculo(e.target.value as TipoVeiculo | 'todos')}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white text-gray-900"
                    >
                      <option value="todos">Todos</option>
                      <option value="carro">Carros</option>
                      <option value="moto">Motos</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marca
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar marca..."
                      value={marcaFiltro}
                      onChange={(e) => setMarcaFiltro(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleCalcular}
              disabled={!rotaSelecionada || !horario || !veiculoSelecionado}
              className="w-full py-4 text-white rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: CORES_TRAJECTA.azulMedio }}
            >
              <Calculator className="w-5 h-5" />
              Calcular Estimativa
            </button>
          </div>

          {/* Lista de Veículos */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${CORES_TRAJECTA.verde}20` }}>
                  <Car className="w-5 h-5" style={{ color: CORES_TRAJECTA.verde }} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Veículos Disponíveis</h2>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                {veiculosFiltrados.length}
              </span>
            </div>
            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              {veiculosFiltrados.map((veiculo) => (
                <div
                  key={veiculo.id}
                  onClick={() => setVeiculoSelecionado(veiculo)}
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                    veiculoSelecionado?.id === veiculo.id
                      ? 'shadow-md'
                      : 'border-gray-200 hover:shadow-md'
                  }`}
                  style={veiculoSelecionado?.id === veiculo.id ? {
                    borderColor: CORES_TRAJECTA.azulMedio,
                    backgroundColor: `${CORES_TRAJECTA.azulMedio}15`
                  } : {
                    borderColor: '#e5e7eb'
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        {veiculo.tipo === 'carro' ? (
                          <Car className="w-5 h-5" style={{ color: CORES_TRAJECTA.azulMedio }} />
                        ) : (
                          <Bike className="w-5 h-5" style={{ color: CORES_TRAJECTA.verdeAgua }} />
                        )}
                        <h3 className="font-bold text-lg text-gray-900">
                          {veiculo.marca} {veiculo.modelo}
                        </h3>
                      </div>
                      {veiculo.versao && (
                        <p className="text-sm text-gray-600 ml-8">{veiculo.versao}</p>
                      )}
                      <p className="text-sm text-gray-500 ml-8">{veiculo.ano}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4 ml-8">
                    <div className="flex items-center gap-2 text-sm">
                      <Fuel className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Urbano: </span>
                      <span className="font-semibold text-gray-900">{veiculo.consumoUrbano} km/l</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Gauge className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Rodoviário: </span>
                      <span className="font-semibold text-gray-900">{veiculo.consumoRodoviario} km/l</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Fuel className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Combustível: </span>
                      <span className="font-semibold text-gray-900 capitalize">{veiculo.combustivel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Potência: </span>
                      <span className="font-semibold text-gray-900">{veiculo.potencia} cv</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Consulta() {
  return (
    <AuthProvider>
      <ConsultaContent />
    </AuthProvider>
  );
}