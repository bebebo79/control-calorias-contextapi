import { categories } from "../data/categories"
import { v4 as uudiv4 } from 'uuid'
import { Activity } from "../types"
import { useState, ChangeEvent, FormEvent,useEffect } from "react"
import { useActivity } from "../hook/useActiviy"



const inicialState : Activity =  {
      id : uudiv4(),
      category: 1,
      name:'',
      calory: 0
}

export default function Form( ) {

  const { state, dispatch} = useActivity()
  
  //creamos el State
  const [activity, setActivity] = useState<Activity>(inicialState)

  // creamos el Effect para cuando se seleccione el id aparezca en el formulario
  useEffect(()=>{
    if(state.activeId){
      const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId) [0]
      setActivity(selectActivity)
    }

  }, [state.activeId])



  const handlerChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=>{
    //identificamos los elementos del array que queremos convertir en numero
    const isNumbFiles = ['category', 'calory'].includes(e.target.id)
    setActivity({
      ...activity,
      [e.target.id] : isNumbFiles ? +e.target.value : e.target.value
    })
  }

  //funcion para desabilitar la funcion de guardar hasta que no pase la validacion
  const isValidActivity = ()=>{
    const{name, calory} = activity;
    
    return name.trim() !=='' && calory > 10;
  }

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({type:"save-activity", payload:{newActivity:activity}})
    setActivity({
      ...inicialState,
      id : uudiv4()
    })
  }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handlerSubmit}>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoria: </label>
                <select 
                  value={activity.category} 
                  id="category" 
                  className="border border-slate-300 p-2 rounded-md w-full bg-white"
                  onChange={handlerChange}
                  >
                    {categories.map(category =>(
                    <option key={category.id} value={category.id}>{category.name}</option>

                  ))}
                </select>
            
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="name" className="font-bold">Actividad: </label>
          <input 
            type="text" 
            id="name" 
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej. Comida, Zumo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta" 
            value={activity.name}
            onChange={handlerChange}
          />

        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calory" className="font-bold">Calorias: </label>
          <input 
            type="number" 
            id="calory" 
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Calorias Ej. 300 ó 500"
            value={activity.calory}
            onChange={handlerChange} 
          />

        </div>
        <input type="submit" 
               className="bg-gray-800 hover:bg-gray-600 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
               value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
               disabled={!isValidActivity()}
         />
               
               


    </form>
  )
}
