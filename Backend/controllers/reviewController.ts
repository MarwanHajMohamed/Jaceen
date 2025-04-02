import { Request, Response } from "express";
import {Product} from "../models/productModel";
import Review from "../models/reviewModel";

// Add a review to a product
export const addReviewToProduct = async (req, res) => {
  const { rating, comment, title } = req.body;
  const productId = req.params.id;
  
  // Ensure user exists
  if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
  }

  const userId = req.user._id;

  try {
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }

      const newReview = new Review({
          product: productId,
          user: userId,
          name: req.user.firstName + " " + req.user.surname,
          rating,
          title,
          comment,
      });

      // Save the review first
      await newReview.save();

      try {
          const reviews = await Review.find({ product: productId });
          
          const validReviews = reviews.filter(review => 
              review.rating !== undefined && typeof review.rating === 'number');
          
          product.numReviews = validReviews.length;
          
          if (product.numReviews > 0) {
              product.rating = validReviews.reduce((acc, review) => acc + review.rating, 0) / product.numReviews;
          } else {
              product.rating = 0;
          }

          await Product.updateOne(
            { _id: productId },
            { 
              numReviews: reviews.length,
              rating: reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
            }
          );
      } catch (updateError) {
          console.error("Error updating product rating:", updateError);
          return res.status(201).json({ 
              message: "Review added but product stats couldn't be updated", 
              review: newReview 
          });
      }

      res.status(201).json({ message: "success", review: newReview });
  } catch (error) {
      console.error("Error adding review:", error);
      res.status(500).json({ message: "Error adding review" });
  }
};


// Get all reviews for a product
export const getProductReviews = async (req, res) => {
  const productId = req.params.id;

  try {
    const reviews = await Review.find({ product: productId }).populate("user", "name");
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};