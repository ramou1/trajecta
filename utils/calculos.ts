import { Veiculo, Rota, EstimativaTrajeto } from '@/types';

// Preços médios dos combustíveis (valores aproximados em R$)
const PRECOS_COMBUSTIVEL = {
  gasolina: 5.80,
  etanol: 4.20,
  flex: 5.00, // média ponderada
  diesel: 6.10
};

export function calcularEstimativa(
  veiculo: Veiculo,
  rota: Rota,
  horario: string
): EstimativaTrajeto {
  // Calcular consumo baseado na distância urbana e rodoviária
  const consumoUrbano = rota.distanciaUrbana / veiculo.consumoUrbano;
  const consumoRodoviario = rota.distanciaRodoviaria / veiculo.consumoRodoviario;
  const consumoTotal = consumoUrbano + consumoRodoviario;

  // Ajustar consumo baseado no horário (trânsito)
  let fatorTransito = 1.0;
  const hora = parseInt(horario.split(':')[0]);
  if ((hora >= 7 && hora <= 9) || (hora >= 17 && hora <= 19)) {
    fatorTransito = 1.15; // 15% mais consumo em horários de pico
  }

  const consumoFinal = consumoTotal * fatorTransito;

  // Preço do combustível
  const precoCombustivel = PRECOS_COMBUSTIVEL[veiculo.combustivel];
  const custoCombustivel = consumoFinal * precoCombustivel;
  const custoPedagios = rota.valorPedagios;
  const custoTotal = custoCombustivel + custoPedagios;

  // Calcular número de paradas de abastecimento
  const paradasAbastecimento = Math.ceil(consumoFinal / veiculo.capacidadeTanque);

  // Ajustar tempo estimado baseado no horário
  let tempoEstimado = rota.tempoEstimado;
  if ((hora >= 7 && hora <= 9) || (hora >= 17 && hora <= 19)) {
    tempoEstimado = Math.round(tempoEstimado * 1.2); // 20% mais tempo em horário de pico
  }

  return {
    veiculo,
    rota,
    horario,
    consumoTotal: Math.round(consumoFinal * 10) / 10, // Arredondar para 1 decimal
    custoCombustivel: Math.round(custoCombustivel * 100) / 100,
    custoPedagios,
    custoTotal: Math.round(custoTotal * 100) / 100,
    tempoEstimado,
    paradasAbastecimento: Math.max(0, paradasAbastecimento - 1) // -1 porque não precisa parar se couber no tanque
  };
}
