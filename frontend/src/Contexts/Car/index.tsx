import { createContext, useEffect, useState } from "react";
import { ICars, iChildren } from "./interfaces";
import { api } from "../../services/api";

type CarContextProps = {
  cars: ICars[] | [];
  setCars: React.Dispatch<React.SetStateAction<ICars[] | []>>;
  filters: ICars[] | null;
  setFilters: React.Dispatch<React.SetStateAction<ICars[] | null>>;
  ApplyFilterCar: () => void;
  createCar: (data: ICars) => void;
  updateCar: (id: number | null, data: ICars) => void;
  listMyCars: (id: number | null) => void;
  listAllCars: () => void;
};

const CarContext = createContext<CarContextProps>({} as CarContextProps);

const CarProvider = ({ children }: iChildren) => {
  const [cars, setCars] = useState<ICars[] | []>([]);
  const [filters, setFilters] = useState<ICars[] | null>([]);

  useEffect(() => {
    const Cars = async () => {
      const token = localStorage.getItem("@TOKEN");
      const response = await api.get("/cars", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars(response.data);
    };
    Cars();
  }, []);

  const ApplyFilterCar = () => {
    let filteredCars = cars;

    filters?.map((filter) => {
      switch (true) {
        case Boolean(filter.brand):
          filteredCars = filteredCars.filter(
            (cars) => cars.brand === filter.brand
          );
          break;
        case Boolean(filter.model):
          filteredCars = filteredCars.filter(
            (cars) => cars.model === filter.model
          );
          break;
        case Boolean(filter.color):
          filteredCars = filteredCars.filter(
            (cars) => cars.color === filter.color
          );
          break;
        case Boolean(filter.year):
          filteredCars = filteredCars.filter(
            (cars) => cars.year === filter.year
          );
          break;
        case Boolean(filter.fuel_type):
          filteredCars = filteredCars.filter(
            (cars) => cars.fuel_type === filter.fuel_type
          );
          break;
        default:
          break;
      }
      return filteredCars;
    });
  };

  const createCar = async (data: ICars) => {
    const token = localStorage.getItem("@TOKEN");
    try {
      const response = await api.post(`/cars`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listAllCars = async () => {
    try {
      const response = await api.get("/cars");
      setCars(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listMyCars = async (id: number | null) => {
    const token = localStorage.getItem("@TOKEN");
    try {
      const response = await api.get(`/cars/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCar = async (id: number | null, data: ICars) => {
    const token = localStorage.getItem("@TOKEN");
    try {
      const response = await api.patch(`/cars/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newAd = cars.map((car) => {
        if (car.id === id) {
          return response.data;
        } else {
          return car;
        }
      });
      setCars(newAd);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CarContext.Provider
      value={{
        cars,
        setCars,
        filters,
        setFilters,
        ApplyFilterCar,
        createCar,
        updateCar,
        listMyCars,
        listAllCars,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarProvider;
export { CarContext, CarProvider };
