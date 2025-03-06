type Icon = {
  name: string
  class?: string
}
type Tab = {
  name: string
  class?: string
  icon?: Icon
  to?: string
}

type ActiveClass = {
  for_item: string
  for_icon?: string
}
export interface INavigation {
  current_item?: string
  items: Tab[]
  items_class?: string
  active_class: ActiveClass
}
