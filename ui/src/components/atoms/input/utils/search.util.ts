import { optionName } from './option-name.util';

type SearchType = {
    keyword: string;
    //searchableData: OptionsType;
    dataFormat: any;
    data: any[];
    reverse?: boolean;
    strict?: boolean;
  };

export const search  = async({
  keyword,
  dataFormat: optionFormat,
  data: searchableData,
  reverse = false,
  strict = false,
  }: SearchType): Promise<{ has_result: boolean; data: any; }> => {
    let has_result: boolean = false;
  
    keyword = keyword.toLowerCase();
  
    const data = searchableData.filter((option) => {
      let test: boolean = false;
      let name: string;
  
      name = optionName(option, optionFormat).toLowerCase();
  
      if (strict) {
        test = name === keyword;
      } else {
        test = name.includes(keyword);
      }
  
      if (!has_result && test && reverse) {
        has_result = true;
      }
      if (!has_result && test && !reverse) {
        has_result = true;
      }
  
      return reverse ? !test : test;
    });
  
    const result = {
      has_result,
      data,
    };
    return result;
  };