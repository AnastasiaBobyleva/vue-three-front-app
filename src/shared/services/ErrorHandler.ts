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
  return showMessage('Loading error', '', router)
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
