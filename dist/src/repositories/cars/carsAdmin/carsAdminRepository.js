"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const carsModel_1 = require("../../../db/models/carsModel");
class CarRepository {
    mapToCarDTO(car) {
        return {
            id: car.id,
            name: car.name,
            category: car.category,
            price: car.price,
            image: car.image,
            onPublish: car.onPublish,
            startRent: car.startRent,
            finishRent: car.finishRent,
            createdBy: car.createdBy,
            updatedBy: car.updatedBy,
            deletedBy: car.deletedBy,
            createdAt: car.createdAt,
            updatedAt: car.updatedAt,
        };
    }
    getAllCars(category, name, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = carsModel_1.CarsModel.query().orderBy('createdAt', 'desc');
            if (category) {
                const categoryLowerCase = category.toLowerCase();
                query.whereRaw('LOWER(category) = ?', [categoryLowerCase]);
            }
            if (name) {
                const nameLowerCase = name.toLowerCase();
                query.whereRaw('LOWER(name) LIKE ?', [`%${nameLowerCase}%`]);
            }
            if (pageSize && pageSize !== -1) {
                const offset = (page ? page - 1 : 0) * pageSize;
                query.offset(offset).limit(pageSize);
            }
            const cars = yield query;
            return cars.map(this.mapToCarDTO);
        });
    }
    getCarById(carId) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield carsModel_1.CarsModel.query().findById(carId);
            return car ? this.mapToCarDTO(car) : undefined;
        });
    }
    createCar(carData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCar = yield carsModel_1.CarsModel.query().insert(carData);
            return this.mapToCarDTO(newCar);
        });
    }
    updateCar(carId, carData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCar = yield carsModel_1.CarsModel.query().patchAndFetchById(carId, carData);
            return this.mapToCarDTO(updatedCar);
        });
    }
    deleteCarById(carId) {
        return __awaiter(this, void 0, void 0, function* () {
            return carsModel_1.CarsModel.query().deleteById(carId);
        });
    }
    getTotalCount(category, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = carsModel_1.CarsModel.query();
            if (category) {
                const categoryLowerCase = category.toLowerCase();
                query.whereRaw('LOWER(category) = ?', [categoryLowerCase]);
            }
            if (name) {
                const nameLowerCase = name.toLowerCase();
                query.whereRaw('LOWER(name) LIKE ?', [`%${nameLowerCase}%`]);
            }
            return query.resultSize();
        });
    }
}
exports.default = new CarRepository();
