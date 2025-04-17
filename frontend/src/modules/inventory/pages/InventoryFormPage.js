import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Box, Typography, Paper, TextField, Button,
  FormControl, InputLabel, Select, MenuItem,
  CircularProgress, Alert, Snackbar, Divider,
  Grid, IconButton
} from "@mui/material";
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  ArrowBack as ArrowBackIcon,
  Inventory as InventoryIcon
} from "@mui/icons-material";
import api from '../api';  // Corrected import path

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const InventoryFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    product_id: "",
    stock: "",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const API_PRODUCTS_URL = "http://127.0.0.1:8000/api/products";  // Adjust as needed

  useEffect(() => {
    fetchProducts();
    if (isEditMode) {
      fetchInventoryItem();
    }
  }, [id]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_PRODUCTS_URL);  // API_PRODUCTS_URL
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again.");
    }
  };

  const fetchInventoryItem = async () => {
    setLoading(true);
    try {
      const data = await api.getInventoryByProduct(id);  // Use getInventoryByProduct
      setFormData({
        product_id: data.product_id,
        stock: data.stock.toString(),
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inventory item:", error);
      setError("Failed to load inventory item. Please try again.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        product_id: parseInt(formData.product_id),
        stock: parseInt(formData.stock),
      };

      if (isEditMode) {
        await api.updateInventory(id, payload);  // Use updateInventory
      } else {
        await api.createInventory(payload);  // Use createInventory
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/inventory/list");
      }, 1500);
    } catch (error) {
      console.error("Error saving inventory:", error);
      setError("Failed to save inventory. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress sx={{ color: "#4CAF50" }} />
      </Box>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Box
        sx={{
          p: 3,
          bgcolor: "#FAFAFA",
          minHeight: "100vh"
        }}
      >
        <motion.div variants={itemVariants}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <IconButton
              onClick={() => navigate("/inventory/list")}
              sx={{
                mr: 1,
                color: "#8D6E63",
                "&:hover": {
                  color: "#4CAF50",
                  backgroundColor: "rgba(76, 175, 80, 0.08)"
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h4"
              sx={{
                color: "#388E3C",
                fontWeight: "bold",
                borderBottom: "2px solid #4CAF50",
                paddingBottom: 1,
                display: "inline-block"
              }}
            >
              {isEditMode ? "Edit Inventory" : "Add Inventory"}
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Paper
            elevation={3}
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 3,
              p: 4,
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
              maxWidth: "800px",
              mx: "auto"
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <InventoryIcon sx={{ fontSize: 40, color: "#FBC02D", mr: 2 }} />
              <Typography variant="h5" sx={{ color: "#333333" }}>
                {isEditMode ? "Update Stock Information" : "New Stock Entry"}
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Product</InputLabel>
                  <Select
                    name="product_id"
                    value={formData.product_id}
                    onChange={handleChange}
                    label="Product"
                    disabled={isEditMode}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#8D6E63",
                        },
                        "&:hover fieldset": {
                          borderColor: "#4CAF50",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#4CAF50",
                        },
                      },
                    }}
                  >
                    {products.map((product) => (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  name="stock"
                  label="Stock Quantity"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  inputProps={{ min: 0 }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#8D6E63",
                      },
                      "&:hover fieldset": {
                        borderColor: "#4CAF50",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4CAF50",
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            {error && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {error}
              </Alert>
            )}

            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2
              }}
            >
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={() => navigate("/inventory/list")}
                sx={{
                  color: "#8D6E63",
                  borderColor: "#8D6E63",
                  "&:hover": {
                    borderColor: "#8D6E63",
                    backgroundColor: "rgba(141, 110, 99, 0.08)"
                  },
                  borderRadius: "8px"
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={submitting}
                sx={{
                  bgcolor: "#4CAF50",
                  "&:hover": {
                    bgcolor: "#388E3C",
                  },
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(76, 175, 80, 0.2)",
                  transition: "all 0.3s ease"
                }}
              >
                {submitting ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  isEditMode ? "Update Inventory" : "Save Inventory"
                )}
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Box>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Inventory {isEditMode ? "updated" : "added"} successfully!
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default InventoryFormPage;
