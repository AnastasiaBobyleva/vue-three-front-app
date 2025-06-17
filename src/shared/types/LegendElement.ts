import { type RgbColor } from '@/shared/types/RgbColor'

function RGBToHex(r: number, g: number, b: number) {
  let rStr: string = r.toString(16)
  let gStr: string = g.toString(16)
  let bStr: string = b.toString(16)

  if (rStr.length == 1) rStr = '0' + rStr
  if (gStr.length == 1) gStr = '0' + gStr
  if (bStr.length == 1) bStr = '0' + bStr

  return '#' + rStr + gStr + bStr
}

export interface LegendElement {
  color: string
  label: string
  typeId: string
  enabled: boolean
}

export const legendElement = (color: RgbColor, label: string, type: string): LegendElement => {
  return {
    typeId: type,
    label: label,
    color: RGBToHex(color.r, color.g, color.b),
    enabled: true
  }
}

