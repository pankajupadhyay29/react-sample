import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { default as studentSvc } from '../Services/StudentSvc';
import { epic } from './epic';
import { reducer } from './reducer';

const epicMiddleware = createEpicMiddleware(epic, {
  dependencies: {
    studentSvc
  }
});

export const store = createStore(reducer, applyMiddleware(epicMiddleware));
