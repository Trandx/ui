export const parseToArray = (data: any)=>{
  
    if(!data){
      //return !isSelectMultiple.value?"": []
       return []
    }
  
    if(/*isSelectMultiple.value &&*/ !Array.isArray(data)){
      
      return [data]
    }
  
    return data
  }