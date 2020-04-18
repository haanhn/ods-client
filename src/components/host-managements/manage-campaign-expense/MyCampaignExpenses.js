import React, { useContext, useEffect, useState, Fragment } from 'react';
import CurrencyFormat from 'react-currency-format';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import Alert from '../../common/Alert';
import '../../css/common.css';
import '../../css/host-manage-campaign.css';
import MyCampaignExpenseModal from './MyCampaignExpenseModal';
import ConfirmDeleteExpense from './ConfirmDeleteExpense';
import Spinner from '../../common/Spinner';

const MyCampaignExpenses = (props) => {
    const { slug } = props.match.params;
    const myCampaignsContext = useContext(MyCampaignsContext);
    const expenses = myCampaignsContext.myCampaignExpenses;
    const totalExpense = myCampaignsContext.totalExpense;
    const { loading, listLoading } = myCampaignsContext;

    const [showingModal, setShowingModal] = useState(false);
    const [showingDeleteModal, setShowingDeleteModal] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [deleteExpenseId, setDeleteExpenseId] = useState(null);
    const [deleteExpenseName, setDeleteExpenseName] = useState(null);

    const viewExpense = (event, expense) => {
        console.log('view expense');
        console.log(expense);
        setCurrentExpense(expense);
        setShowingModal(true);
    }

    const showDeleteExpense = (event, expense) => {
        console.log('view delete expense id');
        console.log(expense);
        setDeleteExpenseId(expense.id);
        setDeleteExpenseName(expense.title);
        setShowingDeleteModal(true);
    }

    let expensesJsx = [];
    if (expenses && expenses.length > 0) {
        expensesJsx = expenses.map((expense, i) => (
            <tr key={expense.id} style={{ width: '100%' }}>
                <td>{i + 1}</td>
                <td>
                    <div>
                        {expense.title}
                    </div>
                    <div className='expense-description'>
                        {expense.description}
                    </div>
                </td>
                <td>
                    <CurrencyFormat value={expense.cost} displayType={'text'} thousandSeparator={true} />
                    đ
                </td>
                <td>
                    <button className='btn btn-super-sm btn-info' style={{ marginRight: '5px' }} >
                        <i className="fas fa-edit" style={styleIconBtnEdit}
                            onClick={(event) => viewExpense(event, expense)}></i>
                    </button>
                    <button className='btn btn-super-sm btn-danger' >
                        <i className="fas fa-trash-alt" style={styleIconBtn}
                            onClick={(event) => showDeleteExpense(event, expense)}></i>
                    </button>
                </td>
            </tr>
        ));
    }

    useEffect(() => {
        myCampaignsContext.getCampaignExpenses(slug);
    }, []);

    if (!loading && listLoading) {
        return <Spinner />;
    }

    return (
        <div className='host-list-expenses-container' >

            <div className='host-list-expenses'>
                <h4 style={{ marginBottom: '20px' }}>
                    Quản lý chi phí
                    <button className='btn btn-sm btn-success' style={{ float: 'right' }}
                        onClick={(event) => viewExpense(event, null)}> Tạo chi phí </button>
                </h4>

                {expenses && expenses.length > 0 ? (
                    <Fragment>
                        <table className='table table-hover table-bordered'>
                            <thead>
                                <tr>
                                    <td>STT</td>
                                    <td>Chi phí</td>
                                    <td>Số tiền</td>
                                    <td> </td>
                                </tr>
                            </thead>
                            <tbody>

                                {expensesJsx}
                            </tbody>
                        </table>
                        <div>
                            <b>Tổng chi phí: </b>
                            <CurrencyFormat value={totalExpense} displayType={'text'} thousandSeparator={true} />
                            đ
                        </div>
                    </Fragment>
                ) : (
                        <Alert alert={alertEmpty} />
                    )}
                <MyCampaignExpenseModal showingModal={showingModal} setShowingModal={setShowingModal}
                    slug={slug} expense={currentExpense} />
                <ConfirmDeleteExpense showingModal={showingDeleteModal} setShowingModal={setShowingDeleteModal}
                    slug={slug} expenseName={deleteExpenseName} expenseId={deleteExpenseId} />
            </div>
        </div>
    );
}

const alertEmpty = {
    type: 'secondary',
    msg: 'Danh sách chi phí trống'
}
const styleIconBtn = { fontSize: '115%' };
const styleIconBtnEdit = { fontSize: '120%' };

// const getExpenseById = (id, expenses) => {
//     if (!expenses || expenses.length === 0) {
//         return null;
//     }
//     let i = 0;
//     for (i = 0; i < expenses.length; i++) {
//         const expense = expenses[i];
//         if (expense.id === id) {
//             return expense;
//         }
//     }
//     return null;
// }

export default MyCampaignExpenses;