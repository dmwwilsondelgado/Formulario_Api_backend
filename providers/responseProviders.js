export class ResponseProvider {
  /**
   * 
   * @param {*} res 
   * @param {*} data 
   * @param {*} message 
   * @param {*} status 
   * @returns 
   */

  static sucess(res, data, message = "OPERACION EXITOSA", status = 200) {
    return res.status(status).json({
      sucess: true,
      code: status,
      message,
      data,
    });
  }

  /**
   * 
   * @param {*} res 
   * @param {*} message 
   * @param {*} status 
   * @returns 
   */
  static error(res, message = "ERROR INTERNO DEL SERVIDOR", status = 500, errors = []) {
    return res.status(status).json({
      success: false,
      code: status,
      message,
      errors: errors
    });
  }
}

// import ResponseProvider from "./ResponseProviders.js"
