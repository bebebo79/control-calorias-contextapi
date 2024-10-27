import { Activity } from "../types"

export type ActivityActions =  
    {type : 'save-activity', payload : {newActivity : Activity}} |
    {type : 'set-activeId', payload : {id: Activity['id']}} |
    {type : 'deleted-activity', payload: {id:Activity['id']}} |
    {type : 'restart-app'}


 export type ActivityState = {
    // arreglo de actividades 
    activities : Activity[],
    activeId : Activity['id']
}

// definimos localstorage para que cuando este lleno se quede en localstorage

const localStorageActivities = (): Activity[]=>{
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
    //inicia con localStorage
    activities : localStorageActivities(),
    activeId : ''

}

export const acticityReducer = (
        state : ActivityState = initialState,
        action : ActivityActions
    
    )=> {
        // generar toda la logica
        if(action.type === "save-activity") {
            let updateActivites: Activity[] = []
            if(state.activeId) {
                updateActivites = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity
                    : activity
                )
            }else {
                updateActivites = [...state.activities, action.payload.newActivity]
            }        
            return {
                ...state,
                activities : updateActivites,
                activeId : ''
            }
            
        }
        if(action.type === 'set-activeId') {
            // retornamos el acti
            return{
                ...state,
                activeId : action.payload.id

            }
        }

        if(action.type === 'deleted-activity'){
            
            return{
                ...state,
                activities : state.activities.filter(activity => activity.id !== action.payload.id)            }
        }
        if(action.type === 'restart-app') {
            return {
                activities : [],
                activeId : ''
            }
        }



    return state
}
