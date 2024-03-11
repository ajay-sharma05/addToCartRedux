const INI_STATE ={
    carts : []
}

const cartReducer = (state=INI_STATE, action) =>{

switch (action.type){
    case "ADD_CART":

    const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);
    if(itemIndex >= 0){
        state.carts[itemIndex].qnty += 1;
    }else{
        const temp = {...action.payload, qnty: 1}
        return{
                  ...state,
                  carts: [...state.carts, temp]
              }
    }

    
    case "DELETE_CART":
    const data = state.carts.filter((i) => i.id !== action.payload)
    return {
        ...state, carts:data
    };

    case "REMOVE_ONE":
        const itemIndex_dec = state.carts.findIndex((item) => item.id === action.payload.id);
        
        
        if(state.carts[itemIndex_dec].qnty >= 1){

        const rmvItem = state.carts[itemIndex_dec].qnty -= 1
   
        return {
            ...state, carts:[...state.carts]
        }
    
        }
        
        // else if(state.carts[itemIndex_dec].qnty === 1){
        //     console.log('dlt')
        //     const data = state.carts.filter((i) => i.id !== action.payload)
        //     return {
        //         ...state, carts:data
        //     };
        // }


   

        default : return state
}





}

export default cartReducer