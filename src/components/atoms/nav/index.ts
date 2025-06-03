import { onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { INavigation } from './index.type'

export function Navigation(menus: INavigation): INavigation {
  const route = useRoute()

  const aside = reactive({ menus: menus })

  const catchPath = () => {
    const _name = route.name
    _name && (aside.menus.current_item = _name.toString())
  }

  // fetch the user information when params change
  watch(
    () => route.path,
    async () => {
      catchPath()
    },
  )
  onMounted(() => {
    catchPath()
  })

  return aside.menus
}