import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isSidebarOn:false
}

const sidebarSlice = createSlice({ //bring action and reducer into one function
    name: 'sidebar',    //the name that will be used to generate action types 
    initialState,
    reducers: {    //action name : reducer function
        setSidebarOn: (state) => {   //we will dispatch these actions to make changes to the state 
            state.isSidebarOn = true;
        },

        setSidebarOff: (state) => {
            state.isSidebarOn = false;
        }

    },
});

export const {setSidebarOn,setSidebarOff} = sidebarSlice.actions;

export const getSidebarStatus = (state) => state.sidebar.isSidebarOn;

export default sidebarSlice.reducer;