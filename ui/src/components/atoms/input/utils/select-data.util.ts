export default  function getDataByStingDeclaration <T>(
    objectOrArrayData: T | T[],
    path: string,
  ) {
    const pathList = path.split(".");
  
    return pathList.reduce((item: any, pathVal) => {
      if (typeof item !== "string" && pathVal in item) {
        
        return item[pathVal];
      }
      throw Error(`property "${pathVal}" doesn't exist in sort data`);
    }, objectOrArrayData);
  };