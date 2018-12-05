import {Resume} from "../../model/Resume";


export const FETCH_RESUMES = '[Resume] Fetch resumes';
export const FETCH_RESUMES_SUCCESS = '[Resume] Fetch resumes success';
export const FETCH_RESUMES_FAILED = '[Resumes] Fetch resumes failed';
export const UPDATE_RESUME = '[Resume] Update resume';
export const UPDATE_RESUME_SUCCESS = '[Resume] Update resume success';
export const CREATE_RESUME = '[Resumes] Create resume';
export const CREATE_RESUME_SUCCESS = '[Resumes] Create resume success';
export const DELETE_RESUME = '[Resume State] Delete resume';
export const DELETE_RESUME_SUCCESS = '[Resume State] Delete resume success';

export function fetchResumesAction() {
  return {
    type: FETCH_RESUMES
  };
}

export function fetchResumesSuccessAction(resumes: Map<string, Resume>) {
  return {
    type: FETCH_RESUMES_SUCCESS,
    payload: {resumes}
  };
}

export function fetchResumesFailedAction(errorMessage: string) {
  return {
    type: FETCH_RESUMES_FAILED,
    payload: {errorMessage}
  };
}

export function updateResumeAction(resume: Resume) {
  return {
    type: UPDATE_RESUME,
    payload: {resume}
  };
}

export function updateResumeSuccessAction(resume: Resume) {
  return {
    type: UPDATE_RESUME_SUCCESS,
    payload: {resume}
  };
}

export function createResumeAction(resume: Resume) {
  return {
    type: CREATE_RESUME,
    payload: {resume}
  };
}

export function createResumeSuccessAction(resume: Resume) {
  return {
    type: CREATE_RESUME_SUCCESS,
    payload: {resume}
  };
}

export function deleteResumeAction(resumeId: string) {
  return {
    type: DELETE_RESUME,
    payload: {resumeId}
  };
}

export function deleteResumeSuccessAction(resumeId: string) {
  return {
    type: DELETE_RESUME_SUCCESS,
    payload: {resumeId}
  };
}

