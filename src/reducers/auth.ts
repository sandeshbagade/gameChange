/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthAction, AuthActions, Auth } from '../model';
import createReducer from './createReducer';

const arrayOfBlob = new Array<Blob>();
const file = new File(arrayOfBlob, 'Mock.png', { type: 'image/png' });
function updateObjectInArray(array: any, action: any) {
  return array.map((item: any, index: any) => {
    if (index !== action.payload.index) {
      // This isn't the item we care about - keep it as-is
      return item;
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...{ filename: action.payload.filename, status: action.payload.status },
    };
  });
}
function insertItem(array: any, action: any) {
  const newArray = array.slice();
  newArray.push({ filename: action.payload.filename, status: action.payload.status });
  return newArray;
}

export const initialState: Auth = {
  isAuthenticated: false,
  isLoading: true,
  user: {},
  dicomPreview: {
    image: { file: file, preview: '', hide: true },
    tags: {},
    // eslint-disable-next-line @typescript-eslint/camelcase
    download_id: '',
  },
  pdfPreview: {
    pdf: '',
    hide: true,
    // eslint-disable-next-line @typescript-eslint/camelcase
    download_id: '',
  },
  batchPreview: {
    batch: {},
    hide: false,
  },
  batchProcess: { zipfile: [] },
  reviewTags: {
    currentRecord: 1,
    totalRecord: 1,
    // eslint-disable-next-line @typescript-eslint/camelcase
    review_tags: { plane: 'Transventricular_1', pathology: 'Abnormal', record_status: 'Pending', request_report: 'No' },
  },
  token: localStorage.getItem('token'),
  alert: { message: '', status: false },
};
export const auth = createReducer<Auth>(initialState, {
  [AuthActions.LOGIN_SUCCESS](state: Auth = initialState, action: AuthAction) {
    localStorage.setItem('token', action.payload.token ? action.payload.token.toString() : '');
    return {
      ...state,
      isAuthenticated: true,
      token: action.payload.token,
      // eslint-disable-next-line @typescript-eslint/camelcase
      user: { user_id: action.payload.user_id },
      isLoading: false,
    };
  },
  [AuthActions.LOGIN_FAIL](state: Auth = initialState, action: AuthAction) {
    localStorage.removeItem('token');
    return { ...state, isAuthenticated: false };
  },
  [AuthActions.USER_LOADED](state: Auth = initialState, action: AuthAction) {
    return { ...state, isLoading: false };
  },
  [AuthActions.USER_LOADING](state: Auth = initialState, action: AuthAction) {
    return { ...state, isLoading: true };
  },
  [AuthActions.LOGOUT_SUCCESS](state: Auth = initialState, action: AuthAction) {
    localStorage.removeItem('token');
    return initialState;
  },
  [AuthActions.SET_USERNAME](state: Auth = initialState, action: AuthAction) {
    return { ...state, user: { username: action.payload } };
  },
  [AuthActions.ALERT](state: Auth = initialState, action: AuthAction) {
    return { ...state, alert: action.payload };
  },
  [AuthActions.HIDE_ALERT](state: Auth = initialState, action: AuthAction) {
    return { ...state, alert: { message: '', status: false } };
  },
  [AuthActions.GET_USER](state: Auth = initialState, action: AuthAction) {
    return { ...state, user: action.payload };
  },
  [AuthActions.DEFAULT](state: Auth = initialState, action: AuthAction) {
    return state;
  },
  [AuthActions.DICOM_PREVIEW_LOADED](state: Auth = initialState, action: AuthAction) {
    return { ...state, dicomPreview: action.payload };
  },
  [AuthActions.PDF_PREVIEW_LOADED](state: Auth = initialState, action: AuthAction) {
    return { ...state, pdfPreview: action.payload };
  },
  [AuthActions.BATCH_PREVIEW_LOADED](state: Auth = initialState, action: AuthAction) {
    return { ...state, batchPreview: { batch: action.payload.batch, hide: action.payload.hide } };
  },
  [AuthActions.BATCH_PROCESS_LOADED](state: Auth = initialState, action: AuthAction) {
    if (action.payload.index === state.batchProcess.zipfile.length) {
      return {
        ...state,
        batchProcess: {
          ...state.batchProcess,
          zipfile: insertItem(state.batchProcess.zipfile, action),
        },
      };
    } else
      return {
        ...state,
        batchProcess: {
          ...state.batchProcess,
          zipfile: updateObjectInArray(state.batchProcess.zipfile, action),
        },
      };
  },
  [AuthActions.REVIEW_TAGS_LOADED](state: Auth = initialState, action: AuthAction) {
    return { ...state, reviewTags: action.payload };
  },
});
