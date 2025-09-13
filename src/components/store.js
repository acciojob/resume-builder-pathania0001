// src/store.js
import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";

const initialProfile = {
  fname: "",
  lname: "",
  phone: "",
  address: "",
  url: "",
  image: ""
};

// Profile slice
const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfile,
  reducers: {
    updateProfile(state, action) {
      return { ...state, ...action.payload };
    },
    resetProfile() {
      return initialProfile;
    }
  }
});

// Education slice (array of {id, courseName, completionYear, college, percentage})
const educationSlice = createSlice({
  name: "education",
  initialState: [],
  reducers: {
    addEducation(state, action) {
      state.push({ id: Date.now() + Math.random(), ...action.payload });
    },
    editEducation(state, action) {
      const idx = state.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    deleteEducation(state, action) {
      return state.filter((e) => e.id !== action.payload);
    },
    resetEducation() {
      return [];
    }
  }
});

// Skills slice (array of {id, skill})
const skillsSlice = createSlice({
  name: "skills",
  initialState: [],
  reducers: {
    addSkill(state, action) {
      state.push({ id: Date.now() + Math.random(), skill: action.payload });
    },
    editSkill(state, action) {
      const idx = state.findIndex((s) => s.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    deleteSkill(state, action) {
      return state.filter((s) => s.id !== action.payload);
    },
    resetSkills() {
      return [];
    }
  }
});

// Projects slice (array of {id, projectName, techStack, description})
const projectsSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    addProject(state, action) {
      state.push({ id: Date.now() + Math.random(), ...action.payload });
    },
    editProject(state, action) {
      const idx = state.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    deleteProject(state, action) {
      return state.filter((p) => p.id !== action.payload);
    },
    resetProjects() {
      return [];
    }
  }
});

// Social slice (array of {id, url})
const socialSlice = createSlice({
  name: "social",
  initialState: [],
  reducers: {
    addSocial(state, action) {
      state.push({ id: Date.now() + Math.random(), url: action.payload });
    },
    deleteSocial(state, action) {
      return state.filter((s) => s.id !== action.payload);
    },
    resetSocial() {
      return [];
    }
  }
});

// combine
const rootReducer = combineReducers({
  profile: profileSlice.reducer,
  education: educationSlice.reducer,
  skills: skillsSlice.reducer,
  projects: projectsSlice.reducer,
  social: socialSlice.reducer
});

// store
const store = configureStore({
  reducer: rootReducer
});

// persistence helpers
store.saveToLocal = function () {
  try {
    const state = store.getState();
    localStorage.setItem("resume_builder_v1", JSON.stringify(state));
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
};

store.loadFromLocal = function () {
  try {
    const raw = localStorage.getItem("resume_builder_v1");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // dispatch patch actions to load
    if (parsed.profile) store.dispatch(profileSlice.actions.updateProfile(parsed.profile));
    if (Array.isArray(parsed.education)) {
      // reset then add
      store.dispatch(educationSlice.actions.resetEducation());
      parsed.education.forEach((e) => store.dispatch(educationSlice.actions.addEducation(e)));
    }
    if (Array.isArray(parsed.skills)) {
      store.dispatch(skillsSlice.actions.resetSkills());
      parsed.skills.forEach((s) => store.dispatch(skillsSlice.actions.addSkill(s.skill || s)));
    }
    if (Array.isArray(parsed.projects)) {
      store.dispatch(projectsSlice.actions.resetProjects());
      parsed.projects.forEach((p) => store.dispatch(projectsSlice.actions.addProject(p)));
    }
    if (Array.isArray(parsed.social)) {
      store.dispatch(socialSlice.actions.resetSocial());
      parsed.social.forEach((s) => store.dispatch(socialSlice.actions.addSocial(s.url || s)));
    }
    return parsed;
  } catch (e) {
    console.warn("Could not load from localStorage", e);
    return null;
  }
};

export const {
  updateProfile,
  resetProfile
} = profileSlice.actions;

export const {
  addEducation,
  editEducation,
  deleteEducation
} = educationSlice.actions;

export const {
  addSkill,
  editSkill,
  deleteSkill
} = skillsSlice.actions;

export const {
  addProject,
  editProject,
  deleteProject
} = projectsSlice.actions;

export const {
  addSocial,
  deleteSocial
} = socialSlice.actions;

export default store;
