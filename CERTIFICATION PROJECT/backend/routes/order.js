var express = require("express");
var router = express.Router();
var Order = require("../models/order");
var User = require("../models/user");
var Cart = require("../models/cart");
var auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
//checkout
router.post("/", async (req, res, next) => {
  const token = req.header("token");
  console.log(req.header("token"));
  if (token) {
    try {
      var user;
      try {
        const decoded = jwt.verify(token, "randomString");
        user = decoded.user;
      } catch (e) {
        console.error(e);
        res.status(400).send({ message: "Invalid Token" });
      }
      //logged in user

      //get logged in user active cart
      const cartData = await Cart.findOne({
        email: user.email,
        isOrdered: false,
      });

      var orderObj = new Order({
        email: user.email,
        orderNumber: Date.now() + Math.random(),
        cartId: cartData,
      });
      await orderObj.save();

      //mark cart as ordered cart once order saved
      await Cart.findOneAndUpdate(
        { email: user.email, isOrdered: false },
        { isOrdered: true }
      );

      res.status(200).json({
        status: "success",
        message: "Order placed successfully",
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Error Occured when placing Order. Please try again",
      });
    }
  } else {
    //guest user
    //create an ordered cart
    let cartData = new Cart({
      items: req.body.cart,
      email: req.body.user.email,
      isGuestUser: true,
      isOrdered: true,
    });

    cartData = await cartData.save();

    //save order
    var orderObj = new Order({
      first_name: req.body.user.first_name,
      last_name: req.body.user.last_name,
      email: req.body.user.email,
      isGuestUser: true,
      address: req.body.user.address,
      orderNumber: Date.now() + Math.random(),
      cartId: cartData._id,
    });
    await orderObj.save();

    res.status(200).json({
      status: "success",
      message: "Order placed successfully",
    });
  }
});

router.get("/", auth, async (req, res, next) => {
  if (req.user.isAdmin) {
    var orders = await Order.find({ isDeleted: false })
      .populate({
        path: "cartId",
        populate: {
          path: "items.productId",
          populate: {
            path: "category",
          },
        },
      })
      .sort({ isDelivered: 1, createdAt: 1 });
    console.log(orders);
    res.status(200).json({
      status: "success",
      orders,
    });
  } else {
    var orders = await Order.find({ email: req.user.email, isDeleted: false })
      .populate({
        path: "cartId",
        populate: {
          path: "items.productId",
          populate: {
            path: "category",
          },
        },
      })
      .sort({ isDelivered: 1, createdAt: 1 });
    if (orders.length != 0) {
      res.status(200).json({
        status: "success",
        orders,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No Orders Found",
      });
    }
  }
});

router.get("/:id", auth, async (req, res, next) => {
  if (req.user.isAdmin) {
    var orders = await Order.findOne({
      _id: req.params.id,
      isDeleted: false,
    }).populate({
      path: "cartId",
      populate: {
        path: "items.productId",
        populate: {
          path: "category",
        },
      },
    });
    console.log(orders);
    res.status(200).json({
      status: "success",
      orders,
    });
  } else {
    var orders = await Order.findOne({
      _id: req.params.id,
      isDeleted: false,
    }).populate({
      path: "cartId",
      populate: {
        path: "items.productId",
        populate: {
          path: "category",
        },
      },
    });
    if (orders.length != 0) {
      res.status(200).json({
        status: "success",
        orders,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No Orders Found",
      });
    }
  }
});

router.patch("/", auth, async (req, res) => {
  if (req.user !== null && req.user.isAdmin) {
    var orderObj = await Order.findById(req.body.id);
    console.log(orderObj);
    if (orderObj.length !== 0) {
      orderObj.isDelivered = true;
      orderObj.orderDeliveredOn = new Date().toLocaleString();
      await orderObj.save();
      res.status(200).json({
        status: "success",
        message: "Order modified successfully",
      });
    } else {
      res.status(400).json({
        status: "success",
        message: "Order Not Found",
      });
    }
  } else {
    res.status(403).json({ message: "Access Denied" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user !== null && req.user.isAdmin) {
    Order.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false },
      (err, result) => {
        if (err) throw err;
        return res.status(200).json({
          status: "success",
          message: "Order deleted successfully",
        });
      }
    );
  } else {
    res.status(403).json({ message: "Access Denied" });
  }
});

module.exports = router;
