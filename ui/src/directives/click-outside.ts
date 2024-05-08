const clickOutsideDirective = (app: any) =>
  app.directive("click-outside", {
    mounted(el: any, binding: any) {
      el.clickOutsideEvent = (event: Event) => {
        //console.log(el, event.target);

        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event, el);
        }
      };
      document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el: any) {
      document.removeEventListener("click", el.clickOutsideEvent);
    },
  });

export default clickOutsideDirective;
