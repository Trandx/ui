//import { onMounted, reactive, watch } from "vue";
//import { useRoute } from "vue-router";

type Icon = {
  name: string
  class?: string
}
type Tab = {
  name: string
  path?: string
  alias?: string | null
  class?: string
  icon?: Icon
  default?: boolean
}

type ActiveClass = {
  for_item: string
  for_icon?: string
}
export interface ISidebar{
  current_item?: string | null
  items: Tab[]
  items_class?: string
  active_class: ActiveClass
  open?: boolean
  strict?: boolean /// to check if current path is the same
}