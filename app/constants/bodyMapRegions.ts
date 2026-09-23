export type BodyRegionSlug =
  | "frente_cabeca_direito"
  | "frente_pescoco_direito"
  | "frente_clavicular_direito"
  | "frente_torax_direito"
  | "frente_abdome_direito"
  | "frente_hipogastrio_direito"
  | "frente_pelve_direito"
  | "frente_cabeca_esquerdo"
  | "frente_pescoco_esquerdo"
  | "frente_clavicular_esquerdo"
  | "frente_torax_esquerdo"
  | "frente_abdome_esquerdo"
  | "frente_hipogastrio_esquerdo"
  | "frente_pelve_esquerdo"
  | "frente_ombro_esquerdo"
  | "frente_braco_esquerdo"
  | "frente_cotovelo_esquerdo"
  | "frente_antebraco_esquerdo"
  | "frente_punho_esquerdo"
  | "frente_mao_esquerdo"
  | "frente_ombro_direito"
  | "frente_braco_direito"
  | "frente_cotovelo_direito"
  | "frente_antebraco_direito"
  | "frente_punho_direito"
  | "frente_mao_direito"
  | "frente_coxa_esquerdo"
  | "frente_joelho_esquerdo"
  | "frente_perna_esquerdo"
  | "frente_tornozelo_esquerdo"
  | "frente_pe_esquerdo"
  | "frente_coxa_direito"
  | "frente_joelho_direito"
  | "frente_perna_direito"
  | "frente_tornozelo_direito"
  | "frente_pe_direito"
  | "costas_cabeca_esquerdo"
  | "costas_pescoco_esquerdo"
  | "costas_cervicodorsal_esquerdo"
  | "costas_dorso_superior_esquerdo"
  | "costas_dorso_medio_esquerdo"
  | "costas_lombar_esquerdo"
  | "costas_gluteo_esquerdo"
  | "costas_cabeca_direito"
  | "costas_pescoco_direito"
  | "costas_cervicodorsal_direito"
  | "costas_dorso_superior_direito"
  | "costas_dorso_medio_direito"
  | "costas_lombar_direito"
  | "costas_gluteo_direito"
  | "costas_ombro_direito"
  | "costas_braco_direito"
  | "costas_cotovelo_direito"
  | "costas_antebraco_direito"
  | "costas_punho_direito"
  | "costas_mao_direito"
  | "costas_ombro_esquerdo"
  | "costas_braco_esquerdo"
  | "costas_cotovelo_esquerdo"
  | "costas_antebraco_esquerdo"
  | "costas_punho_esquerdo"
  | "costas_mao_esquerdo"
  | "costas_posterior_coxa_direito"
  | "costas_poplitea_direito"
  | "costas_panturrilha_direito"
  | "costas_tornozelo_direito"
  | "costas_pe_direito"
  | "costas_posterior_coxa_esquerdo"
  | "costas_poplitea_esquerdo"
  | "costas_panturrilha_esquerdo"
  | "costas_tornozelo_esquerdo"
  | "costas_pe_esquerdo"
;

