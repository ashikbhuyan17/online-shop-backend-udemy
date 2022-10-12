const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");

// --------[ Comment Box]-------------
//<<<<<<<<< Create product >>>>>>>
// --------[Comment Box]--------------
exports.create = async (req, res) => {
    try {
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const newProduct = await new Product(req.body).save();
        console.log(newProduct, "-------> new product");
        res.status(200).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: error.message,
        });
    }
};
// --------[ Comment Box]-------------
//<<<<<<<<< List all by count >>>>>>>
// --------[Comment Box]--------------
exports.listAll = async (req, res) => {
    let products = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate("category")
        .populate("subs")
        .sort([["createdAt", "desc"]])
        .exec();
    res.json(products);
};

// --------[ Comment Box]-------------
//<<<<<<<<< Total products >>>>>>>
// --------[Comment Box]--------------
exports.totalProduct = async (req, res) => {
    const total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
};