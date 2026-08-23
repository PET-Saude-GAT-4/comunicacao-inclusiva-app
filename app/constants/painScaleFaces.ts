import type { ScaleItem } from "@/components/pain-scale/types";
import Face0 from "@assets/images/pain-scale/face-0.svg";
import Face1 from "@assets/images/pain-scale/face-1.svg";
import Face2 from "@assets/images/pain-scale/face-2.svg";
import Face3 from "@assets/images/pain-scale/face-3.svg";
import Face4 from "@assets/images/pain-scale/face-4.svg";
import Face5 from "@assets/images/pain-scale/face-5.svg";

const FACES = [Face0, Face1, Face2, Face3, Face4, Face5];

/**
 * Wong-Baker FACES wording (pt-BR), ascending by intensity.
 */
const FACE_LABELS = [
  { description: "Não dói nada", severity: "Ausência de dor" },
  { description: "Dói só um pouquinho", severity: "Dor muito leve" },
  { description: "Dói um pouco mais", severity: "Dor leve" },
  { description: "Dói ainda mais", severity: "Dor moderada" },
  { description: "Dói muito", severity: "Dor intensa" },
  { description: "Dói o máximo", severity: "Dor máxima" },
];

export const PAIN_SCALE_FACES: ScaleItem[] = FACES.map((Face, index) => ({
  value: index / (FACES.length - 1),
  Face,
  label: FACE_LABELS[index].description,
  severity: FACE_LABELS[index].severity,
}));
