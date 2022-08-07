import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    getAdminProduct,
    deleteProduct,
} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import "./ProductList.css";

const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product);

    const columns = [
        {
            field: 'id',
            headerName: 'Product ID',
            minWidth: 200,
            flex: 0.5
        },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 250,
            flex: 0.7
        },
        {
            field: 'stock',
            headerName: 'Stock',
            // type: 'number',
            minWidth: 150,
            flex: 0.3
        },
        {
            field: 'actions',
            headerName: 'Actions',
            // type: 'number',
            minWidth: 170,
            flex: 0.4,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
                            <EditIcon />
                        </Link>

                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, 'id'))}>
                            <DeleteIcon />
                        </Button>
                    </>
                )
            }
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            minWidth: 150,
            flex: 0.5
        },
    ]

    const rows = [];

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }

    products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.Stock,
            price: item.price,
            name: item.name
        })
    })

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success('Product deleted successfully!!');
            navigate('/admin/dashboard');
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProduct());
    }, [alert, deleteError, dispatch, error, isDeleted, navigate])

    return (
        <>
            <MetaData title={'ALL PRODUCT - Admin'} />
            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">
                        ALL PRODUCTS
                    </h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}

export default ProductList