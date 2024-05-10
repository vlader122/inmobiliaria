import Customer from "../models/Customer.js";

export const createCustomer = async (req, res) => {
    const { ci, name, lastname, gender, birth, address, phone } = req.body;

    try {
        const newCustomer = new Customer({
            ci,
            name,
            lastname,
            gender,
            birth,
            address,
            phone
        });

        const customerSaved = await newCustomer.save();

        res.status(201).json(customerSaved);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const getCustomerById = async (req, res) => {
    const { customerId } = req.params;

    const customer = await Customer.findById(customerId);
    res.status(200).json(customer);
};

export const getCustomerByName = async (req, res) => {
    const { name } = req.query;
    try {
        const customers = await Customer.find({ name: { $regex: name, $options: 'i' } });

        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: "error" });
    }
};

export const getContactInfo = async (req, res) => {
    const { name } = req.query;
    let filter = {};

    // Verificar si se proporcionó el parámetro de consulta "name"
    if (name) {
        // Construir un filtro que busque en los campos de nombre y apellido
        filter = {
            $or: [
                { name: { $regex: name, $options: 'i' } },
                { lastname: { $regex: name, $options: 'i' } }
            ]
        };
    }

    try {
        // Obtener la lista de contactos filtrada (si se proporcionó el parámetro de consulta "name")
        const customers = name ? await Customer.find(filter, 'name lastname phone address') : await Customer.find({}, 'name lastname phone address');

        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCustomers = async (req, res) => {
    const customers = await Customer.find();
    return res.json(customers);
};

export const updateCustomerById = async (req, res) => {
    const updatedCustomer = await Customer.findByIdAndUpdate(
        req.params.customerId,
        req.body,
        {
            new: true,
        }
    );
    res.status(204).json(updatedCustomer);
};

export const deleteCustomerById = async (req, res) => {
    const { customerId } = req.params;

    await Customer.findByIdAndDelete(customerId);

    // code 200 is ok too
    res.status(204).json();
};
