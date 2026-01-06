export type TipoVeiculo = 'carro' | 'moto';
export type TipoCombustivel = 'gasolina' | 'etanol' | 'flex' | 'diesel';

export interface Veiculo {
  id: string;
  tipo: TipoVeiculo;
  marca: string;
  modelo: string;
  ano: number;
  versao?: string;
  combustivel: TipoCombustivel;
  consumoUrbano: number; // km/l
  consumoRodoviario: number; // km/l
  potencia: number; // cv
  torque: number; // Nm
  capacidadeTanque: number; // litros
  transmissao: string;
  categoria?: string;
  imagem?: string; // Nome do arquivo de imagem em public/carros/
}

export interface Rota {
  id: string;
  origem: string;
  destino: string;
  distancia: number; // km
  distanciaUrbana: number; // km (trânsito urbano)
  distanciaRodoviaria: number; // km (estrada)
  tempoEstimado: number; // minutos
  numeroPedagios: number;
  valorPedagios: number; // R$
  limiteVelocidadeMedio: number; // km/h
  dificuldade: 'baixa' | 'media' | 'alta';
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  senha: string; // Em produção, isso seria hash
  premium: boolean;
  createdAt: Date;
}

export interface EstimativaTrajeto {
  veiculo: Veiculo;
  rota: Rota;
  horario: string;
  consumoTotal: number; // litros
  custoCombustivel: number; // R$
  custoPedagios: number; // R$
  custoTotal: number; // R$
  tempoEstimado: number; // minutos
  paradasAbastecimento: number;
}

export interface ConsultaTrajeto {
  origem: string;
  destino: string;
  horario: string;
  veiculoId: string;
}
