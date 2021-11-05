import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IUserData, defaultValue } from 'app/shared/model/api/user-data.model';

const initialState: EntityState<IUserData> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

const apiUrl = 'services/api/api/user-data';

// Actions

export const getEntity = createAsyncThunk(
  'userData/fetch_entity',
  async (login: string) => {
    const requestUrl = `${apiUrl}/${login}`;
    return axios.get<IUserData>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'userData/update_entity',
  async (entity: IUserData, thunkAPI) => {
    const result = await axios.put<IUserData>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'userData/partial_update_entity',
  async (entity: IUserData, thunkAPI) => {
    const result = await axios.patch<IUserData>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const UserDataSlice = createEntitySlice({
  name: 'userData',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addMatcher(isFulfilled(updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(updateEntity, partialUpdateEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = UserDataSlice.actions;

// Reducer
export default UserDataSlice.reducer;
