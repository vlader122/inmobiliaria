import Property from "../models/Property.js";

export const createProperty = async (req, res) => {
  const {
    propertyType,
    address,
    city,
    country,
    totalArea,
    bedrooms,
    bathrooms,
    description,
    price,
    status,
    yearBuilt,
    transactionType,
    additionalComments,
  } = req.body;
  try {
    const newProperty = new Property({
      propertyType,
      address,
      city,
      country,
      totalArea,
      bedrooms,
      bathrooms,
      description,
      price,
      status,
      yearBuilt,
      transactionType,
      additionalComments,
    });

    const propertySaved = await newProperty.save();

    res.status(201).json(propertySaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getPropertiesByPrice = async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  try {
      const properties = await Property.find({ 
          price: { $gte: minPrice, $lte: maxPrice } 
      });

      res.status(200).json(properties);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const getPropertyCountByCity = async (req, res) => {
  try {
      const propertyCountByCity = await Property.aggregate([
          {
              $group: {
                  _id: "$city",
                  count: { $sum: 1 }
              }
          }
      ]);

      res.status(200).json(propertyCountByCity);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const getRecentProperties = async (req, res) => {
  try {
      const currentDate = new Date();

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const recentProperties = await Property.find({
          createdAt: { $gte: oneWeekAgo, $lte: currentDate }
      });

      res.status(200).json(recentProperties);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  const { propertyId } = req.params;

  const property = await Property.findById(propertyId);
  res.status(200).json(property);
};

export const getPropertys = async (req, res) => {
  const propertys = await Property.find();
  return res.json(propertys);
};

export const updatePropertyById = async (req, res) => {
  const updatedProperty = await Property.findByIdAndUpdate(
    req.params.propertyId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedProperty);
};

export const deletePropertyById = async (req, res) => {
  const { propertyId } = req.params;

  await Property.findByIdAndDelete(propertyId);
  res.status(204).json();
};
