var express = require("express");
var router = express.Router();
var Order = require("../models/order");
var Cart = require("../models/cart");
var auth = require("../middleware/auth");
var Product = require("../models/product");

//save or Update or delete product or quantity from cart
//this api will be called when
//a product is added to cart
//a product qunatity is increased or decrease
//a product is removed from cart
router.post("/", auth, async (req, res) => {
  if (req.user.isAdmin) {
    //admin is not allowed to shop
    res.status(403).json({ message: "Access Denied" });
  } else {
    //get product Id
    const { productId } = req.body;
    //get the quantity as number
    const quantity = Number.parseInt(req.body.quantity);

    try {
      //get the cart of the user which is not ordered yet
      let cart = await Cart.findOne({
        email: req.user.email,
        isOrdered: false,
      });
      //check if the product exists
      let productDetails = await Product.findById(productId);
      //if product not found return
      if (!productDetails) {
        return res.status(404).json({
          type: "Not Found",
          msg: "Product Not Found",
        });
      }
      //--If Cart Exists ----
      if (cart) {
        //---- check if index exists for product id ----

        const indexFound = cart.items.findIndex(
          (item) => item.productId == productId
        );

        //------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
        if (indexFound !== -1 && quantity === 0) {
          cart.items.splice(indexFound, 1);
        }
        //----------check if product exist,just add the previous quantity with the new quantity
        else if (indexFound !== -1) {
          cart.items[indexFound].quantity =
            cart.items[indexFound].quantity + quantity;
        }
        //----Check if Quantity is Greater than 0 then add item to items Array ----
        else if (quantity > 0) {
          cart.items.push({
            productId: productId,
            quantity: quantity,
          });
        }
        //----if quantity of price is 0 throw the error -------
        else {
          return res.status(400).json({
            type: "Failed",
            msg: "Product Quantity cannot be zero",
          });
        }
        //save cart
        let data = await cart.save();
        res.status(200).json({
          type: "success",
          mgs: "cart updated Successful",
          data: data,
        });
      }
      //------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
      else {
        const cartData = new Cart({
          items: [
            {
              productId: productId,
              quantity: quantity,
            },
          ],
          email: req.user.email,
        });
        cart = await cartData.save();
        res.status(201).json({
          type: "success",
          mgs: "Cart created successfully",
          data: cartData,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        type: "Failed",
        msg: "Something Went Wrong",
        err: err,
      });
    }
  }
});

router.get("/", auth, async (req, res, next) => {
  if (req.user.isAdmin) {
    //admin is not allowed to shop
    res.status(403).json({ message: "Access Denied" });
  } else {
    var cart = await Cart.findOne({
      email: req.user.email,
      isOrdered: false,
    }).populate({
      path: "items.productId",
    });

    if (cart.length != 0) {
      res.status(200).json({
        status: "success",
        cart,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No Carts Found",
      });
    }
  }
});

router.delete("/", auth, async (req, res) => {
  if (req.user.isAdmin) {
    //admin is not allowed to shop
    res.status(403).json({ message: "Access Denied" });
  } else {
    Cart.findOneAndRemove(
      { email: req.user.email, isOrdered: false },
      (err, result) => {
        if (err) throw err;
        return res.status(200).json({
          status: "success",
          message: "Cart deleted successfully",
        });
      }
    );
  }
});

module.exports = router;
