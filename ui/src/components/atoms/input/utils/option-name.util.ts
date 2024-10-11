import getDataByStingDeclaration from "./select-data.util"

type OptionFormatType = {
  name: string;
  value: string;
}

export const optionName = (option: any, optionFormat: OptionFormatType): string => {

    if (typeof option == 'object' && !Array.isArray(option)) {
      const optionName = getDataByStingDeclaration(option, optionFormat.name)

      if (optionName ) {
        return optionName.toString();
      } else {
        return "no data"
      }
    } else {
      return option.toString();
    }
  };