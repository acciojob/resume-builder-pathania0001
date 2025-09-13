import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";

// ================= PROFILE =================
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    fname: "",
    lname: "",
    phone: "",
    address: "",
    url: "",
    image: "",
  },
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

// ================= EDUCATION =================
const educationSlice = createSlice({
  name: "education",
  initialState: [],
  reducers: {
    addEducation: (state, action) => {
      state.push(action.payload);
    },
    editEducation: (state, action) => {
      const { index, data } = action.payload;
      state[index] = data;
    },
    deleteEducation: (state, action) => {
      return state.filter((_, i) => i !== action.payload);
    },
  },
});

// ================= SKILLS =================
const skillsSlice = createSlice({
  name: "skills",
  initialState: [],
  reducers: {
    addSkill: (state, action) => {
      state.push(action.payload);
    },
    deleteSkill: (state, action) => {
      return state.filter((_, i) => i !== action.payload);
    },
  },
});

// ================= PROJECTS =================
const projectsSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    addProject: (state, action) => {
      state.push(action.payload);
    },
    editProject: (state, action) => {
      const { index, data } = action.payload;
      state[index] = data;
    },
    deleteProject: (state, action) => {
      return state.filter((_, i) => i !== action.payload);
    },
  },
});

// ================= SOCIAL =================
const socialSlice = createSlice({
  name: "social",
  initialState: [],
  reducers: {
    addSocial: (state, action) => {
      state.push(action.payload);
    },
    deleteSocial: (state, action) => {
      return state.filter((_, i) => i !== action.payload);
    },
  },
});

// ================= ROOT REDUCER =================
const rootReducer = combineReducers({
  profile: profileSlice.reducer,
  education: educationSlice.reducer,
  skills: skillsSlice.reducer,
  projects: projectsSlice.reducer,
  social: socialSlice.reducer,
});

// ================= STORE =================
export const store = configureStore({
  reducer: rootReducer,
});

// ================= ACTION EXPORTS =================
export const { updateProfile } = profileSlice.actions;
export const { addEducation, editEducation, deleteEducation } =
  educationSlice.actions;
export const { addSkill, deleteSkill } = skillsSlice.actions;
export const { addProject, editProject, deleteProject } = projectsSlice.actions;
export const { addSocial, deleteSocial } = socialSlice.actions;

export default store;
