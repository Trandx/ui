type DropdownType = {
    button: string;
    target: string;
    options: DropdownOptionsType;
  };
  
  type DropdownOptionsType = {
    event: string;
    hide: boolean;
  };
  
  export function DropDown({ button, target, options }: DropdownType) {
    // set the dropdown menu element
    const _target = document.querySelector(target);
  
    // set the element that trigger the dropdown menu on click
    const _button = document.querySelector(button);
  
    const _hide = (state: boolean) =>
      !state
        ? _target?.removeAttribute("hidden")
        : _target?.setAttribute("hidden", "");
  
    _button?.addEventListener(options?.event || "click", () => {
      _target?.toggleAttribute("hidden");
    });
  
    // default running
    _hide(options.hide);
  
    return {
      hide: () => _hide(true),
      show: () => _hide(false),
    };
  }
  