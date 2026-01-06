import { Rota } from '@/types';

export const rotasFixas: Rota[] = [
  {
    id: '1',
    origem: 'São Paulo - SP',
    destino: 'Rio de Janeiro - RJ',
    distancia: 429,
    distanciaUrbana: 50,
    distanciaRodoviaria: 379,
    tempoEstimado: 270, // 4h30min
    numeroPedagios: 4,
    valorPedagios: 87.50,
    limiteVelocidadeMedio: 110,
    dificuldade: 'media'
  },
  {
    id: '2',
    origem: 'São Paulo - SP',
    destino: 'Campinas - SP',
    distancia: 99,
    distanciaUrbana: 20,
    distanciaRodoviaria: 79,
    tempoEstimado: 90, // 1h30min
    numeroPedagios: 2,
    valorPedagios: 32.40,
    limiteVelocidadeMedio: 120,
    dificuldade: 'baixa'
  },
  {
    id: '3',
    origem: 'São Paulo - SP',
    destino: 'Belo Horizonte - MG',
    distancia: 586,
    distanciaUrbana: 40,
    distanciaRodoviaria: 546,
    tempoEstimado: 360, // 6h
    numeroPedagios: 5,
    valorPedagios: 125.80,
    limiteVelocidadeMedio: 100,
    dificuldade: 'alta'
  },
  {
    id: '4',
    origem: 'Rio de Janeiro - RJ',
    destino: 'Vitória - ES',
    distancia: 524,
    distanciaUrbana: 35,
    distanciaRodoviaria: 489,
    tempoEstimado: 330, // 5h30min
    numeroPedagios: 3,
    valorPedagios: 78.90,
    limiteVelocidadeMedio: 100,
    dificuldade: 'media'
  },
  {
    id: '5',
    origem: 'São Paulo - SP',
    destino: 'Curitiba - PR',
    distancia: 408,
    distanciaUrbana: 45,
    distanciaRodoviaria: 363,
    tempoEstimado: 300, // 5h
    numeroPedagios: 6,
    valorPedagios: 156.20,
    limiteVelocidadeMedio: 110,
    dificuldade: 'media'
  },
  {
    id: '6',
    origem: 'São Paulo - SP',
    destino: 'Santos - SP',
    distancia: 72,
    distanciaUrbana: 15,
    distanciaRodoviaria: 57,
    tempoEstimado: 75, // 1h15min
    numeroPedagios: 1,
    valorPedagios: 18.50,
    limiteVelocidadeMedio: 100,
    dificuldade: 'baixa'
  },
  {
    id: '7',
    origem: 'Rio de Janeiro - RJ',
    destino: 'São Paulo - SP',
    distancia: 429,
    distanciaUrbana: 50,
    distanciaRodoviaria: 379,
    tempoEstimado: 270, // 4h30min
    numeroPedagios: 4,
    valorPedagios: 87.50,
    limiteVelocidadeMedio: 110,
    dificuldade: 'media'
  }
];
