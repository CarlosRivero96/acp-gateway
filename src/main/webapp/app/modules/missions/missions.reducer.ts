import axios from 'axios';
import { createSlice, createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IMission, defaultValue } from 'app/shared/model/api/mission.model';

const initialState = {
  loading: false,
  errorMessage: null,
  avilable: [],
  started: [],
  completed: [],
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

const apiUrl = 'services/api/api/missions';

// Actions

export const getAvailable = createAsyncThunk('mission/fetch_entity_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}/available?cacheBuster=${new Date().getTime()}`;
  return axios.get<IMission[]>(requestUrl);
});

export const getStarted = createAsyncThunk('mission/fetch_entity_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}/started?cacheBuster=${new Date().getTime()}`;
  return axios.get<IMission[]>(requestUrl);
});

export const getCompleted = createAsyncThunk('mission/fetch_entity_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}/completed?cacheBuster=${new Date().getTime()}`;
  return axios.get<IMission[]>(requestUrl);
});

export const getMission = createAsyncThunk(
  'mission/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IMission>(requestUrl);
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
          avilable: action.payload.data,
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
      .addMatcher(isPending(getAvailable, getStarted, getCompleted, getMission), state => {
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

export const { reset } = MissionsSlice.actions;

// Reducer
export default MissionsSlice.reducer;
