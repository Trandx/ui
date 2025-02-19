const GetPositionOfElement = (refElt: HTMLElement) => {
  // const left = selectElement.value.getBoundingClientRect().left;
  const position = refElt.getBoundingClientRect();
  //console.log(position);
  
  return position;
};

const checkViewportSize = () => ({
  "height" : window.innerHeight,
  "width" : window.innerWidth
})

const ChooseCorrectWayForItemsList = (refElt: HTMLElement) => {
  // get position of select element
  // const bodyElement = document.body;

  // const bodyHeight = Math.max(
  //   bodyElement.scrollHeight,
  //   bodyElement.offsetHeight
  // );

  const showEltTo = {
    top: false,
    bottom: false,
    left: false,
    right: false
  }

  const selectPosition = GetPositionOfElement(refElt);

  const viewport = checkViewportSize();

  if (selectPosition.left-(viewport.width/2) <= 0) {
    
    // put itemsList to bottom
    showEltTo.right = true
  } else {
    showEltTo.left = true
  }

  if (selectPosition.top-(viewport.height/2) <= 0) {
    
    // put itemsList to bottom
    showEltTo.bottom = true
  } else {
    showEltTo.top = true
  }

  return showEltTo
};

export { GetPositionOfElement , ChooseCorrectWayForItemsList };
