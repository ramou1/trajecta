'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { veiculosMockados } from '@/data/veiculos';
import { rotasFixas } from '@/data/rotas';
import { calcularEstimativa } from '@/utils/calculos';
import { EstimativaTrajeto } from '@/types';
import { 
  MapPin, Car, Bike, Fuel, DollarSign, Clock, 
  ArrowRight, Navigation, Home, TrendingUp, 
  AlertTriangle, Gauge, Zap, Calculator 
} from 'lucide-react';
import { CORES_TRAJECTA } from '@/constants/colors';
import Image from 'next/image';

function ResultadoContent() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [estimativa, setEstimativa] = useState<EstimativaTrajeto | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Verificar autenticação no client-side
    const storedUser = localStorage.getItem('trajecta_user');
    if (!storedUser) {
      router.replace('/login');
      return;
    }

    const rotaId = searchParams.get('rotaId');
    const veiculoId = searchParams.get('veiculoId');
    const horario = searchParams.get('horario');

    if (!rotaId || !veiculoId || !horario) {
      router.replace('/consulta');
      return;
    }

    const rota = rotasFixas.find((r) => r.id === rotaId);
    const veiculo = veiculosMockados.find((v) => v.id === veiculoId);

    if (!rota || !veiculo) {
      router.replace('/consulta');
      return;
    }

    const resultado = calcularEstimativa(veiculo, rota, horario);
    setEstimativa(resultado);
  }, [router, searchParams]);

  if (!estimativa) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #ffffff, #bddef0)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-4" style={{ borderColor: CORES_TRAJECTA.azulMedio, borderTopColor: 'transparent' }}></div>
          <p className="text-gray-600 text-lg font-medium">Carregando estimativa...</p>
        </div>
      </div>
    );
  }

  const formatarTempo = (minutos: number) => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas}h ${mins}min`;
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
          <Link
            href="/consulta"
            className="px-6 py-2.5 text-white rounded-lg hover:opacity-90 transition-all flex items-center gap-2 font-medium"
            style={{ backgroundColor: CORES_TRAJECTA.azulMedio }}
          >
            <Calculator className="w-4 h-4" />
            Nova Consulta
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Resultado da Estimativa</h1>
          <p className="text-gray-600">Detalhes completos da sua viagem</p>
        </div>

        {/* Rota e Veículo */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Rota */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${CORES_TRAJECTA.verdeAgua}20` }}>
                <Navigation className="w-5 h-5" style={{ color: CORES_TRAJECTA.verdeAgua }} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Rota Selecionada</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-lg font-bold mb-1" style={{ color: CORES_TRAJECTA.azulMedio }}>{estimativa.rota.origem}</p>
                <p className="text-gray-500 text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Origem
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <div className="flex-1">
                <p className="text-lg font-bold mb-1" style={{ color: CORES_TRAJECTA.azulEscuro }}>{estimativa.rota.destino}</p>
                <p className="text-gray-500 text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Destino
                </p>
              </div>
            </div>
          </div>

          {/* Veículo */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${CORES_TRAJECTA.verde}20` }}>
                {estimativa.veiculo.tipo === 'carro' ? (
                  <Car className="w-5 h-5" style={{ color: CORES_TRAJECTA.verde }} />
                ) : (
                  <Bike className="w-5 h-5" style={{ color: CORES_TRAJECTA.verde }} />
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900">Veículo Selecionado</h2>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {estimativa.veiculo.marca} {estimativa.veiculo.modelo}
                </h3>
                {estimativa.veiculo.versao && (
                  <p className="text-gray-600 text-sm mb-2">{estimativa.veiculo.versao}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Gauge className="w-3 h-3" />
                    {estimativa.veiculo.ano}
                  </span>
                  <span>•</span>
                  <span className="capitalize">{estimativa.veiculo.combustivel}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {estimativa.veiculo.potencia} cv
                  </span>
                </div>
              </div>
              <div className="ml-4 flex items-center justify-center min-w-[140px]">
                {estimativa.veiculo.tipo === 'carro' && estimativa.veiculo.imagem ? (
                  <Image
                    src={`/carros/${estimativa.veiculo.imagem}`}
                    alt={`${estimativa.veiculo.marca} ${estimativa.veiculo.modelo}`}
                    width={140}
                    height={100}
                    className="w-36 h-auto object-contain"
                  />
                ) : (
                  <div className="text-4xl">{estimativa.veiculo.tipo === 'carro' ? '🚗' : '🏍️'}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Resultados Principais */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-2xl p-8 text-white border border-gray-100" style={{ backgroundColor: CORES_TRAJECTA.azulMedio }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Fuel className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-medium opacity-90">Consumo Total</h3>
            </div>
            <p className="text-4xl font-bold">{estimativa.consumoTotal} L</p>
          </div>
          <div className="rounded-2xl p-8 text-white border border-gray-100" style={{ backgroundColor: CORES_TRAJECTA.verde }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-medium opacity-90">Custo Combustível</h3>
            </div>
            <p className="text-4xl font-bold">
              {estimativa.custoCombustivel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <div className="rounded-2xl p-8 text-white border border-gray-100" style={{ backgroundColor: CORES_TRAJECTA.verdeAgua }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-medium opacity-90">Tempo Estimado</h3>
            </div>
            <p className="text-4xl font-bold">{formatarTempo(estimativa.tempoEstimado)}</p>
          </div>
        </div>

        {/* Detalhes */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-gray-600" />
            <h2 className="text-2xl font-bold text-gray-900">Detalhes da Viagem</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-700 mb-4 text-lg">Informações da Rota</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Distância total:</span>
                  <span className="font-semibold text-gray-900">{estimativa.rota.distancia} km</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Distância urbana:</span>
                  <span className="font-semibold text-gray-900">{estimativa.rota.distanciaUrbana} km</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Distância rodoviária:</span>
                  <span className="font-semibold text-gray-900">{estimativa.rota.distanciaRodoviaria} km</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Pedágios:</span>
                  <span className="font-semibold text-gray-900">
                    {estimativa.rota.numeroPedagios} ({estimativa.custoPedagios.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Limite de velocidade médio:</span>
                  <span className="font-semibold text-gray-900">{estimativa.rota.limiteVelocidadeMedio} km/h</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Horário de partida:</span>
                  <span className="font-semibold text-gray-900">{estimativa.horario}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-4 text-lg">Custos</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: `${CORES_TRAJECTA.azulMedio}15` }}>
                  <span className="text-gray-600">Combustível:</span>
                  <span className="font-semibold" style={{ color: CORES_TRAJECTA.azulMedio }}>
                    {estimativa.custoCombustivel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Pedágios:</span>
                  <span className="font-semibold text-gray-900">
                    {estimativa.custoPedagios.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg border-2 mt-4" style={{ backgroundColor: `${CORES_TRAJECTA.azulMedio}15`, borderColor: CORES_TRAJECTA.azulMedio }}>
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold" style={{ color: CORES_TRAJECTA.azulEscuro }}>
                    {estimativa.custoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </div>
              {estimativa.paradasAbastecimento > 0 && (
                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <p className="text-sm text-yellow-800">
                      Será necessário fazer <strong>{estimativa.paradasAbastecimento}</strong> parada(s) para abastecimento durante a viagem.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/consulta"
            className="flex-1 px-6 py-4 text-white rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: CORES_TRAJECTA.azulMedio }}
          >
            <Calculator className="w-5 h-5" />
            Nova Consulta
          </Link>
          <Link
            href="/"
            className="flex-1 px-6 py-4 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </Link>
        </div>
      </main>
    </div>
  );
}

function ResultadoFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #ffffff, #bddef0)' }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-4" style={{ borderColor: CORES_TRAJECTA.azulMedio, borderTopColor: 'transparent' }}></div>
        <p className="text-gray-600 text-lg font-medium">Carregando...</p>
      </div>
    </div>
  );
}

export default function Resultado() {
  return (
    <AuthProvider>
      <Suspense fallback={<ResultadoFallback />}>
        <ResultadoContent />
      </Suspense>
    </AuthProvider>
  );
}