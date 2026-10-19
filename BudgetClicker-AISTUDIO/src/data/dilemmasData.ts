import { FinancialDilemma } from '../types/game';

export const FINANCIAL_DILEMMAS: FinancialDilemma[] = [
  // 1. Debt Avalanche vs Snowball vs Minimum
  {
    id: 'dil_debt_strategy',
    titleKey: 'dil_debt_strategy_title',
    promptKey: 'dil_debt_strategy_prompt',
    difficulty: 'hard',
    categoryKey: 'debt',
    options: [
      {
        textKey: 'dil_debt_strategy_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 80,
        gemReward: 1,
        feedbackKey: 'dil_debt_strategy_fb1',
      },
      {
        textKey: 'dil_debt_strategy_opt2',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 50,
        gemReward: 0,
        feedbackKey: 'dil_debt_strategy_fb2',
      },
      {
        textKey: 'dil_debt_strategy_opt3',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 10,
        gemReward: 0,
        feedbackKey: 'dil_debt_strategy_fb3',
      },
    ],
  },

  // 2. Market Dip Panic vs DCA vs Lump Sum
  {
    id: 'dil_market_dip',
    titleKey: 'dil_market_dip_title',
    promptKey: 'dil_market_dip_prompt',
    difficulty: 'expert',
    categoryKey: 'investing',
    options: [
      {
        textKey: 'dil_market_dip_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 90,
        gemReward: 1,
        feedbackKey: 'dil_market_dip_fb1',
      },
      {
        textKey: 'dil_market_dip_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 15,
        gemReward: 0,
        feedbackKey: 'dil_market_dip_fb2',
      },
      {
        textKey: 'dil_market_dip_opt3',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 45,
        gemReward: 0,
        feedbackKey: 'dil_market_dip_fb3',
      },
    ],
  },

  // 3. Health Insurance Deductible: HDHP + HSA vs PPO
  {
    id: 'dil_health_insurance',
    titleKey: 'dil_health_ins_title',
    promptKey: 'dil_health_ins_prompt',
    difficulty: 'hard',
    categoryKey: 'insurance',
    options: [
      {
        textKey: 'dil_health_ins_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 75,
        gemReward: 1,
        feedbackKey: 'dil_health_ins_fb1',
      },
      {
        textKey: 'dil_health_ins_opt2',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 40,
        gemReward: 0,
        feedbackKey: 'dil_health_ins_fb2',
      },
      {
        textKey: 'dil_health_ins_opt3',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 10,
        gemReward: 0,
        feedbackKey: 'dil_health_ins_fb3',
      },
    ],
  },

  // 4. Rent vs Buy in High Price-to-Rent Market
  {
    id: 'dil_rent_vs_buy',
    titleKey: 'dil_rent_buy_title',
    promptKey: 'dil_rent_buy_prompt',
    difficulty: 'expert',
    categoryKey: 'housing',
    options: [
      {
        textKey: 'dil_rent_buy_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 85,
        gemReward: 1,
        feedbackKey: 'dil_rent_buy_fb1',
      },
      {
        textKey: 'dil_rent_buy_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 25,
        gemReward: 0,
        feedbackKey: 'dil_rent_buy_fb2',
      },
      {
        textKey: 'dil_rent_buy_opt3',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 15,
        gemReward: 0,
        feedbackKey: 'dil_rent_buy_fb3',
      },
    ],
  },

  // 5. Emergency Fund Yield: HYSA vs 14% Crypto Staking
  {
    id: 'dil_emergency_yield',
    titleKey: 'dil_emerg_yield_title',
    promptKey: 'dil_emerg_yield_prompt',
    difficulty: 'intermediate',
    categoryKey: 'emergency',
    options: [
      {
        textKey: 'dil_emerg_yield_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 70,
        gemReward: 1,
        feedbackKey: 'dil_emerg_yield_fb1',
      },
      {
        textKey: 'dil_emerg_yield_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 20,
        gemReward: 0,
        feedbackKey: 'dil_emerg_yield_fb2',
      },
      {
        textKey: 'dil_emerg_yield_opt3',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 35,
        gemReward: 0,
        feedbackKey: 'dil_emerg_yield_fb3',
      },
    ],
  },

  // 6. Buying a Car: 3-Year CPO vs Brand New Lease vs Cash Beater
  {
    id: 'dil_car_purchase',
    titleKey: 'dil_car_buy_title',
    promptKey: 'dil_car_buy_prompt',
    difficulty: 'hard',
    categoryKey: 'vehicles',
    options: [
      {
        textKey: 'dil_car_buy_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 80,
        gemReward: 1,
        feedbackKey: 'dil_car_buy_fb1',
      },
      {
        textKey: 'dil_car_buy_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 15,
        gemReward: 0,
        feedbackKey: 'dil_car_buy_fb2',
      },
      {
        textKey: 'dil_car_buy_opt3',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 45,
        gemReward: 0,
        feedbackKey: 'dil_car_buy_fb3',
      },
    ],
  },

  // 7. Salary Raise & Lifestyle Inflation
  {
    id: 'dil_lifestyle_creep',
    titleKey: 'dil_creep_title',
    promptKey: 'dil_creep_prompt',
    difficulty: 'intermediate',
    categoryKey: 'lifestyle',
    options: [
      {
        textKey: 'dil_creep_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 75,
        gemReward: 1,
        feedbackKey: 'dil_creep_fb1',
      },
      {
        textKey: 'dil_creep_opt2',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 40,
        gemReward: 0,
        feedbackKey: 'dil_creep_fb2',
      },
      {
        textKey: 'dil_creep_opt3',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 10,
        gemReward: 0,
        feedbackKey: 'dil_creep_fb3',
      },
    ],
  },

  // 8. Whole Life Insurance vs Term Life + S&P500 DCA
  {
    id: 'dil_life_insurance',
    titleKey: 'dil_life_ins_title',
    promptKey: 'dil_life_ins_prompt',
    difficulty: 'expert',
    categoryKey: 'insurance',
    options: [
      {
        textKey: 'dil_life_ins_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 90,
        gemReward: 1,
        feedbackKey: 'dil_life_ins_fb1',
      },
      {
        textKey: 'dil_life_ins_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 20,
        gemReward: 0,
        feedbackKey: 'dil_life_ins_fb2',
      },
      {
        textKey: 'dil_life_ins_opt3',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 10,
        gemReward: 0,
        feedbackKey: 'dil_life_ins_fb3',
      },
    ],
  },

  // 9. Credit Card 0% APR Balance Transfer Fee vs Payoff
  {
    id: 'dil_balance_transfer',
    titleKey: 'dil_bal_trans_title',
    promptKey: 'dil_bal_trans_prompt',
    difficulty: 'hard',
    categoryKey: 'debt',
    options: [
      {
        textKey: 'dil_bal_trans_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 80,
        gemReward: 1,
        feedbackKey: 'dil_bal_trans_fb1',
      },
      {
        textKey: 'dil_bal_trans_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 20,
        gemReward: 0,
        feedbackKey: 'dil_bal_trans_fb2',
      },
      {
        textKey: 'dil_bal_trans_opt3',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 40,
        gemReward: 0,
        feedbackKey: 'dil_bal_trans_fb3',
      },
    ],
  },

  // 10. Speculative Assets (Crypto / Meme Stocks) Exposure Limit
  {
    id: 'dil_crypto_allocation',
    titleKey: 'dil_crypto_alloc_title',
    promptKey: 'dil_crypto_alloc_prompt',
    difficulty: 'intermediate',
    categoryKey: 'investing',
    options: [
      {
        textKey: 'dil_crypto_alloc_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 75,
        gemReward: 1,
        feedbackKey: 'dil_crypto_alloc_fb1',
      },
      {
        textKey: 'dil_crypto_alloc_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 15,
        gemReward: 0,
        feedbackKey: 'dil_crypto_alloc_fb2',
      },
      {
        textKey: 'dil_crypto_alloc_opt3',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 50,
        gemReward: 0,
        feedbackKey: 'dil_crypto_alloc_fb3',
      },
    ],
  },

  // 11. Employer 401(k) / Afore Match vs Liquidity
  {
    id: 'dil_company_match',
    titleKey: 'dil_match_title',
    promptKey: 'dil_match_prompt',
    difficulty: 'intermediate',
    categoryKey: 'retirement',
    options: [
      {
        textKey: 'dil_match_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 85,
        gemReward: 1,
        feedbackKey: 'dil_match_fb1',
      },
      {
        textKey: 'dil_match_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 15,
        gemReward: 0,
        feedbackKey: 'dil_match_fb2',
      },
      {
        textKey: 'dil_match_opt3',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 45,
        gemReward: 0,
        feedbackKey: 'dil_match_fb3',
      },
    ],
  },

  // 12. Extended Warranty on High-End Laptop
  {
    id: 'dil_warranty_trap',
    titleKey: 'dil_warranty_title',
    promptKey: 'dil_warranty_prompt',
    difficulty: 'intermediate',
    categoryKey: 'spending',
    options: [
      {
        textKey: 'dil_warranty_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 70,
        gemReward: 1,
        feedbackKey: 'dil_warranty_fb1',
      },
      {
        textKey: 'dil_warranty_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 20,
        gemReward: 0,
        feedbackKey: 'dil_warranty_fb2',
      },
      {
        textKey: 'dil_warranty_opt3',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 10,
        gemReward: 0,
        feedbackKey: 'dil_warranty_fb3',
      },
    ],
  },

  // 13. Tax-Loss Harvesting During Bear Market
  {
    id: 'dil_tax_harvest',
    titleKey: 'dil_tax_harvest_title',
    promptKey: 'dil_tax_harvest_prompt',
    difficulty: 'expert',
    categoryKey: 'taxes',
    options: [
      {
        textKey: 'dil_tax_harvest_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 95,
        gemReward: 1,
        feedbackKey: 'dil_tax_harvest_fb1',
      },
      {
        textKey: 'dil_tax_harvest_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 20,
        gemReward: 0,
        feedbackKey: 'dil_tax_harvest_fb2',
      },
      {
        textKey: 'dil_tax_harvest_opt3',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 40,
        gemReward: 0,
        feedbackKey: 'dil_tax_harvest_fb3',
      },
    ],
  },

  // 14. Career Certification ROI vs Liquidity
  {
    id: 'dil_career_upskill',
    titleKey: 'dil_career_title',
    promptKey: 'dil_career_prompt',
    difficulty: 'hard',
    categoryKey: 'career',
    options: [
      {
        textKey: 'dil_career_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 85,
        gemReward: 1,
        feedbackKey: 'dil_career_fb1',
      },
      {
        textKey: 'dil_career_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 20,
        gemReward: 0,
        feedbackKey: 'dil_career_fb2',
      },
      {
        textKey: 'dil_career_opt3',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 50,
        gemReward: 0,
        feedbackKey: 'dil_career_fb3',
      },
    ],
  },

  // 15. High Dividend Yield Traps vs Total Return
  {
    id: 'dil_dividend_trap',
    titleKey: 'dil_div_trap_title',
    promptKey: 'dil_div_trap_prompt',
    difficulty: 'expert',
    categoryKey: 'investing',
    options: [
      {
        textKey: 'dil_div_trap_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 90,
        gemReward: 1,
        feedbackKey: 'dil_div_trap_fb1',
      },
      {
        textKey: 'dil_div_trap_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 25,
        gemReward: 0,
        feedbackKey: 'dil_div_trap_fb2',
      },
      {
        textKey: 'dil_div_trap_opt3',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 45,
        gemReward: 0,
        feedbackKey: 'dil_div_trap_fb3',
      },
    ],
  },

  // 16. Freelancer Quarterly Taxes vs Year-End Lump Sum
  {
    id: 'dil_freelance_taxes',
    titleKey: 'dil_free_tax_title',
    promptKey: 'dil_free_tax_prompt',
    difficulty: 'hard',
    categoryKey: 'taxes',
    options: [
      {
        textKey: 'dil_free_tax_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 80,
        gemReward: 1,
        feedbackKey: 'dil_free_tax_fb1',
      },
      {
        textKey: 'dil_free_tax_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 15,
        gemReward: 0,
        feedbackKey: 'dil_free_tax_fb2',
      },
      {
        textKey: 'dil_free_tax_opt3',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 10,
        gemReward: 0,
        feedbackKey: 'dil_free_tax_fb3',
      },
    ],
  },

  // 17. Sunk Cost Fallacy: Unused Gym / Subscription
  {
    id: 'dil_sunk_cost',
    titleKey: 'dil_sunk_cost_title',
    promptKey: 'dil_sunk_cost_prompt',
    difficulty: 'intermediate',
    categoryKey: 'psychology',
    options: [
      {
        textKey: 'dil_sunk_cost_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 70,
        gemReward: 1,
        feedbackKey: 'dil_sunk_cost_fb1',
      },
      {
        textKey: 'dil_sunk_cost_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 15,
        gemReward: 0,
        feedbackKey: 'dil_sunk_cost_fb2',
      },
      {
        textKey: 'dil_sunk_cost_opt3',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 35,
        gemReward: 0,
        feedbackKey: 'dil_sunk_cost_fb3',
      },
    ],
  },

  // 18. Emergency Medical Expense: Cash Discount vs Medical Credit Card
  {
    id: 'dil_medical_bill',
    titleKey: 'dil_medical_title',
    promptKey: 'dil_medical_prompt',
    difficulty: 'hard',
    categoryKey: 'emergency',
    options: [
      {
        textKey: 'dil_medical_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 85,
        gemReward: 1,
        feedbackKey: 'dil_medical_fb1',
      },
      {
        textKey: 'dil_medical_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 20,
        gemReward: 0,
        feedbackKey: 'dil_medical_fb2',
      },
      {
        textKey: 'dil_medical_opt3',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 45,
        gemReward: 0,
        feedbackKey: 'dil_medical_fb3',
      },
    ],
  },

  // 19. Refinancing Fixed Mortgage vs Variable during Rate Hikes
  {
    id: 'dil_mortgage_refi',
    titleKey: 'dil_mortgage_title',
    promptKey: 'dil_mortgage_prompt',
    difficulty: 'expert',
    categoryKey: 'housing',
    options: [
      {
        textKey: 'dil_mortgage_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 90,
        gemReward: 1,
        feedbackKey: 'dil_mortgage_fb1',
      },
      {
        textKey: 'dil_mortgage_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 20,
        gemReward: 0,
        feedbackKey: 'dil_mortgage_fb2',
      },
      {
        textKey: 'dil_mortgage_opt3',
        isMindful: true,
        isOptimal: false,
        cashRewardMultiplier: 50,
        gemReward: 0,
        feedbackKey: 'dil_mortgage_fb3',
      },
    ],
  },

  // 20. Retail Sales: "Buy 2 Get 1 Free" vs Buying Only What's Needed
  {
    id: 'dil_sale_bulk',
    titleKey: 'dil_sale_bulk_title',
    promptKey: 'dil_sale_bulk_prompt',
    difficulty: 'intermediate',
    categoryKey: 'spending',
    options: [
      {
        textKey: 'dil_sale_bulk_opt1',
        isMindful: true,
        isOptimal: true,
        cashRewardMultiplier: 70,
        gemReward: 1,
        feedbackKey: 'dil_sale_bulk_fb1',
      },
      {
        textKey: 'dil_sale_bulk_opt2',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 15,
        gemReward: 0,
        feedbackKey: 'dil_sale_bulk_fb2',
      },
      {
        textKey: 'dil_sale_bulk_opt3',
        isMindful: false,
        isOptimal: false,
        cashRewardMultiplier: 10,
        gemReward: 0,
        feedbackKey: 'dil_sale_bulk_fb3',
      },
    ],
  },
];
