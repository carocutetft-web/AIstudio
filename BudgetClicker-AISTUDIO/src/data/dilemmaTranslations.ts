import { Language } from '../types/game';

export const DILEMMA_TRANSLATIONS: Record<Language, Record<string, string>> = {
  es: {
    // 1. Debt Strategy
    dil_debt_strategy_title: 'Avalancha vs Bola de Nieve vs Mínimo',
    dil_debt_strategy_prompt: 'Tienes $3,000 extra. Tarjeta A ($2,500 al 28% APR), Préstamo B ($3,000 al 6% APR), y pago mínimo exigido de $100. ¿Cómo atacas la deuda?',
    dil_debt_strategy_opt1: 'Método Avalancha: liquidar al 100% la tarjeta del 28% APR y el resto al préstamo de 6%',
    dil_debt_strategy_opt2: 'Método Bola de Nieve: pagar primero la cuenta de menor saldo emocional sin mirar el interés',
    dil_debt_strategy_opt3: 'Pagar solo el mínimo en ambas y conservar el efectivo en una cuenta corriente al 0%',
    dil_debt_strategy_fb1: '¡Matemáticamente óptimo! Eliminar deuda al 28% APR equivale a un retorno de inversión garantizado del 28% libre de impuestos.',
    dil_debt_strategy_fb2: 'Válido psicológicamente, pero pagaste cientos de dólares de más en intereses usureros al ignorar la tasa del 28%.',
    dil_debt_strategy_fb3: 'Trampa mortal: pagar mínimos con 28% APR duplica tu deuda cada 2.5 años debido al interés compuesto en tu contra.',

    // 2. Market Dip
    dil_market_dip_title: 'Corrección del Mercado Bursátil (-22%)',
    dil_market_dip_prompt: 'Los titulares anuncian pánico global y tu fondo indexado S&P 500 cae 22% este trimestre. ¿Cómo reaccionas?',
    dil_market_dip_opt1: 'Mantener la calma, continuar el DCA mensual habitual y comprar más barato con descuento',
    dil_market_dip_opt2: 'Vender todo a efectivo en pánico para evitar que baje más y esperar que suba',
    dil_market_dip_opt3: 'Detener aportes indefinidamente y esperar a que los diarios digan que la economía es segura',
    dil_market_dip_fb1: '¡Mentalidad Warren Buffett! Las crisis bursátiles son rebajas para el inversor a largo plazo. Históricamente el mercado siempre supera sus máximos.',
    dil_market_dip_fb2: 'Error clásico: vendiste en el fondo consolidando pérdidas y perderás los días de mayor rebote histórico.',
    dil_market_dip_fb3: 'Timing the market: esperar noticias positivas suele significar comprar cuando los precios ya volvieron a subir un 30%.',

    // 3. Health Insurance
    dil_health_ins_title: 'Plan de Salud: Deducible Alto + HSA vs PPO',
    dil_health_ins_prompt: 'Eres un adulto joven y saludable con chequeos preventivos normales. Tu empresa ofrece un HDHP con cuenta HSA o un plan PPO tradicional con copagos altos.',
    dil_health_ins_opt1: 'Elegir HDHP y maximizar la cuenta HSA (triple ventaja fiscal: deducible, crece libre de impuestos y retiro médico exento)',
    dil_health_ins_opt2: 'Elegir el plan PPO costoso pagando $250 más de prima mensual aunque nunca vayas al médico',
    dil_health_ins_opt3: 'No contratar ningún seguro médico para ahorrar la prima mensual completa',
    dil_health_ins_fb1: '¡Estrategia maestra de patrimonio! La cuenta HSA es el único instrumento financiero con triple exención tributaria.',
    dil_health_ins_fb2: 'Seguridad costosa: gastaste $3,000 extras al año en primas por servicios que no utilizas.',
    dil_health_ins_fb3: 'Ruina financiera asegurada: una sola emergencia médica sin seguro puede costar más de $50,000 y quebrar tu patrimonio.',

    // 4. Rent vs Buy
    dil_rent_buy_title: 'Comprar vs Alquilar con Ratio Elevado',
    dil_rent_buy_prompt: 'El ratio precio-alquiler en tu ciudad es 28 (muy caro comprar). La cuota hipotecaria + IBI + expensas sería $2,800/mes, mientras alquilar la misma casa cuesta $1,400/mes.',
    dil_rent_buy_opt1: 'Alquilar por $1,400 e invertir la diferencia de $1,400 mensualmente en fondos indexados globales',
    dil_rent_buy_opt2: 'Comprar a toda costa a 30 años pagando $2,800 porque "alquilar es tirar el dinero"',
    dil_rent_buy_opt3: 'Alquilar por $1,400 y gastar el resto en viajes y cenas caras',
    dil_rent_buy_fb1: '¡Análisis cuantitativo impecable! El costo irrecuperable de propiedad superaba el alquiler. Invertir la brecha genera mayor riqueza neta.',
    dil_rent_buy_fb2: 'Mito del ladrillo: ignoraste costo de oportunidad, mantenimiento (1-2%/año), intereses y seguros en un mercado inflado.',
    dil_rent_buy_fb3: 'Ahorraste en vivienda pero consumiste el diferencial sin construir activos.',

    // 5. Emergency Yield
    dil_emerg_yield_title: '¿Dónde guardar tu Fondo de Emergencia?',
    dil_emerg_yield_prompt: 'Tienes $10,000 de fondo de emergencia para imprevistos vitales. Te ofrecen varias alternativas de depósito.',
    dil_emerg_yield_opt1: 'Cuenta remunerada de alta rentabilidad (HYSA) o bonos soberanos de corto plazo (seguro gubernamental, liquidez inmediata)',
    dil_emerg_yield_opt2: 'Protocolo DeFi no regulado con 14% APY en criptomonedas sintéticas',
    dil_emerg_yield_opt3: 'Efectivo debajo del colchón perdiendo 5% anual contra la inflación',
    dil_emerg_yield_opt4: 'Fondo de emergencia seguro con liquidez 24/7 y cobertura.',
    dil_emerg_yield_fb1: '¡Exacto! El fondo de emergencia prioriza LIQUIDEZ Y PRESERVACIÓN DE CAPITAL, nunca especulación con riesgo de pérdida total.',
    dil_emerg_yield_fb2: 'Peligro extremo: si el protocolo quiebra o hackean el contrato inteligente, pierdes tu único colchón vital.',
    dil_emerg_yield_fb3: 'La inflación invisible devora silenciosamente tu poder adquisitivo cada mes.',

    // 6. Car Purchase
    dil_car_buy_title: 'Adquisición de Vehículo: Usado vs Cero KM vs Chatarra',
    dil_car_buy_prompt: 'Necesitas un vehículo confiable para trasladarte al trabajo. Tienes $8,000 ahorrados.',
    dil_car_buy_opt1: 'Comprar un auto de 3 a 4 años certificado por $8,000 de contado (la depreciación más dura ya la pagó el dueño anterior)',
    dil_car_buy_opt2: 'Financiar un modelo nuevo de $35,000 a 72 meses con cuotas de $600/mes para lucir exitoso',
    dil_car_buy_opt3: 'Comprar un coche destartalado de 20 años por $1,500 que vive en el taller mecánico',
    dil_car_buy_fb1: '¡Golazo financiero! Un auto pierde el 45% de su valor en los primeros 3 años. Comprar usado confiable evita esa pérdida destructiva.',
    dil_car_buy_fb2: 'Prisión financiera: las cuotas de auto nuevo son la razón #1 por la que la clase media no puede construir patrimonio.',
    dil_car_buy_fb3: 'Falsa economía: los costos recurrentes de grúas y reparaciones terminaron superando el valor de un buen auto.',

    // 7. Lifestyle Creep
    dil_creep_title: 'Aumento Salarial del 25%: ¿Qué hacer?',
    dil_creep_prompt: 'Recibes una merecida promoción con un aumento neto de $1,000 mensuales. Tu nivel de vida actual ya cubre todas tus necesidades básicas.',
    dil_creep_opt1: 'Aplicar la regla 60/40: automatizar $600 a inversión indexada y disfrutar $400 en mejoras de vida conscientes',
    dil_creep_opt2: 'Mudarte de inmediato a un penthouse que cuesta exactamente $1,000 más de alquiler',
    dil_creep_opt3: 'Dejar el dinero estancado en cuenta sueldo sin destinarlo a ningún objetivo claro',
    dil_creep_fb1: '¡Equilibrio magistral! Evitaste la carrera de la rata aumentando tu tasa de ahorro sin privarte de celebrar tu logro profesional.',
    dil_creep_fb2: 'Inflación de estilo de vida pura: ganaste más pero tu patrimonio sigue en cero y tu costo fijo mensual se disparó.',
    dil_creep_fb3: 'Gasto por inercia: el dinero sin asignar en la cuenta termina esfumándose en pequeños gastos invisibles.',

    // 8. Life Insurance
    dil_life_ins_title: 'Seguro de Vida Universal con Inversión vs Seguro a Término',
    dil_life_ins_prompt: 'Un agente de seguros te ofrece un seguro de vida "Whole Life" con ahorro por $300/mes prometiendo rendimientos. La alternativa es seguro a término por $25/mes.',
    dil_life_ins_opt1: 'Contratar seguro de vida a término de $25/mes e invertir los $275 restantes en ETFs diversificados de bajo costo',
    dil_life_ins_opt2: 'Firmar el seguro de vida entera de $300/mes atraído por las promesas de "inversión mágica"',
    dil_life_ins_opt3: 'Ignorar cualquier cobertura de vida aunque tengas dependientes que confíen en tus ingresos',
    dil_life_ins_fb1: '"Buy term and invest the difference": los seguros con ahorro cobran altísimas comisiones ocultas y tienen rendimientos mediocres.',
    dil_life_ins_fb2: 'Caíste en la trampa del vendedor: hasta el 80% de tus primas de los primeros años se fue a comisiones del agente.',
    dil_life_ins_fb3: 'Riesgo catastrófico para tu familia si ocurriera un siniestro imprevisto.',

    // 9. Balance Transfer
    dil_bal_trans_title: 'Transferencia de Saldo con Tarjeta al 0% APR',
    dil_bal_trans_prompt: 'Tienes $5,000 en tarjeta al 26% APR pagando $130 mensuales de puro interés. Te llega una oferta de 0% APR por 18 meses con comisión de apertura del 3% ($150).',
    dil_bal_trans_opt1: 'Aceptar la transferencia, pagar los $150 y dividir los $5,000 en cuotas fijas de $278/mes para quedar en deuda CERO en 18 meses',
    dil_bal_trans_opt2: 'Aceptar el 0% APR y usar la línea de crédito liberada para irte de compras',
    dil_bal_trans_opt3: 'Rechazar la oferta por orgullo y seguir pagando 26% APR mes a mes',
    dil_bal_trans_fb1: '¡Apalancamiento estratégico perfecto! Pagaste $150 para ahorrarte más de $1,800 en intereses bancarios mientras liquidabas la deuda.',
    dil_bal_trans_fb2: 'Espiral de deuda: duplicaste tus pasivos y en 18 meses la tasa saltará al 29% retroactiva.',
    dil_bal_trans_fb3: 'Ceguera financiera: rechazar una reducción de 26 puntos porcentuales por $150 fue un regalo para el banco.',

    // 10. Crypto Exposure
    dil_crypto_alloc_title: 'Asignación de Activos Especulativos',
    dil_crypto_alloc_prompt: 'Tus amigos en redes sociales presumen ganancias con altcoins volátiles y te recomiendan meter todos tus ahorros.',
    dil_crypto_alloc_opt1: 'Limitar activos especulativos a un estricto 3-5% del portafolio total y mantener el 95% en activos productivos probados',
    dil_crypto_alloc_opt2: 'Vender tus fondos indexados estables y poner el 80% en la última moneda meme viral',
    dil_crypto_alloc_opt3: 'Pedir un préstamo bancario al 15% para apalancarte en criptomonedas',
    dil_crypto_alloc_opt4: 'Control estricto de riesgo con límite del 5%.',
    dil_crypto_alloc_fb1: '¡Gestión de riesgo profesional! Participas del potencial de crecimiento sin arriesgar jamás tu solvencia ni tu tranquilidad.',
    dil_crypto_alloc_fb2: 'Ruleta de casino: la volatilidad extrema puede liquidar el 90% de tu dinero en una sola semana.',
    dil_crypto_alloc_fb3: 'Peligro catastrófico: endeudarse para especular es el camino más rápido a la bancarrota personal.',

    // 11. 401(k) / Match
    dil_match_title: 'Aporte de la Empresa: El Retorno del 100% Inmediato',
    dil_match_prompt: 'Tu empleador ofrece igualar tu aporte para el retiro hasta un 5% de tu sueldo (aportas 5% y ellos ponen otro 5% gratis).',
    dil_match_opt1: 'Aportar como mínimo el 5% completo para capturar el 100% del dinero gratis de la empresa',
    dil_match_opt2: 'Aportar solo 1% porque prefieres tener unos dólares más hoy para compras superfluas',
    dil_match_opt3: 'No aportar nada al plan de retiro porque la jubilación está muy lejana',
    dil_match_fb1: '¡Dinero gratis garantizado! Un match 1:1 es un retorno instantáneo del 100% que no existe en ningún otro instrumento del planeta.',
    dil_match_fb2: 'Dejaste dinero sobre la mesa que era contractualmente tuyo. Equivale a rechazar un aumento de sueldo.',
    dil_match_fb3: 'Perdiste el efecto multiplicador de 30 años de interés compuesto con aportes patronales.',

    // 12. Extended Warranty
    dil_warranty_title: 'Garantía Extendida en Electrónica ($180)',
    dil_warranty_prompt: 'Compras una computadora portátil de $900. En la caja te presionan para contratar un seguro de extensión de garantía de $180 por 2 años.',
    dil_warranty_opt1: 'Rechazar la garantía extendida, pagar con tarjeta de crédito que incluye extensión gratuita y respaldarte en tu fondo de emergencia',
    dil_warranty_opt2: 'Comprar la garantía de $180 por miedo y ansiedad al momento de pagar',
    dil_warranty_opt3: 'Comprar la garantía y además un seguro contra robo duplicado',
    dil_warranty_fb1: '¡Consumidor educado! La mayoría de las tarjetas bancarias ya duplican la garantía de fábrica gratis. Auto-asegurar imprevistos ahorra miles.',
    dil_warranty_fb2: 'Negocio redondo para la tienda: las garantías extendidas tienen márgenes de ganancia de más del 60% para los comercios.',
    dil_warranty_fb3: 'Gasto redundante: pagaste dos veces por coberturas que se superponen entre sí.',

    // 13. Tax-Loss Harvesting
    dil_tax_harvest_title: 'Cosecha de Pérdidas Fiscales en Mercado Bajista',
    dil_tax_harvest_prompt: 'En un año difícil, una de tus posiciones bursátiles en ETF tiene una pérdida no realizada de $2,000, mientras tuviste $2,000 de ganancias en otras ventas.',
    dil_tax_harvest_opt1: 'Vender la posición con pérdidas para compensar el impuesto a las ganancias de capital y reinvertir de inmediato en un índice similar',
    dil_tax_harvest_opt2: 'Mantener las pérdidas sin hacer nada y pagar el 100% de los impuestos sobre las ganancias',
    dil_tax_harvest_opt3: 'Vender todo el portafolio y salir definitivamente de la bolsa',
    dil_tax_harvest_opt4: 'Optimización fiscal inteligente.',
    dil_tax_harvest_fb1: '¡Maestría fiscal! Redujiste tu factura tributaria a cero de forma completamente legal y mantuviste tu exposición al mercado.',
    dil_tax_harvest_fb2: 'Ineficiencia fiscal: regalaste dinero al fisco que podrías haber protegido con una simple orden de rebalanceo.',
    dil_tax_harvest_fb3: 'Reacción visceral que destruye el horizonte de inversión a largo plazo.',

    // 14. Career Upskill
    dil_career_title: 'Inversión en Capital Humano vs Líquido',
    dil_career_prompt: 'Tienes la oportunidad de cursar una certificación tecnológica de alta demanda por $1,200. En tu sector, profesionales certificados ganan en promedio $600 más al mes.',
    dil_career_opt1: 'Pagar los $1,200 dedicando tiempo al estudio: el retorno de inversión se amortiza en apenas 2 meses de aumento',
    dil_career_opt2: 'Guardar los $1,200 en una cuenta bancaria al 3% y continuar con el mismo sueldo durante años',
    dil_career_opt3: 'Gastar los $1,200 en un nuevo smartphone de última generación para aparentar estatus',
    dil_career_fb1: '¡El mejor activo eres tú mismo! Una inversión en habilidades de alta demanda que rinde 600% anual supera cualquier instrumento financiero.',
    dil_career_fb2: 'Ahorro miope: priorizaste $1,200 líquidos perdiendo un incremento salarial acumulativo de más de $7,200 por año.',
    dil_career_fb3: 'Pasivo depreciable: el teléfono perderá el 40% de su valor en un año sin aportarte un solo centavo de ingresos.',

    // 15. Dividend Trap
    dil_div_trap_title: 'Trampas de Rendimiento por Dividendo (Yield Trap)',
    dil_div_trap_prompt: 'Encuentras una acción que promete pagar un dividendo del 16% anual, pero su precio por acción viene cayendo 35% cada año por pérdidas operativas.',
    dil_div_trap_opt1: 'Evitar la trampa: priorizar retorno total (crecimiento + dividendos sostenibles) en empresas sólidas y diversificadas',
    dil_div_trap_opt2: 'Comprar masivamente atraído solo por el porcentaje del 16% sin mirar el balance de la empresa',
    dil_div_trap_opt3: 'Comprar opciones especulativas esperando que la empresa en declive se salve por milagro',
    dil_div_trap_fb1: '¡Ojo clínico de inversor! Un alto dividendo en una empresa declinante suele ser síntoma de quiebra inminente.',
    dil_div_trap_fb2: 'Caíste en la clásica trampa del dividendo: recibiste 16% en efectivo mientras el capital invertido se desplomaba 35%. Pérdida neta real.',
    dil_div_trap_fb3: 'Especulación desesperada que ignora los fundamentos financieros.',

    // 16. Freelance Taxes
    dil_free_tax_title: 'Impuestos de Freelance / Independiente',
    dil_free_tax_prompt: 'Cobraste una factura grande de $6,000 por un proyecto independiente. La retención no fue automática.',
    dil_free_tax_opt1: 'Apartar de inmediato el 30% ($1,800) en una cuenta separada para pagos tributarios trimestrales',
    dil_free_tax_opt2: 'Gastar los $6,000 completos asumiendo que "a fin de año veré cómo resuelvo con el fisco"',
    dil_free_tax_opt3: 'Apostar la porción impositiva en trading rápido para duplicarla antes de pagar',
    dil_free_tax_fb1: '¡Disciplina profesional! Tratar el dinero de los impuestos como si nunca hubiera sido tuyo previene multas e intereses demoledores.',
    dil_free_tax_fb2: 'Shock fiscal garantizado: llegarán los impuestos devengados con multas por falta de pagos provisionales.',
    dil_free_tax_fb3: 'Riesgo temerario que suele terminar en ejecuciones fiscales y congelamiento de cuentas.',

    // 17. Sunk Cost
    dil_sunk_cost_title: 'La Falacia del Costo Hundido',
    dil_sunk_cost_prompt: 'Pagaste un abono anual no reembolsable de un gimnasio ($600). Quedan 8 meses pero te queda a 40 minutos y nunca vas. Te cobran $20 por transporte cada viaje.',
    dil_sunk_cost_opt1: 'Aceptar que los $600 ya se perdieron y no forzarte a gastar más tiempo y dinero en viajes ineficientes; entrenar cerca de casa',
    dil_sunk_cost_opt2: 'Seguir gastando $80/mes en taxis y 2 horas de traslado para "aprovechar lo que ya pagué"',
    dil_sunk_cost_opt3: 'Comprar ropa de gimnasio de $300 para ver si te motivas a viajar',
    dil_sunk_cost_fb1: '¡Claridad económica! El dinero ya gastado es irrecuperable. Seguir gastando recursos para justificar una mala decisión pasada es irracional.',
    dil_sunk_cost_fb2: 'Falacia del costo hundido en su máxima expresión: gastaste más dinero y tiempo persiguiendo una pérdida.',
    dil_sunk_cost_fb3: 'Tratar de solucionar un gasto fallido con otro gasto impulsivo.',

    // 18. Medical Bill
    dil_medical_title: 'Factura Médica Inesperada de $1,500',
    dil_medical_prompt: 'Recibes una factura de la clínica por un procedimiento odontológico de urgencia ($1,500). Tienes el dinero en tu fondo de emergencia.',
    dil_medical_opt1: 'Llamar al departamento de facturación para solicitar desglose de cobros y negociar un descuento por pago de contado en una sola exhibición',
    dil_medical_opt2: 'Aceptar una tarjeta de crédito médica con "0% por 6 meses" que salta al 32% diferido si te retrasas un día',
    dil_medical_opt3: 'Ignorar la factura y dejar que pase a una agencia de cobranza dañando tu puntaje crediticio',
    dil_medical_fb1: '¡Gran astucia! Casi todos los hospitales y clínicas ofrecen entre un 15% y 30% de descuento inmediato por pago de contado en una sola llamada.',
    dil_medical_fb2: 'Trampa del interés diferido: las tarjetas médicas son famosas por aplicar intereses acumulados retroactivos si no liquidas todo a tiempo.',
    dil_medical_fb3: 'Tu puntaje crediticio caerá 100 puntos, encareciendo préstamos, alquileres y seguros durante 7 años.',

    // 19. Mortgage Refinance
    dil_mortgage_title: 'Tasa Fija vs Tasa Variable en Ciclo Alcista',
    dil_mortgage_prompt: 'El banco central está subiendo tasas para frenar la inflación. Tu hipoteca actual es fija al 3.5%. El banco te ofrece una variable al 3.1% inicial.',
    dil_mortgage_opt1: 'Quedarte con tu tasa fija del 3.5%: la certeza a largo plazo te protege si las tasas del mercado suben al 6% o 7%',
    dil_mortgage_opt2: 'Cambiar a la variable por ganar 0.4% momentáneamente, exponiéndote a cuotas impredecibles',
    dil_mortgage_opt3: 'Extender el plazo a 40 años para pagar cuotas mínimas pagando el triple de interés total',
    dil_mortgage_fb1: '¡Protección de manual! Una tasa fija históricamente baja es el activo financiero más valioso en períodos inflacionarios.',
    dil_mortgage_fb2: 'Avaricia miope: la tasa variable se recalculará al alza y tus pagos mensuales podrían duplicarse.',
    dil_mortgage_fb3: 'Extender el plazo transfiere una fortuna a los beneficios del banco en intereses acumulados.',

    // 20. Retail Bulk Sales
    dil_sale_bulk_title: 'Promoción 3x2 en Artículos Perecederos',
    dil_sale_bulk_prompt: 'Ves una oferta: "Lleva 3 cajas de yogur orgánico por el precio de 2 ($12 total)". Solo necesitas 1 caja ($6) y vencen en 5 días.',
    dil_sale_bulk_opt1: 'Comprar solo la unidad necesaria de $6: la comida que se tira a la basura es dinero directo al tacho',
    dil_sale_bulk_opt2: 'Comprar las 3 cajas por $12 sintiendo que "ganaste" un producto gratis, aunque tires 2 cajas podridas',
    dil_sale_bulk_opt3: 'Comprar 6 cajas para aprovechar el descuento al máximo',
    dil_sale_bulk_fb1: '¡Lógica de consumo impecable! Gastaste $6 en vez de $12. El verdadero ahorro es no gastar dinero en lo que no consumirás.',
    dil_sale_bulk_fb2: 'Gasto disfrazado de ahorro: gastaste $6 extras por comida que terminó en la basura.',
    dil_sale_bulk_fb3: 'Desperdicio garantizado y saldo bancario drenado por marketing de volumen.',
  },
  en: {
    // 1. Debt Strategy
    dil_debt_strategy_title: 'Debt Avalanche vs Snowball vs Minimum',
    dil_debt_strategy_prompt: 'You have $3,000 extra. Card A has $2,500 balance at 28% APR, Loan B has $3,000 at 6% APR, and required monthly minimum is $100. How do you deploy it?',
    dil_debt_strategy_opt1: 'Avalanche Method: eliminate the 28% APR card 100% and put remaining $500 toward the 6% loan',
    dil_debt_strategy_opt2: 'Snowball Method: pay whichever account feels emotionally lighter ignoring interest rates',
    dil_debt_strategy_opt3: 'Pay only minimums on both and keep the rest in a 0% checking account',
    dil_debt_strategy_fb1: 'Mathematically optimal! Wiping out 28% APR debt guarantees a risk-free 28% tax-free return on your capital.',
    dil_debt_strategy_fb2: 'Emotionally understandable, but you paid hundreds of dollars in unnecessary interest by ignoring the 28% rate.',
    dil_debt_strategy_fb3: 'Deadly trap: paying minimums at 28% APR doubles your debt every 2.5 years due to compound interest working against you.',

    // 2. Market Dip
    dil_market_dip_title: 'Stock Market Correction (-22%)',
    dil_market_dip_prompt: 'Headlines scream economic panic and your broad market S&P 500 index ETF falls 22% in a single quarter. How do you react?',
    dil_market_dip_opt1: 'Stay the course, keep standard automated monthly DCA active, acquiring shares at a 22% discount',
    dil_market_dip_opt2: 'Panic sell everything to cash to stop bleeding and wait until things feel calm',
    dil_market_dip_opt3: 'Halt all investments indefinitely until news anchors proclaim the economy is safe',
    dil_market_dip_fb1: 'Warren Buffett discipline! Market crashes are retail sales for long-term compounders. Historically, index funds always reach new all-time highs.',
    dil_market_dip_fb2: 'Classic rookie blunder: you locked in temporary paper losses and will miss the most aggressive historical recovery days.',
    dil_market_dip_fb3: 'Market timing fallacy: waiting for good news means buying back in after prices have already surged 30% higher.',

    // 3. Health Insurance
    dil_health_ins_title: 'Health Plan: HDHP + HSA vs High-Premium PPO',
    dil_health_ins_prompt: 'You are a healthy young adult with routine preventive checkups. Your employer offers an HDHP with an HSA account or a traditional high-premium PPO plan.',
    dil_health_ins_opt1: 'Choose HDHP and max out the triple tax-advantaged HSA (deductible, tax-free growth, tax-free medical withdrawals)',
    dil_health_ins_opt2: 'Choose expensive PPO paying $250 more monthly in premiums even though you rarely visit doctors',
    dil_health_ins_opt3: 'Opt out of all health insurance completely to keep maximum cash in hand',
    dil_health_ins_fb1: 'Master wealth move! The HSA is the only triple tax-advantaged vehicle available, doubling as a stealth retirement account.',
    dil_health_ins_fb2: 'Expensive comfort: you forfeited $3,000 extra per year in unutilized insurance premiums.',
    dil_health_ins_fb3: 'Financial catastrophe waiting to happen: an unexpected accident or surgery can bankrupt an uninsured household overnight.',

    // 4. Rent vs Buy
    dil_rent_buy_title: 'Rent vs Buy in High Price-to-Rent Market',
    dil_rent_buy_prompt: 'The price-to-rent ratio in your city is 28 (heavily favoring renting). Mortgage + taxes + HOA equals $2,800/mo, while renting the identical home costs $1,400/mo.',
    dil_rent_buy_opt1: 'Rent for $1,400 and automate the $1,400 monthly difference into global index funds',
    dil_rent_buy_opt2: 'Buy at all costs on a 30-year loan paying $2,800 because "renting is throwing money away"',
    dil_rent_buy_opt3: 'Rent for $1,400 and spend the remaining cash on luxury dinners and vacations',
    dil_rent_buy_fb1: 'Impeccable quantitative analysis! The unrecoverable costs of ownership far exceeded rent. Investing the difference builds superior net worth.',
    dil_rent_buy_fb2: 'Real estate dogmatism: you ignored opportunity cost, 1-2% annual maintenance, and high interest on an inflated valuation.',
    dil_rent_buy_fb3: 'You saved on housing but failed to deploy the surplus into wealth-building assets.',

    // 5. Emergency Yield
    dil_emerg_yield_title: 'Where to Park Your Emergency Fund',
    dil_emerg_yield_prompt: 'You have accumulated $10,000 for unexpected life emergencies. You are weighing depository options.',
    dil_emerg_yield_opt1: 'High-Yield Savings Account (HYSA) or short-term Treasury bills (government insured, 100% liquid within 24h)',
    dil_emerg_yield_opt2: 'Unregulated crypto DeFi staking pool offering 14% APY',
    dil_emerg_yield_opt3: 'Cash under the mattress losing 5% annual purchasing power to inflation',
    dil_emerg_yield_opt4: 'Secure liquid high-yield vault.',
    dil_emerg_yield_fb1: 'Spot on! Emergency funds prioritize LIQUIDITY AND PRINCIPAL PRESERVATION, never speculative yields.',
    dil_emerg_yield_fb2: 'Severe tail risk: a smart contract exploit or stablecoin depeg could vaporize your entire safety net in seconds.',
    dil_emerg_yield_fb3: 'Invisible erosion: cash under the mattress loses half its purchasing power over two decades.',

    // 6. Car Purchase
    dil_car_buy_title: 'Car Purchase: 3-Year CPO vs Brand New Lease vs Beater',
    dil_car_buy_prompt: 'You need reliable transportation for work and have $8,000 in saved capital.',
    dil_car_buy_opt1: 'Buy a certified 3-to-4-year-old reliable vehicle with cash (prior owner absorbed the steep 45% depreciation hit)',
    dil_car_buy_opt2: 'Sign a 72-month lease on a new $35,000 luxury SUV for $600/month to look successful',
    dil_car_buy_opt3: 'Buy a $1,500 20-year-old beater that breaks down every three weeks',
    dil_car_buy_fb1: 'Savvy financial milestone! Cars lose nearly half their value in the first 3 years. Buying certified pre-owned sidesteps wealth destruction.',
    dil_car_buy_fb2: 'The middle-class wealth trap: perpetual car payments prevent millions from ever achieving financial independence.',
    dil_car_buy_fb3: 'False economy: recurring tow trucks and unpredictable repairs quickly surpass the cost of a dependable used car.',

    // 7. Lifestyle Creep
    dil_creep_title: '25% Salary Raise: The Lifestyle Creep Challenge',
    dil_creep_prompt: 'You received a well-earned promotion adding $1,000 net monthly to your paycheck. Your current lifestyle already covers all your genuine needs comfortably.',
    dil_creep_opt1: 'Apply the 60/40 rule: automate $600 to investments and allocate $400 for conscious lifestyle upgrades',
    dil_creep_opt2: 'Immediately upgrade to a luxury apartment that costs exactly $1,000 more per month in rent',
    dil_creep_opt3: 'Leave the funds idling in your checking account with no clear destination',
    dil_creep_fb1: 'Masterful discipline! You avoided the hedonic treadmill, accelerating your savings rate while still rewarding your career achievement.',
    dil_creep_fb2: 'Lifestyle creep trap: you made more money but your net worth remains zero while fixed overhead doubled.',
    dil_creep_fb3: 'Inertia spending: unallocated checking account balances invariably dissolve into forgotten friction expenses.',

    // 8. Life Insurance
    dil_life_ins_title: 'Whole Life Policy vs Term Life + S&P 500 DCA',
    dil_life_ins_prompt: 'An insurance broker pitches a $300/mo Whole Life insurance policy promising a "cash value investment". The alternative is a $25/mo 20-year term policy.',
    dil_life_ins_opt1: 'Buy the $25/mo term life policy and invest the remaining $275/mo into low-cost index funds',
    dil_life_ins_opt2: 'Sign the $300/mo whole life contract lured by sales pitch promises',
    dil_life_ins_opt3: 'Skip life insurance altogether despite having dependents reliant on your income',
    dil_life_ins_fb1: '"Buy term and invest the difference": whole life policies levy astronomical hidden fees and deliver subpar returns compared to simple index funds.',
    dil_life_ins_fb2: 'Victim of high commissions: up to 80% of your first year premiums went directly into the agent commission check.',
    dil_life_ins_fb3: 'Catastrophic hazard for your family if an untimely tragedy strikes without coverage.',

    // 9. Balance Transfer
    dil_bal_trans_title: '0% APR Balance Transfer Credit Card',
    dil_bal_trans_prompt: 'You carry $5,000 on a card at 26% APR, paying $130/mo in pure interest. You receive an offer for 0% APR for 18 months with a 3% upfront fee ($150).',
    dil_bal_trans_opt1: 'Execute transfer, pay the $150 fee, and automate $278/mo to wipe the balance to exactly zero within 18 months',
    dil_bal_trans_opt2: 'Transfer balance to 0% and use the cleared credit line to go on a vacation shopping spree',
    dil_bal_trans_opt3: 'Reject the offer and continue paying 26% APR month after month',
    dil_bal_trans_fb1: 'Strategic debt management! You paid $150 once to save over $1,800 in predatory bank interest while extinguishing the principal.',
    dil_bal_trans_fb2: 'Debt spiral: you doubled your total liabilities and will face 29% retroactive interest when the promotional period expires.',
    dil_bal_trans_fb3: 'Refusing to eliminate a 26-percentage-point interest rate gap out of inertia was an expensive gift to your bank.',

    // 10. Crypto Exposure
    dil_crypto_alloc_title: 'Speculative Asset Allocation Limits',
    dil_crypto_alloc_prompt: 'Online influencers boast overnight gains in volatile meme tokens and urge you to allocate your life savings.',
    dil_crypto_alloc_opt1: 'Strictly cap speculative assets to 3-5% of total portfolio, anchoring 95% in productive real assets and index funds',
    dil_crypto_alloc_opt2: 'Liquidate all stable index funds and put 80% of net worth into the trending meme coin',
    dil_crypto_alloc_opt3: 'Take out an unsecured personal bank loan to leverage your position in crypto',
    dil_crypto_alloc_opt4: 'Rigorous 5% risk cap on speculative plays.',
    dil_crypto_alloc_fb1: 'Professional risk management! You participate in high-upside potential without ever endangering household solvency.',
    dil_crypto_alloc_fb2: 'Casino gambling: extreme volatility can erase 90% of your capital within days.',
    dil_crypto_alloc_fb3: 'Reckless financial suicide: borrowing at fixed interest to speculate on volatile tokens leads to bankruptcy.',

    // 11. 401(k) / Match
    dil_match_title: 'Employer 401(k) Match: 100% Instant Return',
    dil_match_prompt: 'Your company matches retirement contributions dollar-for-dollar up to 5% of your salary (you contribute 5%, they gift you another 5%).',
    dil_match_opt1: 'Contribute the full 5% immediately to capture 100% of the free employer match',
    dil_match_opt2: 'Contribute only 1% because you prefer spending extra cash on small everyday conveniences',
    dil_match_opt3: 'Opt out of retirement completely because retirement is decades away',
    dil_match_fb1: 'Free money guaranteed! A 1:1 match represents an instant 100% return on investment unmatched by any other vehicle on earth.',
    dil_match_fb2: 'You left contractually owed compensation on the table. It is mathematically identical to taking a voluntary pay cut.',
    dil_match_fb3: 'You sacrificed 30 years of tax-free compound growth on employer-funded wealth.',

    // 12. Extended Warranty
    dil_warranty_title: 'Extended Electronics Warranty ($180)',
    dil_warranty_prompt: 'You purchase a $900 laptop at the checkout counter. The cashier aggressively pitches an extended 2-year warranty for $180.',
    dil_warranty_opt1: 'Decline the store warranty, pay with a credit card that offers complimentary extended warranty, and self-insure via emergency fund',
    dil_warranty_opt2: 'Buy the $180 warranty out of pressure and anxiety at checkout',
    dil_warranty_opt3: 'Buy both the extended warranty and an expensive third-party insurance plan',
    dil_warranty_fb1: 'Educated consumerism! Most premium credit cards automatically double manufacturer warranties at zero charge. Self-insuring saves thousands.',
    dil_warranty_fb2: 'Pure retail profit: extended warranties carry over 60% profit margins for merchants with minimal claim payouts.',
    dil_warranty_fb3: 'Redundant waste: paying twice for overlapping coverage that depreciates with technology cycles.',

    // 13. Tax-Loss Harvesting
    dil_tax_harvest_title: 'Tax-Loss Harvesting in a Bear Market',
    dil_tax_harvest_prompt: 'During a market downturn, one of your index positions has an unrealized loss of $2,000, while you realized $2,000 in capital gains elsewhere.',
    dil_tax_harvest_opt1: 'Harvest the $2,000 loss to offset taxable capital gains and immediately purchase an equivalent diversified index fund',
    dil_tax_harvest_opt2: 'Do nothing, leave the loss alone and pay full taxes on your capital gains',
    dil_tax_harvest_opt3: 'Liquidate all accounts and exit financial markets permanently',
    dil_tax_harvest_opt4: 'Smart tax mitigation strategy.',
    dil_tax_harvest_fb1: 'Tax efficiency mastery! You legally reduced your tax bill to zero while maintaining uninterrupted market exposure.',
    dil_tax_harvest_fb2: 'Tax drag: you gifted money to tax authorities that could have stayed compounding in your account.',
    dil_tax_harvest_fb3: 'Emotional overreaction destroying long-term compounding horizons.',

    // 14. Career Upskill
    dil_career_title: 'Investing in Human Capital vs Liquidity',
    dil_career_prompt: 'You have the opportunity to take a high-demand tech credential for $1,200. In your industry, credentialed peers earn $600 more per month on average.',
    dil_career_opt1: 'Invest $1,200 and dedicate study hours: the certification pays for itself in just 2 months of higher salary',
    dil_career_opt2: 'Keep the $1,200 sitting in a 3% savings account and stay at your current wage for years',
    dil_career_opt3: 'Spend the $1,200 on the latest designer smartphone to project social prestige',
    dil_career_fb1: 'Your best financial asset is yourself! High-ROI skills compounding at 600% annual return beat any passive index fund.',
    dil_career_fb2: 'Short-sighted hoarding: saving $1,200 cost you over $7,200 in recurring annual earning power.',
    dil_career_fb3: 'Depreciating liability: the smartphone loses 40% value in 12 months without generating a dime in income.',

    // 15. Dividend Trap
    dil_div_trap_title: 'Dividend Yield Traps',
    dil_div_trap_prompt: 'You discover a stock advertising a 16% annual dividend yield, but its share price has fallen 35% every year due to deteriorating business fundamentals.',
    dil_div_trap_opt1: 'Avoid the trap: prioritize total return (sustainable growth + healthy dividends) in financially robust companies',
    dil_div_trap_opt2: 'Buy aggressively based solely on the high 16% yield without inspecting the balance sheet',
    dil_div_trap_opt3: 'Buy speculative call options hoping for an ungrounded turnaround miracle',
    dil_div_trap_fb1: 'Keen investor insight! An abnormally high dividend on a declining stock is a red flag signaling an imminent dividend cut or bankruptcy.',
    dil_div_trap_fb2: 'Fell into the classic yield trap: you received 16% in cash while the underlying asset crashed 35%, generating a net loss.',
    dil_div_trap_fb3: 'Blind speculation ignoring core corporate accounting fundamentals.',

    // 16. Freelance Taxes
    dil_free_tax_title: 'Freelance & 1099 Tax Withholding',
    dil_free_tax_prompt: 'You receive a $6,000 lump sum payment for a major freelance consulting contract. No taxes were withheld at the source.',
    dil_free_tax_opt1: 'Immediately transfer 30% ($1,800) into a dedicated tax savings sub-account for quarterly estimated tax payments',
    dil_free_tax_opt2: 'Spend the entire $6,000 assuming you will figure out taxes when tax season arrives next year',
    dil_free_tax_opt3: 'Day-trade the tax money hoping to double it before taxes are due',
    dil_free_tax_fb1: 'Professional financial hygiene! Treating tax obligations as belonging to the government prevents crushing IRS penalties and interest.',
    dil_free_tax_fb2: 'Guaranteed tax shock: you will face massive underpayment penalties and an unpayable lump-sum tax bill.',
    dil_free_tax_fb3: 'Dangerous gamble that frequently leads to bank levies and severe tax liens.',

    // 17. Sunk Cost
    dil_sunk_cost_title: 'The Sunk Cost Fallacy',
    dil_sunk_cost_prompt: 'You paid a non-refundable $600 annual gym membership. 8 months remain, but it is 40 minutes away and you never go. Commuting costs $20 each trip.',
    dil_sunk_cost_opt1: 'Accept the $600 as a sunk cost, stop wasting extra time and travel fares, and exercise outdoors or near home',
    dil_sunk_cost_opt2: 'Spend $80/mo in rideshares and 2 hours round-trip to "make use of what you already paid"',
    dil_sunk_cost_opt3: 'Buy $300 in designer workout gear hoping it forces you to make the trip',
    dil_sunk_cost_fb1: 'Rational economic clarity! Sunk costs cannot be recovered. Throwing good money and precious time after bad is illogical.',
    dil_sunk_cost_fb2: 'Classic sunk cost fallacy: you bled additional time and money attempting to justify an unrecoverable expense.',
    dil_sunk_cost_fb3: 'Compounding a previous budgeting mistake with more impulsive consumption.',

    // 18. Medical Bill
    dil_medical_title: 'Unexpected $1,500 Medical Bill',
    dil_medical_prompt: 'You receive an unexpected $1,500 bill for an urgent outpatient procedure. You have the cash in your emergency fund.',
    dil_medical_opt1: 'Call billing to request an itemized statement and negotiate a prompt-pay cash discount for immediate settlement',
    dil_medical_opt2: 'Sign up for a deferred-interest medical credit card that jumps to 32% retroactive interest if not paid in full by month 6',
    dil_medical_opt3: 'Ignore the notices and let the bill go to collections damaging your credit profile',
    dil_medical_fb1: 'Savvy negotiation! Itemized hospital bills frequently reveal coding errors, and requesting prompt-pay cash discounts often shaves 20-30% off immediately.',
    dil_medical_fb2: 'Deferred interest trap: one day late on payment triggers retroactive interest charges dating back to the date of service.',
    dil_medical_fb3: 'Your credit score drops over 100 points, inflating mortgage, auto loan, and rental rates for years.',

    // 19. Mortgage Refinance
    dil_mortgage_title: 'Fixed Rate vs Adjustable Rate in Rising Rate Climate',
    dil_mortgage_prompt: 'Central banks are raising rates to fight inflation. You currently hold a 30-year fixed mortgage at 3.5%. The bank pitches a variable ARM at 3.1% initial rate.',
    dil_mortgage_opt1: 'Keep your 3.5% fixed rate: long-term locked certainty insulates you completely as market rates climb toward 7%',
    dil_mortgage_opt2: 'Switch to the adjustable ARM to temporarily shave 0.4%, exposing yourself to future payment spikes',
    dil_mortgage_opt3: 'Extend the loan term to 40 years to minimize monthly payments while tripling total lifetime interest',
    dil_mortgage_fb1: 'Textbook inflation hedge! An historically low fixed-rate mortgage is an extraordinary wealth-preservation asset.',
    dil_mortgage_fb2: 'Short-sighted greed: when the ARM resets, your monthly payment could increase by 50% or more.',
    dil_mortgage_fb3: 'Term extension transfers a massive windfall of cumulative interest directly to the lender.',

    // 20. Retail Bulk Sales
    dil_sale_bulk_title: '3-for-2 Sale on Perishables',
    dil_sale_bulk_prompt: 'At the supermarket you see: "Buy 3 tubs of organic yogurt for the price of 2 ($12 total)". You only need 1 tub ($6) and they expire in 5 days.',
    dil_sale_bulk_opt1: 'Buy only the 1 tub you actually need for $6: discarded food is simply throwing dollar bills into the trash',
    dil_sale_bulk_opt2: 'Buy all 3 tubs for $12 feeling you scored a "free item", even if two tubs spoil uneaten',
    dil_sale_bulk_opt3: 'Buy 6 tubs to maximize the bulk promotional savings',
    dil_sale_bulk_fb1: 'Impeccable consumer logic! You kept $6 in your pocket. The highest discount is not spending on what you cannot consume.',
    dil_sale_bulk_fb2: 'False savings: you spent an extra $6 on spoiled food that ended up in the landfill.',
    dil_sale_bulk_fb3: 'Guaranteed waste and drained grocery budgets driven by marketing volume tricks.',
  },
};
