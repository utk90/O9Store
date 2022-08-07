import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Doughnut, Line } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProduct } from '../../actions/productAction'
import { getAllOrders } from '../../actions/orderAction'
import { getAllUsers } from '../../actions/userAction'

Chart.register(CategoryScale);

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products);
    const { orders } = useSelector(state => state.allOrders);
    const { users } = useSelector(state => state.allUsers);

    let outOfStock = 0;

    products && products.forEach(item => {
        if (item.Stock === 0) {
            outOfStock += 1;
        }
    })

    let totalAmount = 0;

    orders && orders.forEach(item => {
        totalAmount += item.totalPrice;
    })

    const lineState = {
        datasetIdKey: 'id',
        labels: ['Initial Amount', 'Amount Earned'],
        datasets: [
            {
                label: 'TOTAL AMOUNT',
                background: ['#203847'],
                hoverBackgroundColor: ['rgb(197, 72, 49'],
                data: [0, totalAmount]
            }
        ]
    }

    const doughnutState = {
        labels: ['Out of stock', 'In stock'],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products.length - outOfStock]
            }
        ]
    }

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch])

    return (
        <div className='dashboard'>
            <Sidebar />
            <div className="dashboardContainer">
                <Typography component='h1'>Dashboard</Typography>
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ₹{totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to='/admin/products'>
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to='/admin/orders'>
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to='/admin/users'>
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>
                <div className="lineChart">
                    <Line data={lineState} />
                </div>
                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard