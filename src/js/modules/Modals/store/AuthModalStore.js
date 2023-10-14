
import { create } from 'zustand'

const useAuthStore = create((set, get) => ({
    loading:false,
    action: 'login',
    setAction: (value) => set({action:value}),
    userExtId:'',
    setUserExtId:(value) => set({userExtId:value}),
    email:'',
    setEmail:(value) => set({email:value})
}))

export default useAuthStore;