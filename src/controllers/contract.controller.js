import Contract from "../models/Contract.js";
import Property from "../models/Property.js";
import Customer from "../models/Customer.js";

export const createContract = async (req, res) => {
  const {
    propertyId,
    customerId,
    contractType,
    startDate,
    endDate,
    terms,
    price,
  } = req.body;

  try {
    // Verificar si la propiedad existe
    const property = await Property.findById(propertyId);
    if (!property) {
      return res
        .status(404)
        .json({ message: "La propiedad especificada no existe" });
    }

    // Verificar si el cliente existe
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ message: "El cliente especificado no existe" });
    }

    const existingContract = await Contract.findOne({
      property: propertyId,
      customer: customerId,
    });
    if (existingContract) {
      return res
        .status(400)
        .json({
          message: "Ya existe un contrato para esta propiedad y cliente",
        });
    }

    const newContract = new Contract({
      property: property._id,
      customer: customer._id,
      contractType,
      startDate,
      endDate,
      terms,
      price,
    });

    const contractSaved = await newContract.save();

    res.status(201).json(contractSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "No permitido" });
  }
};

export const getContractById = async (req, res) => {
  const { contractId } = req.params;

  const contract = await Contract.findById(contractId);
  res.status(200).json(contract);
};

export const getContracts = async (req, res) => {
  const contracts = await Contract.find();
  return res.json(contracts);
};

export const updateContractById = async (req, res) => {
  const updatedContract = await Contract.findByIdAndUpdate(
    req.params.contractId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedContract);
};

export const deleteContractById = async (req, res) => {
  const { contractId } = req.params;

  await Contract.findByIdAndDelete(contractId);

  // code 200 is ok too
  res.status(204).json();
};

export const getActiveContractsByCustomer = async (req, res) => {
  try {
      const activeContracts = await Contract.find({ endDate: { $gte: new Date() } })
          .populate('customer')
          .populate('property');
      const report = activeContracts.reduce((acc, contract) => {
          const { customer, property, startDate, endDate, contractType, terms, price } = contract;
          console.log(property);
          if (!acc[customer._id]) {
              acc[customer._id] = {
                  customer: {
                      name: customer.name,
                      lastname: customer.lastname,
                      email: customer.email,
                      phone: customer.phone
                  },
                  contracts: []
              };
          }
          acc[customer._id].contracts.push({
              property: property.address,
              contractType,
              startDate,
              endDate,
              terms,
              price
          });
          return acc;
      }, {});

      res.status(200).json(Object.values(report));
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al generar el reporte" });
  }
};

export const getAvailableProperties = async (req, res) => {
  try {
      // Obtener los contratos activos (aquellos que tienen una fecha de finalización en el futuro)
      const activeContracts = await Contract.find({ endDate: { $gte: new Date() } });

      // Extraer los IDs de las propiedades que tienen contratos activos
      const activePropertyIds = activeContracts.map(contract => contract.property);

      // Buscar las propiedades que no están en los contratos activos
      const availableProperties = await Property.find({ _id: { $nin: activePropertyIds } });

      // Preparar el reporte con la información de las propiedades disponibles
      const report = availableProperties.map(property => ({
          address: property.address,
          type: property.type,
          size: property.size,
          price: property.price
      }));

      res.status(200).json(report);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al generar el reporte" });
  }
};