import getDataByStingDeclaration from "./select-data.utils"

type SearchDataType = {
    data: string[] | Object[]
    dataFormat?: {
        name: string
        value: string
    }
    keyword : string
}

export default async function SearchData({data, keyword, dataFormat = { name: "name", value: "value" }}:SearchDataType){

    console.log(keyword);
    
    const new_data = data.filter((item)=>{

        let itemName: string

        if( typeof item === "string" ){
            itemName = item.toLowerCase()
        }else{
             itemName = getDataByStingDeclaration<typeof item>(item, dataFormat.name).toLowerCase()

            //console.log(itemName, dataFormat.name );
             
        }
        
        return itemName.includes(keyword)
    })
 
    return {
        new_data, 
        old_data: data,  
        keyword
    }
}