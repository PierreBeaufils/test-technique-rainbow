import { useReducer, useContext, createContext } from 'react'

const initialState = {
  addressList: ['45 Rue Edouard Nortier, Neuilly-sur-Seine, France', '42 Avenue de la Grande Armée, Paris, France'],
  startAddress: '45 Rue Delizy, Pantin, France',
}

const StateContext = createContext({})
const DispatchContext = createContext({})

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ADDRESS':
      return { ...state, addressList: [...state.addressList, action.payload] }
    case 'DELETE_ADDRESS':
      return { ...state, addressList: state.addressList.filter(item => item !== action.payload) }
    case 'SET_START_ADDRESS':
      return { ...state, startAddress: action.payload }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
export const useDispatchContext = () => useContext(DispatchContext)