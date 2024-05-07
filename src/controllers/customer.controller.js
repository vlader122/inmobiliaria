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
