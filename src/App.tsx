import Form from "./componentes/Form"
import { useEffect, useMemo} from "react"
import ActivityList from "./componentes/ActivityList"
import CalorieTracker from "./componentes/CalorieTracker"
import { useActivity } from "./hook/useActiviy"


function App() {

  const {state, dispatch} = useActivity()

  // para aplicar localstorage
    useEffect(()=>{
    localStorage.setItem('activities', JSON.stringify(state.activities))

    }, [state.activities])

  //para el boton de reiniciar app
  const CanRestarApp = () => useMemo(()=> state.activities.length ,[state.activities])  
  
  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
            <h1 className="text-center font-bold text-white uppercase">Contador de Calorias</h1> 

            <button 
            className="bg-gray-800 hover:bg-gray-900 p-2 text-white font-bold uppercase cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!CanRestarApp()}
            onClick={() => dispatch({type: 'restart-app'})}>
              Reiniciar App  
            </button> 
          
        </div>  
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>            
      </section>
      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
            <CalorieTracker/>
              
        </div>
      </section>  
      <section className="p-10 mx-auto max-w-4xl">
          <ActivityList />
      </section>    
    </>
  )
}

export default App
