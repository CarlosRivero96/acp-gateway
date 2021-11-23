import axios from 'axios';
import { createSlice, createAsyncThunk, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IMission, defaultValue } from 'app/shared/model/api/mission.model';
import thunk from 'redux-thunk';

const initialState = {
  loading: false,
  errorMessage: null,
  available: [],
  started: [],
  completed: [],
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
  activeTab: '1',
};

const apiUrl = 'services/api/api/missions';

// Actions

export const getAvailable = createAsyncThunk('missions/fetch_available_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}/available?cacheBuster=${new Date().getTime()}`;
  return axios.get<IMission[]>(requestUrl);
});

export const getStarted = createAsyncThunk('missions/fetch_started_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}/started?cacheBuster=${new Date().getTime()}`;
  return axios.get<IMission[]>(requestUrl);
});

export const getCompleted = createAsyncThunk('missions/fetch_completed_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}/completed?cacheBuster=${new Date().getTime()}`;
  return axios.get<IMission[]>(requestUrl);
});

export const getMission = createAsyncThunk(
  'missions/fetch_mission',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IMission>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const startMission = createAsyncThunk('missions/start_mission', async (mission: IMission, thunkAPI) => {
  const requestUrl = `${apiUrl}/start`;
  const result = axios.post<IMission>(requestUrl, cleanEntity(mission));
  thunkAPI.dispatch(getAvailable({}));
  return result;
});

export const completeMission = createAsyncThunk('missions/complete_mission', async (mission: IMission, thunkAPI) => {
  const requestUrl = `${apiUrl}/complete`;
  const result = axios.post<IMission>(requestUrl, cleanEntity(mission));
  thunkAPI.dispatch(getStarted({}));
  return result;
});

export const cancelMission = createAsyncThunk('missions/cancel_mission', async (mission: IMission, thunkAPI) => {
  const requestUrl = `${apiUrl}/cancel`;
  const result = axios.post<IMission>(requestUrl, cleanEntity(mission));
  thunkAPI.dispatch(getStarted({}));
  return result;
});

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
      .addCase(getMission.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      // .addCase(deleteEntity.fulfilled, state => {
      //   state.updating = false;
      //   state.updateSuccess = true;
      //   state.entity = {};
      // })
      .addMatcher(isFulfilled(getAvailable), (state, action) => {
        return {
          ...state,
          loading: false,
          available: action.payload.data,
        };
      })
      .addMatcher(isFulfilled(getStarted), (state, action) => {
        return {
          ...state,
          loading: false,
          started: action.payload.data,
        };
      })
      .addMatcher(isFulfilled(getCompleted), (state, action) => {
        return {
          ...state,
          loading: false,
          completed: action.payload.data,
        };
      })
      .addMatcher(isFulfilled(startMission, completeMission, cancelMission), state => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(getAvailable, getStarted, getCompleted, getMission), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(startMission, completeMission, cancelMission), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
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
