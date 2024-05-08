//import { onMounted, reactive, watch } from "vue";
//import { useRoute } from "vue-router";

type Icon = {
  name: string;
  class?: string;
};
type Tab = {
  name: string;
  class?: string;
  icon?: Icon;
  default?: boolean;
};

type ActiveClass = {
  for_item: string;
  for_icon?: string;
};
export type NavigationType = {
  current_item?: string | null;
  items: Tab[];
  items_class?: string;
  active_class: ActiveClass;
  open?: boolean;
};

// export function Navigation(menus: NavigationType): NavigationType {
//   const route = useRoute();

//   const router = useRouter();

//   console.log(router.currentRoute.value.matched.find((child)=>child.name===route.name));

//   const aside = reactive({ ...menus });

//   const catchPath = () => {
//     const _name = route.name;

//     _name && (aside.current_item = _name.toString())

//   };

//   // fetch the user information when params change
//   watch(
//     () => route.path,
//     async () => {
//       catchPath();
//     }
//   );
//   onMounted(() => {
//     catchPath();
//   });

//   return aside.menus;
// }
