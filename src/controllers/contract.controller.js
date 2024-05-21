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
