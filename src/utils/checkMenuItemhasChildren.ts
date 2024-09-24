import type { HorizontalMenuDataType } from '@/types/menuTypes'

export function hasChildren(item: HorizontalMenuDataType): boolean {
  return 'children' in item && Array.isArray(item.children)
}
