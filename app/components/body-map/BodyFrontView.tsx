import React from "react";
import Svg, { Path, G, Circle, Ellipse } from "react-native-svg";
import { BodyRegionSlug, BODY_REGIONS } from "@/constants/bodyMapRegions";
import { COLORS } from "@/styles/themes";

interface Props {
  selectedRegions: BodyRegionSlug[];
  onRegionPress: (slug: BodyRegionSlug) => void;
}

export function BodyFrontView({ selectedRegions, onRegionPress }: Props) {
  const getFill = (slug: BodyRegionSlug) => {
    return selectedRegions.includes(slug) ? "#e2554b" : "#ffffff";
  };

  return (
    <Svg width="100%" height="100%" viewBox="0 0 300 720" accessibilityLabel="Visão do Corpo" accessible={true}>
      <G id="BodyFrontView-group">

        <Path
          d="M150.0 18.0 L150.0 18.0 L138.2 20.4 L133.4 22.9 L129.8 25.3 L127.2 27.8 L125.2 30.2 L123.6 32.6 L122.3 35.1 L121.2 37.5 L120.5 39.9 L120.1 42.4 L119.8 44.8 L119.6 47.2 L119.5 49.7 L119.6 52.1 L119.8 54.6 L120.1 57.0 L120.4 59.4 L120.9 61.9 L121.7 64.3 L122.6 66.8 L123.7 69.2 L124.7 71.6 L125.9 74.1 L127.1 76.5 L128.5 78.9 L129.9 81.4 L131.4 83.8 L132.9 86.2 L134.4 88.7 L135.9 91.1 L137.5 93.6 L139.0 96.0 L150.0 96.0 Z"
          fill={getFill("frente_cabeca_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_cabeca_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_cabeca_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_cabeca_direito") }}
        />
        <Path
          d="M150.0 96.0 L139.0 96.0 L139.0 98.4 L139.0 100.7 L138.8 103.1 L138.0 105.5 L137.0 107.8 L135.9 110.2 L134.5 112.5 L132.5 114.9 L130.4 117.3 L128.1 119.6 L126.0 122.0 L150.0 122.0 Z"
          fill={getFill("frente_pescoco_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_pescoco_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_pescoco_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_pescoco_direito") }}
        />
        <Path
          d="M150.0 122.0 L126.0 122.0 L121.1 124.4 L116.5 126.8 L112.3 129.3 L108.5 131.7 L104.9 134.1 L101.6 136.5 L98.9 138.9 L97.0 141.4 L95.3 143.8 L93.8 146.2 L92.7 148.6 L92.1 151.1 L92.0 153.5 L92.1 155.9 L92.2 158.3 L92.3 160.7 L92.5 163.2 L92.6 165.6 L92.8 168.0 L150.0 168.0 Z"
          fill={getFill("frente_clavicular_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_clavicular_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_clavicular_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_clavicular_direito") }}
        />
        <Path
          d="M150.0 168.0 L92.8 168.0 L93.0 170.5 L93.4 172.9 L93.8 175.4 L94.3 177.9 L94.8 180.3 L95.4 182.8 L96.0 185.3 L96.6 187.7 L97.0 190.2 L97.5 192.7 L97.9 195.1 L98.3 197.6 L98.7 200.1 L99.1 202.5 L99.4 205.0 L150.0 205.0 Z"
          fill={getFill("frente_torax_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_torax_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_torax_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_torax_direito") }}
        />
        <Path
          d="M150.0 205.0 L99.4 205.0 L99.8 207.5 L100.2 210.0 L100.6 212.4 L101.0 214.9 L101.4 217.4 L101.8 219.9 L102.3 222.3 L102.8 224.8 L103.2 227.3 L103.6 229.8 L104.1 232.3 L104.4 234.7 L104.7 237.2 L105.0 239.7 L105.2 242.2 L105.4 244.7 L105.6 247.1 L105.7 249.6 L105.9 252.1 L105.9 254.6 L106.0 257.0 L106.0 259.5 L105.8 262.0 L150.0 262.0 Z"
          fill={getFill("frente_abdome_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_abdome_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_abdome_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_abdome_direito") }}
        />
        <Path
          d="M150.0 262.0 L105.8 262.0 L105.4 264.4 L105.0 266.8 L104.4 269.2 L103.9 271.6 L103.3 273.9 L102.6 276.3 L101.6 278.7 L100.3 281.1 L99.0 283.5 L97.7 285.9 L96.7 288.3 L96.1 290.7 L96.0 293.1 L96.1 295.4 L96.2 297.8 L96.3 300.2 L96.5 302.6 L96.6 305.0 L150.0 305.0 Z"
          fill={getFill("frente_hipogastrio_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_hipogastrio_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_hipogastrio_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_hipogastrio_direito") }}
        />
        <Path
          d="M150.0 305.0 L96.6 305.0 L96.8 307.4 L97.0 309.8 L97.2 312.2 L97.4 314.6 L97.6 316.9 L97.8 319.3 L98.0 321.7 L98.3 324.1 L98.6 326.5 L98.9 328.9 L99.2 331.3 L99.5 333.7 L99.9 336.1 L100.3 338.4 L100.7 340.8 L101.2 343.2 L101.6 345.6 L102.0 348.0 L150.0 348.0 Z"
          fill={getFill("frente_pelve_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_pelve_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_pelve_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_pelve_direito") }}
        />
        <Path
          d="M150.0 18.0 L150.0 18.0 L161.8 20.4 L166.6 22.9 L170.2 25.3 L172.8 27.8 L174.8 30.2 L176.4 32.6 L177.7 35.1 L178.8 37.5 L179.5 39.9 L179.9 42.4 L180.2 44.8 L180.4 47.2 L180.5 49.7 L180.4 52.1 L180.2 54.6 L179.9 57.0 L179.6 59.4 L179.1 61.9 L178.3 64.3 L177.4 66.8 L176.3 69.2 L175.3 71.6 L174.1 74.1 L172.9 76.5 L171.5 78.9 L170.1 81.4 L168.6 83.8 L167.1 86.2 L165.6 88.7 L164.1 91.1 L162.5 93.6 L161.0 96.0 L150.0 96.0 Z"
          fill={getFill("frente_cabeca_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_cabeca_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_cabeca_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_cabeca_esquerdo") }}
        />
        <Path
          d="M150.0 96.0 L161.0 96.0 L161.0 98.4 L161.0 100.7 L161.2 103.1 L162.0 105.5 L163.0 107.8 L164.1 110.2 L165.5 112.5 L167.5 114.9 L169.6 117.3 L171.9 119.6 L174.0 122.0 L150.0 122.0 Z"
          fill={getFill("frente_pescoco_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_pescoco_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_pescoco_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_pescoco_esquerdo") }}
        />
        <Path
          d="M150.0 122.0 L174.0 122.0 L178.9 124.4 L183.5 126.8 L187.7 129.3 L191.5 131.7 L195.1 134.1 L198.4 136.5 L201.1 138.9 L203.0 141.4 L204.7 143.8 L206.2 146.2 L207.3 148.6 L207.9 151.1 L208.0 153.5 L207.9 155.9 L207.8 158.3 L207.7 160.7 L207.5 163.2 L207.4 165.6 L207.2 168.0 L150.0 168.0 Z"
          fill={getFill("frente_clavicular_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_clavicular_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_clavicular_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_clavicular_esquerdo") }}
        />
        <Path
          d="M150.0 168.0 L207.2 168.0 L207.0 170.5 L206.6 172.9 L206.2 175.4 L205.7 177.9 L205.2 180.3 L204.6 182.8 L204.0 185.3 L203.4 187.7 L203.0 190.2 L202.5 192.7 L202.1 195.1 L201.7 197.6 L201.3 200.1 L200.9 202.5 L200.6 205.0 L150.0 205.0 Z"
          fill={getFill("frente_torax_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_torax_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_torax_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_torax_esquerdo") }}
        />
        <Path
          d="M150.0 205.0 L200.6 205.0 L200.2 207.5 L199.8 210.0 L199.4 212.4 L199.0 214.9 L198.6 217.4 L198.2 219.9 L197.7 222.3 L197.2 224.8 L196.8 227.3 L196.4 229.8 L195.9 232.3 L195.6 234.7 L195.3 237.2 L195.0 239.7 L194.8 242.2 L194.6 244.7 L194.4 247.1 L194.3 249.6 L194.1 252.1 L194.1 254.6 L194.0 257.0 L194.0 259.5 L194.2 262.0 L150.0 262.0 Z"
          fill={getFill("frente_abdome_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_abdome_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_abdome_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_abdome_esquerdo") }}
        />
        <Path
          d="M150.0 262.0 L194.2 262.0 L194.6 264.4 L195.0 266.8 L195.6 269.2 L196.1 271.6 L196.7 273.9 L197.4 276.3 L198.4 278.7 L199.7 281.1 L201.0 283.5 L202.3 285.9 L203.3 288.3 L203.9 290.7 L204.0 293.1 L203.9 295.4 L203.8 297.8 L203.7 300.2 L203.5 302.6 L203.4 305.0 L150.0 305.0 Z"
          fill={getFill("frente_hipogastrio_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_hipogastrio_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_hipogastrio_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_hipogastrio_esquerdo") }}
        />
        <Path
          d="M150.0 305.0 L203.4 305.0 L203.2 307.4 L203.0 309.8 L202.8 312.2 L202.6 314.6 L202.4 316.9 L202.2 319.3 L202.0 321.7 L201.7 324.1 L201.4 326.5 L201.1 328.9 L200.8 331.3 L200.5 333.7 L200.1 336.1 L199.7 338.4 L199.3 340.8 L198.8 343.2 L198.4 345.6 L198.0 348.0 L150.0 348.0 Z"
          fill={getFill("frente_pelve_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_pelve_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_pelve_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_pelve_esquerdo") }}
        />
        <Path
          d="M209.0 124.0 L219.3 126.4 L224.3 128.9 L227.7 131.3 L230.3 133.7 L232.1 136.1 L233.2 138.6 L234.3 141.0 L235.2 143.4 L236.0 145.9 L236.7 148.3 L237.1 150.7 L237.5 153.1 L237.9 155.6 L238.3 158.0 L238.8 160.4 L239.2 162.9 L239.6 165.3 L239.9 167.7 L240.3 170.1 L240.7 172.6 L241.0 175.0 L199.0 175.0 L198.4 172.6 L197.8 170.1 L197.2 167.7 L196.5 165.3 L195.9 162.9 L195.3 160.4 L194.7 158.0 L194.1 155.6 L193.6 153.1 L193.1 150.7 L192.8 148.3 L192.7 145.9 L192.8 143.4 L193.0 141.0 L193.5 138.6 L194.0 136.1 L195.1 133.7 L196.9 131.3 L198.9 128.9 L201.6 126.4 L209.0 124.0 Z"
          fill={getFill("frente_ombro_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_ombro_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_ombro_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_ombro_esquerdo") }}
        />
        <Path
          d="M241.0 175.0 L241.3 177.5 L241.6 180.0 L241.9 182.5 L242.2 185.0 L242.5 187.5 L242.7 190.0 L243.0 192.5 L243.2 195.0 L243.4 197.5 L243.6 200.0 L243.8 202.5 L244.0 205.0 L244.2 207.5 L244.3 210.0 L244.5 212.5 L244.6 215.0 L244.8 217.5 L244.9 220.0 L245.0 222.5 L245.1 225.0 L245.3 227.5 L245.4 230.0 L245.5 232.5 L245.7 235.0 L245.8 237.5 L246.0 240.0 L246.2 242.5 L246.3 245.0 L246.5 247.5 L246.7 250.0 L213.7 250.0 L213.3 247.5 L212.8 245.0 L212.4 242.5 L212.0 240.0 L211.6 237.5 L211.2 235.0 L210.8 232.5 L210.4 230.0 L210.0 227.5 L209.6 225.0 L209.1 222.5 L208.7 220.0 L208.3 217.5 L207.9 215.0 L207.4 212.5 L207.0 210.0 L206.5 207.5 L206.0 205.0 L205.5 202.5 L205.0 200.0 L204.4 197.5 L203.8 195.0 L203.2 192.5 L202.6 190.0 L202.0 187.5 L201.4 185.0 L200.8 182.5 L200.2 180.0 L199.6 177.5 L199.0 175.0 Z"
          fill={getFill("frente_braco_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_braco_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_braco_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_braco_esquerdo") }}
        />
        <Path
          d="M246.7 250.0 L246.8 252.5 L247.0 255.0 L247.2 257.5 L247.5 260.0 L247.7 262.5 L248.0 265.0 L248.3 267.5 L248.6 270.0 L248.9 272.5 L249.2 275.0 L249.5 277.5 L249.8 280.0 L250.1 282.5 L250.4 285.0 L218.4 285.0 L218.1 282.5 L217.8 280.0 L217.5 277.5 L217.2 275.0 L216.9 272.5 L216.6 270.0 L216.3 267.5 L216.0 265.0 L215.7 262.5 L215.3 260.0 L215.0 257.5 L214.6 255.0 L214.1 252.5 L213.7 250.0 Z"
          fill={getFill("frente_cotovelo_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_cotovelo_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_cotovelo_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_cotovelo_esquerdo") }}
        />
        <Path
          d="M250.4 285.0 L250.7 287.5 L251.0 290.0 L251.3 292.5 L251.5 295.0 L251.7 297.5 L251.9 300.0 L252.1 302.5 L252.2 305.0 L252.4 307.5 L252.5 310.0 L252.6 312.5 L252.8 315.0 L252.9 317.5 L253.0 320.0 L253.1 322.5 L253.2 325.0 L253.3 327.5 L253.4 330.0 L253.5 332.5 L253.6 335.0 L253.7 337.5 L253.7 340.0 L253.8 342.5 L253.8 345.0 L253.9 347.5 L253.9 350.0 L254.0 352.5 L254.0 355.0 L254.0 357.5 L254.0 360.0 L254.1 362.5 L254.1 365.0 L254.1 367.5 L254.0 370.0 L229.9 370.0 L229.6 367.5 L229.3 365.0 L229.0 362.5 L228.7 360.0 L228.3 357.5 L228.0 355.0 L227.7 352.5 L227.3 350.0 L226.9 347.5 L226.6 345.0 L226.2 342.5 L225.9 340.0 L225.5 337.5 L225.1 335.0 L224.8 332.5 L224.4 330.0 L224.0 327.5 L223.7 325.0 L223.3 322.5 L223.0 320.0 L222.7 317.5 L222.3 315.0 L222.0 312.5 L221.6 310.0 L221.3 307.5 L220.9 305.0 L220.6 302.5 L220.2 300.0 L219.9 297.5 L219.6 295.0 L219.3 292.5 L219.0 290.0 L218.7 287.5 L218.4 285.0 Z"
          fill={getFill("frente_antebraco_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_antebraco_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_antebraco_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_antebraco_esquerdo") }}
        />
        <Path
          d="M254.0 370.0 L254.0 372.5 L254.0 375.0 L254.0 377.5 L254.0 380.0 L254.0 382.5 L254.0 385.0 L254.0 387.5 L254.0 390.0 L254.0 392.5 L254.0 395.0 L234.0 395.0 L233.5 392.5 L233.0 390.0 L232.5 387.5 L232.0 385.0 L231.6 382.5 L231.2 380.0 L230.9 377.5 L230.5 375.0 L230.2 372.5 L229.9 370.0 Z"
          fill={getFill("frente_punho_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_punho_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_punho_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_punho_esquerdo") }}
        />
        <Path
          d="M234.0 395.0 L232.0 409.0 L230.0 425.0 L229.0 437.0 L229.0 439.0 L229.0 454.8 L229.0 454.8 L229.3 456.2 L230.2 457.3 L231.5 457.9 L232.9 457.9 L234.2 457.3 L235.1 456.2 L235.4 454.8 L235.4 454.8 L235.4 439.0 L236.4 437.0 L236.4 459.8 L236.4 459.8 L236.7 461.2 L237.6 462.3 L238.9 462.9 L240.3 462.9 L241.6 462.3 L242.5 461.2 L242.8 459.8 L242.8 459.8 L242.8 437.0 L243.8 435.0 L243.8 459.8 L243.8 459.8 L244.1 461.2 L245.0 462.3 L246.3 462.9 L247.7 462.9 L249.0 462.3 L249.9 461.2 L250.2 459.8 L250.2 459.8 L250.2 435.0 L251.2 435.0 L251.2 455.8 L251.2 455.8 L251.5 457.2 L252.4 458.3 L253.7 458.9 L255.1 458.9 L256.4 458.3 L257.3 457.2 L257.6 455.8 L257.6 455.8 L257.6 435.0 L260.0 428.0 L265.0 434.0 L269.0 441.0 L271.0 436.0 L266.0 425.0 L260.0 413.0 L254.0 395.0 Z"
          fill={getFill("frente_mao_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_mao_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_mao_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_mao_esquerdo") }}
        />
        <Path
          d="M91.0 124.0 L80.7 126.4 L75.7 128.9 L72.3 131.3 L69.7 133.7 L67.9 136.1 L66.8 138.6 L65.7 141.0 L64.8 143.4 L64.0 145.9 L63.3 148.3 L62.9 150.7 L62.5 153.1 L62.1 155.6 L61.7 158.0 L61.2 160.4 L60.8 162.9 L60.4 165.3 L60.1 167.7 L59.7 170.1 L59.3 172.6 L59.0 175.0 L101.0 175.0 L101.6 172.6 L102.2 170.1 L102.8 167.7 L103.5 165.3 L104.1 162.9 L104.7 160.4 L105.3 158.0 L105.9 155.6 L106.4 153.1 L106.9 150.7 L107.2 148.3 L107.3 145.9 L107.2 143.4 L107.0 141.0 L106.5 138.6 L106.0 136.1 L104.9 133.7 L103.1 131.3 L101.1 128.9 L98.4 126.4 L91.0 124.0 Z"
          fill={getFill("frente_ombro_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_ombro_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_ombro_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_ombro_direito") }}
        />
        <Path
          d="M59.0 175.0 L58.7 177.5 L58.4 180.0 L58.1 182.5 L57.8 185.0 L57.5 187.5 L57.3 190.0 L57.0 192.5 L56.8 195.0 L56.6 197.5 L56.4 200.0 L56.2 202.5 L56.0 205.0 L55.8 207.5 L55.7 210.0 L55.5 212.5 L55.4 215.0 L55.2 217.5 L55.1 220.0 L55.0 222.5 L54.9 225.0 L54.7 227.5 L54.6 230.0 L54.5 232.5 L54.3 235.0 L54.2 237.5 L54.0 240.0 L53.8 242.5 L53.7 245.0 L53.5 247.5 L53.3 250.0 L86.3 250.0 L86.7 247.5 L87.2 245.0 L87.6 242.5 L88.0 240.0 L88.4 237.5 L88.8 235.0 L89.2 232.5 L89.6 230.0 L90.0 227.5 L90.4 225.0 L90.9 222.5 L91.3 220.0 L91.7 217.5 L92.1 215.0 L92.6 212.5 L93.0 210.0 L93.5 207.5 L94.0 205.0 L94.5 202.5 L95.0 200.0 L95.6 197.5 L96.2 195.0 L96.8 192.5 L97.4 190.0 L98.0 187.5 L98.6 185.0 L99.2 182.5 L99.8 180.0 L100.4 177.5 L101.0 175.0 Z"
          fill={getFill("frente_braco_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_braco_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_braco_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_braco_direito") }}
        />
        <Path
          d="M53.3 250.0 L53.2 252.5 L53.0 255.0 L52.8 257.5 L52.5 260.0 L52.3 262.5 L52.0 265.0 L51.7 267.5 L51.4 270.0 L51.1 272.5 L50.8 275.0 L50.5 277.5 L50.2 280.0 L49.9 282.5 L49.6 285.0 L81.6 285.0 L81.9 282.5 L82.2 280.0 L82.5 277.5 L82.8 275.0 L83.1 272.5 L83.4 270.0 L83.7 267.5 L84.0 265.0 L84.3 262.5 L84.7 260.0 L85.0 257.5 L85.4 255.0 L85.9 252.5 L86.3 250.0 Z"
          fill={getFill("frente_cotovelo_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_cotovelo_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_cotovelo_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_cotovelo_direito") }}
        />
        <Path
          d="M49.6 285.0 L49.3 287.5 L49.0 290.0 L48.7 292.5 L48.5 295.0 L48.3 297.5 L48.1 300.0 L47.9 302.5 L47.8 305.0 L47.6 307.5 L47.5 310.0 L47.4 312.5 L47.2 315.0 L47.1 317.5 L47.0 320.0 L46.9 322.5 L46.8 325.0 L46.7 327.5 L46.6 330.0 L46.5 332.5 L46.4 335.0 L46.3 337.5 L46.3 340.0 L46.2 342.5 L46.2 345.0 L46.1 347.5 L46.1 350.0 L46.0 352.5 L46.0 355.0 L46.0 357.5 L46.0 360.0 L45.9 362.5 L45.9 365.0 L45.9 367.5 L46.0 370.0 L70.1 370.0 L70.4 367.5 L70.7 365.0 L71.0 362.5 L71.3 360.0 L71.7 357.5 L72.0 355.0 L72.3 352.5 L72.7 350.0 L73.1 347.5 L73.4 345.0 L73.8 342.5 L74.1 340.0 L74.5 337.5 L74.9 335.0 L75.2 332.5 L75.6 330.0 L76.0 327.5 L76.3 325.0 L76.7 322.5 L77.0 320.0 L77.3 317.5 L77.7 315.0 L78.0 312.5 L78.4 310.0 L78.7 307.5 L79.1 305.0 L79.4 302.5 L79.8 300.0 L80.1 297.5 L80.4 295.0 L80.7 292.5 L81.0 290.0 L81.3 287.5 L81.6 285.0 Z"
          fill={getFill("frente_antebraco_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_antebraco_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_antebraco_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_antebraco_direito") }}
        />
        <Path
          d="M46.0 370.0 L46.0 372.5 L46.0 375.0 L46.0 377.5 L46.0 380.0 L46.0 382.5 L46.0 385.0 L46.0 387.5 L46.0 390.0 L46.0 392.5 L46.0 395.0 L66.0 395.0 L66.5 392.5 L67.0 390.0 L67.5 387.5 L68.0 385.0 L68.4 382.5 L68.8 380.0 L69.1 377.5 L69.5 375.0 L69.8 372.5 L70.1 370.0 Z"
          fill={getFill("frente_punho_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_punho_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_punho_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_punho_direito") }}
        />
        <Path
          d="M66.0 395.0 L68.0 409.0 L70.0 425.0 L71.0 437.0 L71.0 439.0 L71.0 454.8 L71.0 454.8 L70.7 456.2 L69.8 457.3 L68.5 457.9 L67.1 457.9 L65.8 457.3 L64.9 456.2 L64.6 454.8 L64.6 454.8 L64.6 439.0 L63.6 437.0 L63.6 459.8 L63.6 459.8 L63.3 461.2 L62.4 462.3 L61.1 462.9 L59.7 462.9 L58.4 462.3 L57.5 461.2 L57.2 459.8 L57.2 459.8 L57.2 437.0 L56.2 435.0 L56.2 459.8 L56.2 459.8 L55.9 461.2 L55.0 462.3 L53.7 462.9 L52.3 462.9 L51.0 462.3 L50.1 461.2 L49.8 459.8 L49.8 459.8 L49.8 435.0 L48.8 435.0 L48.8 455.8 L48.8 455.8 L48.5 457.2 L47.6 458.3 L46.3 458.9 L44.9 458.9 L43.6 458.3 L42.7 457.2 L42.4 455.8 L42.4 455.8 L42.4 435.0 L40.0 428.0 L35.0 434.0 L31.0 441.0 L29.0 436.0 L34.0 425.0 L40.0 413.0 L46.0 395.0 Z"
          fill={getFill("frente_mao_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_mao_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_mao_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_mao_direito") }}
        />
        <Path
          d="M199.0 348.0 L199.3 350.5 L199.6 353.0 L200.0 355.5 L200.3 358.0 L200.6 360.5 L201.0 362.9 L201.3 365.4 L201.5 367.9 L201.8 370.4 L201.9 372.9 L202.0 375.4 L202.1 377.9 L202.1 380.4 L202.1 382.9 L202.1 385.4 L202.1 387.9 L202.0 390.4 L202.0 392.8 L201.9 395.3 L201.8 397.8 L201.7 400.3 L201.6 402.8 L201.5 405.3 L201.4 407.8 L201.3 410.3 L201.2 412.8 L201.2 415.3 L201.1 417.8 L201.0 420.3 L200.9 422.7 L200.8 425.2 L200.8 427.7 L200.7 430.2 L200.6 432.7 L200.5 435.2 L200.5 437.7 L200.4 440.2 L200.3 442.7 L200.2 445.2 L200.1 447.7 L200.0 450.2 L199.9 452.6 L199.8 455.1 L199.7 457.6 L199.6 460.1 L199.4 462.6 L199.3 465.1 L199.1 467.6 L199.0 470.1 L198.8 472.6 L198.7 475.1 L198.5 477.6 L198.3 480.1 L198.1 482.5 L197.9 485.0 L197.7 487.5 L197.5 490.0 L197.4 492.5 L197.2 495.0 L160.8 495.0 L160.6 492.5 L160.5 490.0 L160.3 487.5 L160.1 485.0 L159.9 482.5 L159.7 480.1 L159.5 477.6 L159.3 475.1 L159.2 472.6 L159.0 470.1 L158.8 467.6 L158.7 465.1 L158.5 462.6 L158.3 460.1 L158.1 457.6 L157.9 455.1 L157.7 452.6 L157.5 450.2 L157.3 447.7 L157.1 445.2 L156.9 442.7 L156.6 440.2 L156.4 437.7 L156.2 435.2 L156.0 432.7 L155.8 430.2 L155.6 427.7 L155.4 425.2 L155.2 422.7 L155.0 420.3 L154.8 417.8 L154.6 415.3 L154.5 412.8 L154.3 410.3 L154.1 407.8 L153.9 405.3 L153.7 402.8 L153.5 400.3 L153.3 397.8 L153.1 395.3 L152.9 392.8 L152.8 390.4 L152.6 387.9 L152.4 385.4 L152.3 382.9 L152.2 380.4 L152.1 377.9 L152.0 375.4 L152.0 372.9 L152.0 370.4 L152.0 367.9 L152.1 365.4 L152.2 362.9 L152.3 360.5 L152.5 358.0 L152.6 355.5 L152.8 353.0 L152.9 350.5 L153.0 348.0 Z"
          fill={getFill("frente_coxa_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_coxa_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_coxa_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_coxa_esquerdo") }}
        />
        <Path
          d="M197.2 495.0 L197.1 497.5 L197.0 500.0 L196.9 502.5 L196.8 505.0 L196.8 507.5 L196.7 510.0 L196.7 512.5 L196.6 515.0 L196.6 517.5 L196.5 520.0 L196.4 522.5 L196.4 525.0 L196.3 527.5 L196.2 530.0 L196.2 532.5 L196.1 535.0 L196.1 537.5 L196.0 540.0 L196.0 542.5 L196.0 545.0 L162.0 545.0 L162.0 542.5 L162.0 540.0 L161.9 537.5 L161.9 535.0 L161.8 532.5 L161.8 530.0 L161.7 527.5 L161.6 525.0 L161.6 522.5 L161.5 520.0 L161.4 517.5 L161.4 515.0 L161.3 512.5 L161.3 510.0 L161.2 507.5 L161.2 505.0 L161.1 502.5 L161.0 500.0 L160.9 497.5 L160.8 495.0 Z"
          fill={getFill("frente_joelho_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_joelho_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_joelho_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_joelho_esquerdo") }}
        />
        <Path
          d="M196.0 545.0 L196.0 547.5 L196.2 550.0 L196.3 552.5 L196.5 555.0 L196.8 557.5 L197.0 560.0 L197.2 562.5 L197.3 565.0 L197.5 567.5 L197.5 570.0 L197.4 572.5 L197.3 575.0 L197.0 577.5 L196.7 580.0 L196.3 582.5 L195.9 585.0 L195.4 587.5 L194.9 590.0 L194.4 592.5 L193.9 595.0 L193.4 597.5 L193.0 600.0 L192.6 602.5 L192.1 605.0 L191.6 607.5 L191.0 610.0 L190.5 612.5 L189.9 615.0 L189.4 617.5 L188.8 620.0 L165.6 620.0 L165.3 617.5 L164.9 615.0 L164.6 612.5 L164.2 610.0 L163.9 607.5 L163.6 605.0 L163.3 602.5 L163.0 600.0 L162.7 597.5 L162.5 595.0 L162.2 592.5 L161.9 590.0 L161.6 587.5 L161.4 585.0 L161.1 582.5 L160.9 580.0 L160.7 577.5 L160.6 575.0 L160.5 572.5 L160.5 570.0 L160.5 567.5 L160.7 565.0 L160.8 562.5 L161.0 560.0 L161.2 557.5 L161.5 555.0 L161.7 552.5 L161.8 550.0 L162.0 547.5 L162.0 545.0 Z"
          fill={getFill("frente_perna_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_perna_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_perna_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_perna_esquerdo") }}
        />
        <Path
          d="M188.8 620.0 L188.4 622.3 L188.0 624.7 L187.6 627.0 L187.3 629.3 L187.0 631.7 L186.8 634.0 L186.7 636.3 L186.5 638.7 L186.4 641.0 L186.3 643.3 L186.1 645.7 L186.0 648.0 L168.0 648.0 L167.9 645.7 L167.7 643.3 L167.6 641.0 L167.5 638.7 L167.3 636.3 L167.2 634.0 L167.0 631.7 L166.8 629.3 L166.5 627.0 L166.2 624.7 L165.9 622.3 L165.6 620.0 Z"
          fill={getFill("frente_tornozelo_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_tornozelo_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_tornozelo_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_tornozelo_esquerdo") }}
        />
        <Path
          d="M168.0 648.0 L164.0 660.0 L161.0 672.0 L160.0 678.0 L160.0 678.0 L160.0 686.8 L160.0 686.8 L160.4 688.6 L161.6 690.1 L163.3 690.9 L165.1 690.9 L166.8 690.1 L168.0 688.6 L168.4 686.8 L168.4 686.8 L168.4 678.0 L169.1 679.0 L169.1 686.7 L169.1 686.7 L169.4 688.1 L170.3 689.3 L171.7 689.9 L173.1 689.9 L174.5 689.3 L175.4 688.1 L175.7 686.7 L175.7 686.7 L175.7 679.0 L176.4 679.0 L176.4 685.5 L176.4 685.5 L176.7 686.8 L177.5 687.8 L178.7 688.4 L180.1 688.4 L181.3 687.8 L182.1 686.8 L182.4 685.5 L182.4 685.5 L182.4 679.0 L183.1 679.0 L183.1 684.2 L183.1 684.2 L183.4 685.4 L184.1 686.4 L185.2 686.9 L186.5 686.9 L187.6 686.4 L188.3 685.4 L188.6 684.2 L188.6 684.2 L188.6 679.0 L189.3 678.0 L189.3 682.0 L189.3 682.0 L189.5 683.1 L190.2 684.0 L191.2 684.4 L192.4 684.4 L193.4 684.0 L194.1 683.1 L194.3 682.0 L194.3 682.0 L194.3 678.0 L194.0 678.0 L193.0 670.0 L190.0 659.0 L186.0 648.0 Z"
          fill={getFill("frente_pe_esquerdo")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_pe_esquerdo")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_pe_esquerdo"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_pe_esquerdo") }}
        />
        <Path
          d="M101.0 348.0 L100.7 350.5 L100.4 353.0 L100.0 355.5 L99.7 358.0 L99.4 360.5 L99.0 362.9 L98.7 365.4 L98.5 367.9 L98.2 370.4 L98.1 372.9 L98.0 375.4 L97.9 377.9 L97.9 380.4 L97.9 382.9 L97.9 385.4 L97.9 387.9 L98.0 390.4 L98.0 392.8 L98.1 395.3 L98.2 397.8 L98.3 400.3 L98.4 402.8 L98.5 405.3 L98.6 407.8 L98.7 410.3 L98.8 412.8 L98.8 415.3 L98.9 417.8 L99.0 420.3 L99.1 422.7 L99.2 425.2 L99.2 427.7 L99.3 430.2 L99.4 432.7 L99.5 435.2 L99.5 437.7 L99.6 440.2 L99.7 442.7 L99.8 445.2 L99.9 447.7 L100.0 450.2 L100.1 452.6 L100.2 455.1 L100.3 457.6 L100.4 460.1 L100.6 462.6 L100.7 465.1 L100.9 467.6 L101.0 470.1 L101.2 472.6 L101.3 475.1 L101.5 477.6 L101.7 480.1 L101.9 482.5 L102.1 485.0 L102.3 487.5 L102.5 490.0 L102.6 492.5 L102.8 495.0 L139.2 495.0 L139.4 492.5 L139.5 490.0 L139.7 487.5 L139.9 485.0 L140.1 482.5 L140.3 480.1 L140.5 477.6 L140.7 475.1 L140.8 472.6 L141.0 470.1 L141.2 467.6 L141.3 465.1 L141.5 462.6 L141.7 460.1 L141.9 457.6 L142.1 455.1 L142.3 452.6 L142.5 450.2 L142.7 447.7 L142.9 445.2 L143.1 442.7 L143.4 440.2 L143.6 437.7 L143.8 435.2 L144.0 432.7 L144.2 430.2 L144.4 427.7 L144.6 425.2 L144.8 422.7 L145.0 420.3 L145.2 417.8 L145.4 415.3 L145.5 412.8 L145.7 410.3 L145.9 407.8 L146.1 405.3 L146.3 402.8 L146.5 400.3 L146.7 397.8 L146.9 395.3 L147.1 392.8 L147.2 390.4 L147.4 387.9 L147.6 385.4 L147.7 382.9 L147.8 380.4 L147.9 377.9 L148.0 375.4 L148.0 372.9 L148.0 370.4 L148.0 367.9 L147.9 365.4 L147.8 362.9 L147.7 360.5 L147.5 358.0 L147.4 355.5 L147.2 353.0 L147.1 350.5 L147.0 348.0 Z"
          fill={getFill("frente_coxa_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_coxa_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_coxa_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_coxa_direito") }}
        />
        <Path
          d="M102.8 495.0 L102.9 497.5 L103.0 500.0 L103.1 502.5 L103.2 505.0 L103.2 507.5 L103.3 510.0 L103.3 512.5 L103.4 515.0 L103.4 517.5 L103.5 520.0 L103.6 522.5 L103.6 525.0 L103.7 527.5 L103.8 530.0 L103.8 532.5 L103.9 535.0 L103.9 537.5 L104.0 540.0 L104.0 542.5 L104.0 545.0 L138.0 545.0 L138.0 542.5 L138.0 540.0 L138.1 537.5 L138.1 535.0 L138.2 532.5 L138.2 530.0 L138.3 527.5 L138.4 525.0 L138.4 522.5 L138.5 520.0 L138.6 517.5 L138.6 515.0 L138.7 512.5 L138.7 510.0 L138.8 507.5 L138.8 505.0 L138.9 502.5 L139.0 500.0 L139.1 497.5 L139.2 495.0 Z"
          fill={getFill("frente_joelho_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_joelho_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_joelho_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_joelho_direito") }}
        />
        <Path
          d="M104.0 545.0 L104.0 547.5 L103.8 550.0 L103.7 552.5 L103.5 555.0 L103.2 557.5 L103.0 560.0 L102.8 562.5 L102.7 565.0 L102.5 567.5 L102.5 570.0 L102.6 572.5 L102.7 575.0 L103.0 577.5 L103.3 580.0 L103.7 582.5 L104.1 585.0 L104.6 587.5 L105.1 590.0 L105.6 592.5 L106.1 595.0 L106.6 597.5 L107.0 600.0 L107.4 602.5 L107.9 605.0 L108.4 607.5 L109.0 610.0 L109.5 612.5 L110.1 615.0 L110.6 617.5 L111.2 620.0 L134.4 620.0 L134.7 617.5 L135.1 615.0 L135.4 612.5 L135.8 610.0 L136.1 607.5 L136.4 605.0 L136.7 602.5 L137.0 600.0 L137.3 597.5 L137.5 595.0 L137.8 592.5 L138.1 590.0 L138.4 587.5 L138.6 585.0 L138.9 582.5 L139.1 580.0 L139.3 577.5 L139.4 575.0 L139.5 572.5 L139.5 570.0 L139.5 567.5 L139.3 565.0 L139.2 562.5 L139.0 560.0 L138.8 557.5 L138.5 555.0 L138.3 552.5 L138.2 550.0 L138.0 547.5 L138.0 545.0 Z"
          fill={getFill("frente_perna_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_perna_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_perna_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_perna_direito") }}
        />
        <Path
          d="M111.2 620.0 L111.6 622.3 L112.0 624.7 L112.4 627.0 L112.7 629.3 L113.0 631.7 L113.2 634.0 L113.3 636.3 L113.5 638.7 L113.6 641.0 L113.7 643.3 L113.9 645.7 L114.0 648.0 L132.0 648.0 L132.1 645.7 L132.3 643.3 L132.4 641.0 L132.5 638.7 L132.7 636.3 L132.8 634.0 L133.0 631.7 L133.2 629.3 L133.5 627.0 L133.8 624.7 L134.1 622.3 L134.4 620.0 Z"
          fill={getFill("frente_tornozelo_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_tornozelo_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_tornozelo_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_tornozelo_direito") }}
        />
        <Path
          d="M132.0 648.0 L136.0 660.0 L139.0 672.0 L140.0 678.0 L140.0 678.0 L140.0 686.8 L140.0 686.8 L139.6 688.6 L138.4 690.1 L136.7 690.9 L134.9 690.9 L133.2 690.1 L132.0 688.6 L131.6 686.8 L131.6 686.8 L131.6 678.0 L130.9 679.0 L130.9 686.7 L130.9 686.7 L130.6 688.1 L129.7 689.3 L128.3 689.9 L126.9 689.9 L125.5 689.3 L124.6 688.1 L124.3 686.7 L124.3 686.7 L124.3 679.0 L123.6 679.0 L123.6 685.5 L123.6 685.5 L123.3 686.8 L122.5 687.8 L121.3 688.4 L119.9 688.4 L118.7 687.8 L117.9 686.8 L117.6 685.5 L117.6 685.5 L117.6 679.0 L116.9 679.0 L116.9 684.2 L116.9 684.2 L116.6 685.4 L115.9 686.4 L114.8 686.9 L113.5 686.9 L112.4 686.4 L111.7 685.4 L111.4 684.2 L111.4 684.2 L111.4 679.0 L110.7 678.0 L110.7 682.0 L110.7 682.0 L110.5 683.1 L109.8 684.0 L108.8 684.4 L107.6 684.4 L106.6 684.0 L105.9 683.1 L105.7 682.0 L105.7 682.0 L105.7 678.0 L106.0 678.0 L107.0 670.0 L110.0 659.0 L114.0 648.0 Z"
          fill={getFill("frente_pe_direito")}
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinejoin="round"
          onPress={() => onRegionPress("frente_pe_direito")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={BODY_REGIONS["frente_pe_direito"]}
          accessibilityState={{ checked: selectedRegions.includes("frente_pe_direito") }}
        />
      </G>
      <G id="BodyFrontView-detalhes" aria-hidden="true">
        <Ellipse cx="138" cy="52" rx="3.2" ry="2.4" fill="#111111" />
        <Ellipse cx="162" cy="52" rx="3.2" ry="2.4" fill="#111111" />
        <Path d="M150 62 L150 71 L154 73" fill="none" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
        <Path d="M142 82 Q150 86 158 82" fill="none" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
        <Circle cx="128" cy="186" r="2.6" fill="#111111" />
        <Circle cx="172" cy="186" r="2.6" fill="#111111" />
        <Circle cx="150" cy="252" r="2.6" fill="#111111" />
      </G>
    </Svg>
  );
}
