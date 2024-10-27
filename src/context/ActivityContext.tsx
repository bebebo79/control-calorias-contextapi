import {createContext, ReactNode, useReducer } from "react";
import {initialState, acticityReducer, ActivityState, ActivityActions } from "../reducers/activity-reducer";
import { Dispatch, useMemo } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";

// creamos los Props Context y de Provide
type ActivityProvideProps = {
    children : ReactNode
}

type ActivityContextProps = {
    state : ActivityState,
    dispatch : Dispatch<ActivityActions>,
    caloriesConsumed : number,
    caloriesQuemadas : number,
    caloriesTotales : number,
    nameCategory : (category: Activity["category"]) => string[],
    isEmptyActivities: boolean

    
}


export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvide = ({children} :  ActivityProvideProps) => {

    // pasamos el dispatch con useReducer y el state
    const [state, dispatch] = useReducer(acticityReducer, initialState)

    // Contadores
    const caloriesConsumed = useMemo(()=> state.activities.reduce((total, activity)=> activity.category === 1 ? total + activity.calory : total, 0) ,[state.activities])
    const caloriesQuemadas = useMemo(()=> state.activities.reduce((total, activity)=> activity.category === 2 ? total + activity.calory : total, 0 ),[state.activities])     
    const caloriesTotales = useMemo(()=> caloriesConsumed-caloriesQuemadas,[state.activities])

    // utilizamo useMemo para traernos el name de la categoria
    const nameCategory = useMemo(()=> ( category : Activity['category'])=> categories.map(cat => cat.id === category ? cat.name : '') ,[state.activities])

    //si no hay actividades....
    const isEmptyActivities = useMemo(()=> state.activities.length === 0 , [state.activities])

    return (
        <ActivityContext.Provider 
        value={{state,dispatch, caloriesConsumed,caloriesQuemadas,caloriesTotales, nameCategory, isEmptyActivities}}>

        {children}    

        </ActivityContext.Provider>
    )
}