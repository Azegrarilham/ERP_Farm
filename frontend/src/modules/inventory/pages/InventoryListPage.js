import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, TextField, InputAdornment, Chip,
  Button, CircularProgress, Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon
} from "@mui/icons-material";

// Animation variants
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

const InventoryListPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/inventory");
      console.log("API Response:", response.data); // Check API response

      setInventory(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setLoading(false);
    }
  };

  const getStockStatus = (quantity) => {
    if (quantity <= 0) return { label: "Out of Stock", color: "#EF5350" };
    if (quantity < 10) return { label: "Low Stock", color: "#FBC02D" };
    return { label: "In Stock", color: "#4CAF50" };
  };

  const filteredInventory = inventory.filter(item => {
      const productName = item?.product_name || '';  // Use optional chaining and default value

      const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase());

      if (filter === "all") return matchesSearch;
      if (filter === "low") return matchesSearch && item.stock < 10 && item.stock > 0;
      if (filter === "out") return matchesSearch && item.stock <= 0;
      return matchesSearch;
  });


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Box sx={{
        p: 3,
        bgcolor: "#FAFAFA",
        minHeight: "100vh"
      }}>
        <motion.div variants={itemVariants}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              color: "#388E3C",
              fontWeight: "bold",
              borderBottom: "2px solid #4CAF50",
              paddingBottom: 1,
              display: "inline-block"
            }}
          >
            Inventory Management
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              flexWrap: "wrap",
              gap: 2
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                flexWrap: "wrap"
              }}
            >
              <TextField
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#757575" }} />
                    </InputAdornment>
                  ),
                }}
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

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Filter</InputLabel>
                <Select
                  value={filter}
                  label="Filter"
                  onChange={(e) => setFilter(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#8D6E63",
                      },
                    },
                  }}
                >
                  <MenuItem value="all">All Items</MenuItem>
                  <MenuItem value="low">Low Stock</MenuItem>
                  <MenuItem value="out">Out of Stock</MenuItem>
                </Select>
              </FormControl>

              <IconButton
                onClick={fetchInventory}
                sx={{
                  color: "#6d9895",
                  "&:hover": {
                    color: "#4CAF50",
                    backgroundColor: "rgba(76, 175, 80, 0.08)"
                  },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Box>

            <Button
              component={Link}
              to="/inventory/add"
              variant="contained"
              startIcon={<AddIcon />}
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
              Add Inventory
            </Button>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Paper
            elevation={2}
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #e0e0e0"
            }}
          >
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress sx={{ color: "#4CAF50" }} />
              </Box>
            ) : filteredInventory.length === 0 ? (
              <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "#757575" }}>
                  No inventory items found
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#cfc9b1" }}>
                      <TableCell sx={{ fontWeight: "bold", color: "#333333" }}>Product Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333333" }}>Current Stock</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333333" }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333333" }}>Last Updated</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#333333" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredInventory.map((item) => {
                      const status = getStockStatus(item.stock);
                      return (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          component={TableRow}
                          sx={{
                            "&:hover": {
                              bgcolor: "rgba(207, 201, 177, 0.1)",
                            },
                            cursor: "pointer"
                          }}
                        >
                          <TableCell sx={{ color: "#333333" }}>{item.product_name}</TableCell>
                          <TableCell
                            sx={{
                              color: item.stock < 10 ? "#EF5350" : "#333333",
                              fontWeight: item.stock < 10 ? "bold" : "normal"
                            }}
                          >
                            {item.stock}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={status.label}
                              sx={{
                                bgcolor: `${status.color}20`,
                                color: status.color,
                                fontWeight: "bold",
                                border: `1px solid ${status.color}`,
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ color: "#757575" }}>
                            {new Date(item.updated_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              component={Link}
                              to={`/inventory/edit/${item.id}`}
                              sx={{
                                color: "#6d9895",
                                "&:hover": {
                                  color: "#4CAF50",
                                  backgroundColor: "rgba(76, 175, 80, 0.08)"
                                },
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default InventoryListPage;
