import { combineReducers } from 'redux';
import combineActions from './actions';
import combineSelectors from './selectors';

const mapModules = (modules, fn) =>
  Object.keys(modules).reduce((obj, k) =>
    Object.assign(obj, {[k]: fn(modules[k])})
  , {});

const getReducerFromModule = (module) =>
  module.reducers
    ? combineReducers(module.reducers)
    : module.reducer;

export function combineModules(modules) {
  const reducer = combineReducers(
    mapModules(modules, getReducerFromModule)
  );
  const actions = combineActions(
    mapModules(modules, m => m.actions)
  );
  const selectors = combineSelectors(
    mapModules(modules, m => m.selectors)
  );

  return {
    reducer,
    actions,
    selectors,
    _modulesCombined: true
  };
}