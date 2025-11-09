import { ActivityData } from "@/activitiesMockData";

export type ActivityWithOpacity = ActivityData & { opacity: number };

const PLANNED_BG = "#0f9d58";
const PLANNED_BORDER = "#006425";
const PLANNED_GLYPH = "#60d98f";

const DEFAULT_BG = "#DB4437";
const DEFAULT_BORDER = "#B72C1F";
const DEFAULT_GLYPH = "#FFFFFF";

/**
 * Hängt einen Opacity-Wert (0.0 - 1.0) als Alpha-Kanal an eine Hex-Farbe an.
 */
function applyOpacityToHex(hexColor: string, opacity: number): string {
  const baseHex = hexColor.replace("#", "");
  const alphaValue = Math.round(opacity * 255);
  const alphaHex = alphaValue.toString(16).padStart(2, "0");
  return `#${baseHex}${alphaHex}`;
}

export function getPinColor(activity: ActivityWithOpacity, isPlanned: boolean) {
  const { opacity } = activity;

  const finalBg = isPlanned ? PLANNED_BG : applyOpacityToHex(DEFAULT_BG, opacity);
  const finalBorder = isPlanned ? PLANNED_BORDER : applyOpacityToHex(DEFAULT_BORDER, opacity);
  const finalGlyph = isPlanned ? PLANNED_GLYPH : applyOpacityToHex(DEFAULT_GLYPH, opacity);

  return {
    background: finalBg,
    borderColor: finalBorder,
    glyphColor: finalGlyph,
  };
}
