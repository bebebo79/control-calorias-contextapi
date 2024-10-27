import CaloriesDisplay from "./CaloriesDisplay"
import { useActivity } from "../hook/useActiviy"


export default function CalorieTracker() {

    // hemos pasado al context toda la logica 
    const {caloriesConsumed,caloriesQuemadas,caloriesTotales } = useActivity()
  
    return (
    <>
        <h2 className="text-4xl text-white font-black text-center">Resumen de Calorias</h2>
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <CaloriesDisplay
                calories={caloriesConsumed}
                text= {"Calorias Consumidas"}
            />
            <CaloriesDisplay
                calories ={caloriesQuemadas}
                text = {"Calorias Quemadas"}
            />            
            <CaloriesDisplay
                calories = {caloriesTotales}
                text = {"Calorias Totales"}
            />
        </div>
        
            
       
       
        
        
    
    </>
  )
}
