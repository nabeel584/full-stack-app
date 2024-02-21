const express = require('express');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Get all products

const getAllProducts = async (req, res) => {
  const allProducts = await Product.find();
  res.send(allProducts);
};

// Post the product and if already exists update the quantitiy

const postProduct = async (req, res) => {
  const { name, brand, price, quantity, description } = req.body;
  const productQuantity = parseInt(req.body.quantity, 10) || 0;

  try {
    let existingProduct = await Product.findOne({ name: name });
    if (!name) {
      res
        .status(400)
        .send({ message: 'Requested data is not provided', success: false });
    } else {
      if (existingProduct) {
        existingProduct.quantity += productQuantity;
        await existingProduct.save();
        res.status(200).send({
          message: `${name} quantity is updated to ${existingProduct.quantity}`,
          success: true,
        });
      } else {
        const product = new Product({
          name,
          brand,
          price,
          quantity,
          description,
        });
        await product.save();
        res
          .status(200)
          .send({ message: 'Product added successfully', success: true });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message, success: false });
  }
};
// Delete Product

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({
        message: `'${id}' is invalid`,
        success: false,
      });
      res.end();
    } else {
      const productToDelete = await Product.findByIdAndDelete(id);
      if (productToDelete) {
        res
          .status(200)
          .send({ message: `Product Deleted Succefully`, success: true });
      } else {
        res.status(400).json({
          message: `Product with the id: '${id}' is not existed`,
          success: false,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

//Update Product

const updateProduct = async (req, res) => {
  const { name, brand, price, quantity, description } = req.body;
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({
        message: `'${id}' is invalid`,
        success: false,
      });
    }

    const productToUpdate = await Product.findOneAndUpdate(
      { _id: id },
      { $set: { name, brand, price, quantity, description } }
    );

    if (!productToUpdate) {
      res.status(404).send({
        message: `Product with name '${name}' not found`,
        success: false,
      });
    }

    res.status(200).send({
      message: 'Product updated successfully',
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
      success: false,
    });
  }
};

module.exports = { getAllProducts, postProduct, deleteProduct, updateProduct };
