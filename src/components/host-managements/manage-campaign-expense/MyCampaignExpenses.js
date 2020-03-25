import React, { useContext, useEffect, useState, Fragment } from 'react';
import CurrencyFormat from 'react-currency-format';
import MyCampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import Alert from '../../common/Alert';
import '../../css/common.css';
import '../../css/host-manage-campaign.css';
import MyCampaignExpenseModal from './MyCampaignExpenseModal';

const MyCampaignExpenses = (props) => {
    const { slug } = props.match.params;
    const myCampaignsContext = useContext(MyCampaignsContext);
    const expenses = myCampaignsContext.myCampaignExpenses;
    const totalExpense = myCampaignsContext.totalExpense;

    const [showingModal, setShowingModal] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);

    const viewExpense = (event, expense) => {
        setCurrentExpense(expense);
        setShowingModal(true);
    }

    const deleteExpense = async (expense) => {
        // const isDeleting = confirm('Bạn có muốn xóa chi phí?\n' + expense.title);
        // if (!isDeleting) {
        // return;
        // }
        const result = await myCampaignsContext.deleteCampaignExpense(expense.id);
        if (result) {
            myCampaignsContext.getCampaignExpenses(slug);
        } else {
            alert('Xóa chi phí thất bại, xin thử lại');
        }
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
                            onClick={() => deleteExpense(expense)}></i>
                    </button>
                </td>
            </tr>
        ));
    }

    useEffect(() => {
        myCampaignsContext.getCampaignExpenses(slug);        
    }, []);

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
                        <table className='table table-hover'>
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