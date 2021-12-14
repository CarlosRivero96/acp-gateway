import axios from 'axios';
import { createSlice, createAsyncThunk, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IUserData, defaultValue as userDataDefault } from 'app/shared/model/api/user-data.model';
import { IUserSkill, defaultValue as userSkillDefault } from 'app/shared/model/api/user-skill.model';
import { ISeniority } from 'app/shared/model/api/seniority.model';
import thunk from 'redux-thunk';

const initialState = {
  loading: false,
  errorMessage: null,
  usersList: [],
  userData: userDataDefault,
  userSkillsList: [],
  userSenioritiesList: [],
  updating: false,
  updateSuccess: false,
};

const apiUrl = 'services/api/api';

// Actions

export const getUsers = createAsyncThunk('seniority-management/fetch_users_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}/user-data?cacheBuster=${new Date().getTime()}`;
  return axios.get<IUserData[]>(requestUrl);
});

export const getUserData = createAsyncThunk(
  'seniority-management/fetch_user',
  async (login: string) => {
    const requestUrl = `${apiUrl}/user-data/${login}`;
    return axios.get<IUserData>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getUserSeniorities = createAsyncThunk(
  'seniority-management/fetch_seniorities',
  async (login: string) => {
    const requestUrl = `${apiUrl}/seniorities/user/${login}`;
    return axios.get<ISeniority[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getUserSkills = createAsyncThunk(
  'seniority-management/fetch_skills',
  async (login: string) => {
    const requestUrl = `${apiUrl}/user-skills/user/${login}`;
    return axios.get<ISeniority[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const updateUserData = createAsyncThunk(
  'seniority-management/update_user',
  async (entity: IUserData, thunkAPI) => {
    const result = await axios.put<IUserData>(`${apiUrl}/user-data/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getUsers({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const MissionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    toggle(state, action: PayloadAction<string>) {
      return {
        ...state,
        activeTab: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.data;
      })
      .addMatcher(isFulfilled(getUsers), (state, action) => {
        return {
          ...state,
          loading: false,
          usersList: action.payload.data,
        };
      })
      .addMatcher(isFulfilled(getUserSeniorities), (state, action) => {
        return {
          ...state,
          loading: false,
          userSenioritiesList: action.payload.data,
        };
      })
      .addMatcher(isFulfilled(getUserSkills), (state, action) => {
        return {
          ...state,
          loading: false,
          userSkillsList: action.payload.data,
        };
      })
      .addMatcher(isFulfilled(updateUserData), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.userData = action.payload.data;
      })
      .addMatcher(isPending(getUsers, getUserData, getUserSeniorities, getUserSkills), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isRejected(), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset, toggle } = MissionsSlice.actions;

// Reducer
export default MissionsSlice.reducer;
