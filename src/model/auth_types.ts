import { Persistor } from 'redux-persist/es/types';
export interface Auth {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: Record<string, any>;
  dicomPreview: {
    image: { file: File; preview: string; hide: boolean };
    tags: {};
    download_id: string;
  };
  pdfPreview: {
    pdf: string;
    hide: boolean;
    download_id: string;
  };
  batchPreview: {
    batch: {};
    hide: boolean;
  };
  batchProcess: { zipfile: [] };
  reviewTags: {
    currentRecord: number;
    totalRecord: number;
    review_tags: { plane: string; pathology: string; record_status: string; request_report: string };
  };
  token: any;
  alert: { message: string; status: boolean };
}
// eslint-disable-next-line @typescript-eslint/class-name-casing
export interface storeState {
  auth: any;
  persistor: Persistor;
}
export enum AuthActions {
  USER_LOADING = 'USER_LOADING',
  USER_LOADED = 'USER_LOADED',
  AUTH_ERROR = 'AUTH_ERROR',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  SET_USERNAME = 'SET_USERNAME',
  ALERT = 'ALERT',
  HIDE_ALERT = 'HIDE_ALERT',
  GET_USER = 'GET_USER',
  DEFAULT = 'DEFAULT',
  DICOM_PREVIEW_LOADED = 'DICOM_PREVIEW_LOADED',
  PDF_PREVIEW_LOADED = 'PDF_PREVIEW_LOADED',
  BATCH_PREVIEW_LOADED = 'BATCH_PREVIEW_LOADED',
  BATCH_PROCESS_LOADED = 'BATCH_PROCESS_LOADED',
  REVIEW_TAGS_LOADED = 'REVIEW_TAGS_LOADED',
}
export const CURRENT_DATE = new Date();
interface AuthActionType<T, P> {
  type: T;
  payload?: P;
}
export type AuthAction =
  | AuthActionType<typeof AuthActions.USER_LOADING, Auth>
  | AuthActionType<typeof AuthActions.USER_LOADED, undefined>
  | AuthActionType<typeof AuthActions.AUTH_ERROR, number>
  | AuthActionType<typeof AuthActions.LOGIN_SUCCESS, string>
  | AuthActionType<typeof AuthActions.LOGIN_FAIL, number>
  | AuthActionType<typeof AuthActions.LOGOUT_SUCCESS, undefined>
  | AuthActionType<typeof AuthActions.SET_USERNAME, string>
  | AuthActionType<typeof AuthActions.ALERT, string>
  | AuthActionType<typeof AuthActions.HIDE_ALERT, undefined>
  | AuthActionType<typeof AuthActions.GET_USER, any>
  | AuthActionType<typeof AuthActions.DEFAULT, undefined>
  | AuthActionType<typeof AuthActions.DICOM_PREVIEW_LOADED, any>
  | AuthActionType<typeof AuthActions.PDF_PREVIEW_LOADED, any>
  | AuthActionType<typeof AuthActions.BATCH_PREVIEW_LOADED, any>
  | AuthActionType<typeof AuthActions.BATCH_PROCESS_LOADED, any>
  | AuthActionType<typeof AuthActions.REVIEW_TAGS_LOADED, any>;