export const BODY_REGIONS: Record<BodyRegionSlug, string> = {
  "frente_cabeca_direito": "Face (direito)",
  "frente_pescoco_direito": "Pescoço (direito)",
  "frente_clavicular_direito": "Região clavicular / peito alto (direito)",
  "frente_torax_direito": "Tórax (direito)",
  "frente_abdome_direito": "Abdome (direito)",
  "frente_hipogastrio_direito": "Baixo-ventre (direito)",
  "frente_pelve_direito": "Região pélvica / virilha (direito)",
  "frente_cabeca_esquerdo": "Face (esquerdo)",
  "frente_pescoco_esquerdo": "Pescoço (esquerdo)",
  "frente_clavicular_esquerdo": "Região clavicular / peito alto (esquerdo)",
  "frente_torax_esquerdo": "Tórax (esquerdo)",
  "frente_abdome_esquerdo": "Abdome (esquerdo)",
  "frente_hipogastrio_esquerdo": "Baixo-ventre (esquerdo)",
  "frente_pelve_esquerdo": "Região pélvica / virilha (esquerdo)",
  "frente_ombro_esquerdo": "Ombro / deltoide (esquerdo)",
  "frente_braco_esquerdo": "Braço (esquerdo)",
  "frente_cotovelo_esquerdo": "Cotovelo (esquerdo)",
  "frente_antebraco_esquerdo": "Antebraço (esquerdo)",
  "frente_punho_esquerdo": "Punho (esquerdo)",
  "frente_mao_esquerdo": "Mão (esquerdo)",
  "frente_ombro_direito": "Ombro / deltoide (direito)",
  "frente_braco_direito": "Braço (direito)",
  "frente_cotovelo_direito": "Cotovelo (direito)",
  "frente_antebraco_direito": "Antebraço (direito)",
  "frente_punho_direito": "Punho (direito)",
  "frente_mao_direito": "Mão (direito)",
  "frente_coxa_esquerdo": "Coxa (esquerdo)",
  "frente_joelho_esquerdo": "Joelho (esquerdo)",
  "frente_perna_esquerdo": "Perna (canela) (esquerdo)",
  "frente_tornozelo_esquerdo": "Tornozelo (esquerdo)",
  "frente_pe_esquerdo": "Pé (dorso) (esquerdo)",
  "frente_coxa_direito": "Coxa (direito)",
  "frente_joelho_direito": "Joelho (direito)",
  "frente_perna_direito": "Perna (canela) (direito)",
  "frente_tornozelo_direito": "Tornozelo (direito)",
  "frente_pe_direito": "Pé (dorso) (direito)",
  "costas_cabeca_esquerdo": "Cabeça (occipital) (esquerdo)",
  "costas_pescoco_esquerdo": "Nuca (esquerdo)",
  "costas_cervicodorsal_esquerdo": "Cervicodorsal / trapézio (esquerdo)",
  "costas_dorso_superior_esquerdo": "Dorso superior (esquerdo)",
  "costas_dorso_medio_esquerdo": "Dorso médio (esquerdo)",
  "costas_lombar_esquerdo": "Região lombar (esquerdo)",
  "costas_gluteo_esquerdo": "Glúteo (esquerdo)",
  "costas_cabeca_direito": "Cabeça (occipital) (direito)",
  "costas_pescoco_direito": "Nuca (direito)",
  "costas_cervicodorsal_direito": "Cervicodorsal / trapézio (direito)",
  "costas_dorso_superior_direito": "Dorso superior (direito)",
  "costas_dorso_medio_direito": "Dorso médio (direito)",
  "costas_lombar_direito": "Região lombar (direito)",
  "costas_gluteo_direito": "Glúteo (direito)",
  "costas_ombro_direito": "Ombro / deltoide (direito)",
  "costas_braco_direito": "Braço (direito)",
  "costas_cotovelo_direito": "Cotovelo (direito)",
  "costas_antebraco_direito": "Antebraço (direito)",
  "costas_punho_direito": "Punho (direito)",
  "costas_mao_direito": "Mão (direito)",
  "costas_ombro_esquerdo": "Ombro / deltoide (esquerdo)",
  "costas_braco_esquerdo": "Braço (esquerdo)",
  "costas_cotovelo_esquerdo": "Cotovelo (esquerdo)",
  "costas_antebraco_esquerdo": "Antebraço (esquerdo)",
  "costas_punho_esquerdo": "Punho (esquerdo)",
  "costas_mao_esquerdo": "Mão (esquerdo)",
  "costas_posterior_coxa_direito": "Posterior da coxa (direito)",
  "costas_poplitea_direito": "Fossa poplítea (direito)",
  "costas_panturrilha_direito": "Panturrilha (direito)",
  "costas_tornozelo_direito": "Tornozelo / tendão de Aquiles (direito)",
  "costas_pe_direito": "Calcanhar (direito)",
  "costas_posterior_coxa_esquerdo": "Posterior da coxa (esquerdo)",
  "costas_poplitea_esquerdo": "Fossa poplítea (esquerdo)",
  "costas_panturrilha_esquerdo": "Panturrilha (esquerdo)",
  "costas_tornozelo_esquerdo": "Tornozelo / tendão de Aquiles (esquerdo)",
  "costas_pe_esquerdo": "Calcanhar (esquerdo)",
};
