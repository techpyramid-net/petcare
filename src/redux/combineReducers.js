import {combineReducers} from 'redux';
import {UserAuthReducer} from './reducers/User/Auth';
import {StoreAuthReducer} from './reducers/Store/StoreAuth';
import {CustomReducer} from './reducers/Custom/customStore';
import {AdminAuthReducer} from './reducers/Admin/AdminAuth';

const rootReducer = combineReducers({
  UserAuthReducer,
  StoreAuthReducer,
  CustomReducer,
  AdminAuthReducer,
});

export default rootReducer;
