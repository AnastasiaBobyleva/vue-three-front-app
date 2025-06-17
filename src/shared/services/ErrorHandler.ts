import { ElMessageBox } from "element-plus"
import { type Router } from 'vue-router'

export class HttpError extends Error {
  status: number;
  constructor(message: string, status: number = 800) {
    super(message)
    this.status = status;
  }
}

export function processLoadingError(router: Router, error: TypeError | HttpError) {
  let errorCause = ''; 
  if (error instanceof TypeError || error.status === 404) {
    if (error.message.search('Failed to fetch') !== -1) {
      errorCause = 'Oops! There are server connection problems. Please try a bit later.'
    }
  }
  else if (error.status === 500) {
      errorCause = 'The model inspection failed. Please try another model.'
  } else {
    errorCause = 'Cannot process model. ' + error
  } 

  return showMessage('Loading error', errorCause, router)
}

export function showMessage(messageTitle: string, message: string, router?: Router) {
  let cause = message ?? 'Unfortunately, some error has occured.'
  if (router) {
      cause += ' You\'ll be redirected to the main page.'
  }
  return ElMessageBox.alert(cause, messageTitle, { confirmButtonText: 'OK' })
  .then(() => {
    if (router) {
      router.push('/')
    }
  })
  .catch(error => error)
}
