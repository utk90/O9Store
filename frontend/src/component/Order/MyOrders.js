import React from 'react'
import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import "./MyOrders.css";

const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, orders } = useSelector(state => state.myOrders);
    const { user } = useSelector(state => state.user);

    const columns = [
        {
            field: 'id', headerName: 'Order Id', minWidth: 300, flex: 1
        },
        {
            field: 'status', headerName: 'Status', minWidth: 150, flex: 0.5, cellClassName: (params) => {
                return params.getValue(params.id, 'status') === 'Delivered' ? 'greenColor' : 'redColor'
            }
        },
        {
            field: 'itemsQty', headerName: 'Items Qty', minWidth: 150, flex: 0.3
        },
        {
            field: 'actions', headerName: 'Actions', minWidth: 150, flex: 0.4, sortable: false, renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, 'id')}`} >
                        <LaunchIcon />
                    </Link>
                )
            }
        },
        {
            field: 'amount', headerName: 'Amount', minWidth: 200, flex: 0.5
        }
    ];
    const rows = [];

    orders && orders.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice
        })
    })

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders())
    }, [alert, dispatch, error])

    return (
        <>
            <MetaData title={`${user.name} - Orders`} />
            {
                loading ? <Loader /> :
                    (
                        <div className="myOrdersPage">
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                classNae="myOrdersTable"
                                autoHeight
                            />
                        </div>
                    )
            }
        </>
    )
}

export default MyOrders