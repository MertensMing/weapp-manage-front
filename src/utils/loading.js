import { put } from 'redux-saga/effects';
import { types as loadingTypes } from '@/store/actions/loading';

export function showLoading(type) {
  return put({ type: loadingTypes.showLoading, payload: { type } })
}

export function hideLoading(type) {
  return put({ type: loadingTypes.hideLoading, payload: { type } })
}
