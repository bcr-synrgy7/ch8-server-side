import { Request, Response } from 'express'
import carService from '../../services/cars/carsAdmin/carsAdminServices'
import {
  wrapResponse,
  wrapErrorResponse,
  handleNotFoundError,
  handleBadRequestError,
  handleInternalServerError
} from '../../utils/responseHandler'

class CarsAdminController {
  async getAllCars(req: Request, res: Response): Promise<void> {
    try {
      const category = req.query.category as string | undefined
      const name = req.query.name as string | undefined
      const page = parseInt(req.query.page as string) || 1
      let pageSize = parseInt(req.query.pageSize as string) || -1

      // Explicit check for NaN and zero values
      if (isNaN(pageSize) || pageSize <= 0) {
        pageSize = -1
      }

      await carService.getAllCars(res, category, name, page, pageSize)
    } catch (error) {
      console.error('Error getting cars:', error)
      handleInternalServerError(res, 'Internal Server Error')
    }
  }

  async getCarById(req: Request, res: Response): Promise<void> {
    const carId = req.params.id
    carService.getCarById(res, carId)
  }

  async createCar(req: Request, res: Response): Promise<void> {
    try {
      const newCar = await carService.createCar(req)
      if (newCar != null) {
        wrapResponse(res, 201, 'Data Berhasil Disimpan', newCar)
      } else {
        wrapErrorResponse(res, 400, 'Failed to create car')
      }
    } catch (error: any) {
      console.error(error)

      // Explicit type check for error.message
      if (
        typeof error.message === 'string' &&
        (error.message.includes('Missing required fields') ||
          error.message.includes('Price must be a positive number') ||
          error.message.includes('No image file uploaded') ||
          error.message.includes('Only image files') ||
          error.message.includes('Failed to get username from token'))
      ) {
        wrapErrorResponse(res, 400, 'Invalid Input: ' + String(error.message))
      } else {
        wrapErrorResponse(res, 500, 'Internal Server Error')
      }
    }
  }

  async updateCar(req: Request, res: Response): Promise<void> {
    try {
      const updatedCar = await carService.updateCar(req)
      if (updatedCar != null) {
        wrapResponse(res, 200, 'Car updated successfully', updatedCar)
      } else {
        handleNotFoundError(res, 'Car with the specified ID not found')
      }
    } catch (error: any) {
      console.error(error)

      // Explicit type check for error.message
      if (
        typeof error.message === 'string' &&
        (error.message === 'Price must be a positive number' || error.message === 'Failed to get username from token')
      ) {
        handleBadRequestError(res, error.message)
      } else {
        handleInternalServerError(res, 'Internal Server Error')
      }
    }
  }

  async deleteCar(req: Request, res: Response): Promise<void> {
    const carId = req.params.id
    // Await the promise and handle errors
    try {
      await carService.deleteCarById(req, res, carId)
    } catch (error) {
      console.error('Error deleting car:', error)
      handleInternalServerError(res, 'Internal Server Error')
    }
  }
}

export default new CarsAdminController()
