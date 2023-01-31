import express from 'express'
import {
  getLoginPage,
  postLogin,
  getEnable2FAPage,
  postEnable2FA,
  getverify2FAPage,
  postVerify2FA,
} from '../controllers/AuthController.js'
const router = express.Router()
/**
 * Init all APIs on your application
 * @param {*} app from express framework
 */
const initAPIs = (app) => {
  // Gọi ra trang chủ home page
  // Trang login
  router.post('/login', postLogin)
  // Trang bật tính năng bảo mật 2 lớp. Tạo secret key hoặc qr để liên kết với app gg authenticator hoặc authy...
  router.post('/enable-2fa', postEnable2FA)
  // Trang yêu cầu xác thực 2 lớp. Nhập mã OTP từ app để verify
  router.post('/verify-2fa', postVerify2FA)
  return app.use('/', router)
}
export { initAPIs }
