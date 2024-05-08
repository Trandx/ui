export declare interface  IInputRules {
    pattern?: string, 
    value: string, 
    max?: number, 
    min?: number
    minLength?: number
    maxLength?:number
}

export declare interface IInput {
    pattern?: string, 
    value: string,
    length?: number
    maxVal?: number
    minVal?: number
}

export class InputRules {

    constructor({ value, pattern, max, min, minLength, maxLength}:IInputRules){
        this.value = value
        this.max = max
        this.min = min
        this.pattern = pattern
        this.minLength = minLength
        this.maxLength = maxLength
    }

    private pattern?: string
    private value: string
    private max?: number
    private min?: number
    private minLength?: number
    private maxLength?:number

    private static isEmpty(value: string){
        if(value =='') return true

        return false
    }

    private isEmpty(){
        if(this.value =='') return true

        return false
    }

    static check({pattern, value}:{pattern: string, value: string}){
        const regex = new RegExp(pattern);

        return InputRules.isEmpty(value) || regex.test(value)
    }

    static isGoodEmailFormat({pattern, value}:IInput){

        const defaultRegex = /^[\w_.+-]+@[\w_.+-]+\.[\w_.+-]{2,}$/
        
        const regex = new RegExp(pattern || defaultRegex);

        return  InputRules.isEmpty(value) || regex.test(value)
    }

    isGoodEmailFormat(){

        const defaultRegex = /^[\w_.+-]+@[\w_.+-]+\.[\w_.+-]{2,}$/

        const regex = new RegExp(this.pattern || defaultRegex);

        return  this.isEmpty() || regex.test(this.value)
    }

    static parseToNumber({pattern, value}:IInput){
        const regex = pattern || /\D/g;
    
        return value.toString().replace(regex, "")
    }

    parseToNumber(){
        const regex = this.pattern || /\D/g;
    
        return this.isEmpty() || this.value.replace(regex, "")
    }

    static isMinLength({value, length}:IInput){
        return InputRules.isEmpty(value) || (length ? value.length >= length : false)
    }

    isMinLength(){
        return this.isEmpty() || (this.minLength ? this.value.length >= this.minLength: false)
    }

    static isUpThanTheMinimum({value, minVal}:IInput){
        const number = Number(value)
        if(InputRules.isEmpty(value)){
            return true
        }
        if(!isNaN(number) && minVal){
            return number >= minVal
        }
        return false
    }

    isUpThanTheMinimum(){
        const number = Number(this.value)
        
        if(this.isEmpty()){
            return true
        }
        if(!isNaN(number) && this.min){
            return number >= this.min
        }
        return false
    }

    static isDownTheMaximum({value, maxVal}:IInput){
        const number = Number(value)
        
        if(InputRules.isEmpty(value)){
            return true
        }

        if(!isNaN(number) && maxVal){
            return number <= maxVal
        }
        return false
    }

    isDownTheMaximum(){
        const number = Number(this.value)

        if(this.isEmpty()){
            return true
        }

        if(!isNaN(number) && this.max){
            return number <= this.max
        }
        return false
    }

    static isMaxLength({value, length}:IInput){
        return InputRules.isEmpty(value) || ( length ? value.length <= length : false )
    }

    isMaxLength(){
        return this.isEmpty() || ( this.maxLength ? this.value.length <= this.maxLength : false )
    }

    static limit({value, length}:IInput){
        
        return InputRules.isEmpty(value) || (length && value.length > length ? value.substring(0, length) : value )

    }

    limit(){
        
        return this.isEmpty() || (this.maxLength && this.value.length > this.maxLength ? this.value.substring(0, this.maxLength) : this.value )

    }

    
}