import { onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";

type Icon = {
  name: string;
  class?: string;
};
type Tab = {
  name: string;
  class?: string;
  icon?: Icon;
  to?: string;
};

type ActiveClass = {
  for_item: string;
  for_icon?: string;
};
export type NavigationType = {
  current_item?: string;
  items: Tab[];
  items_class?: string;
  active_class: ActiveClass;
};

export function Navigation(menus: NavigationType): NavigationType {
  const route = useRoute();

  const aside = reactive({ menus: menus });

  const catchPath = () => {
    const _name = route.name;
    _name && (aside.menus.current_item = _name.toString());
  };

  // fetch the user information when params change
  watch(
    () => route.path,
    async () => {
      catchPath();
    }
  );
  onMounted(() => {
    catchPath();
  });

  return aside.menus;
}
