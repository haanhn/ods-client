import React, { useContext, Fragment } from 'react';
import CurrencyFormat from 'react-currency-format';
import CampaignsContext from '../../../../context/campaigns/campaignsContext';

const CampaignExpenses = () => {
    const campaignsContext = useContext(CampaignsContext);
    const expenses = campaignsContext.campaignExpenses;



    let expensesJsx = [];
    if (expenses && expenses.length > 0) {
        expensesJsx = expenses.map((expense) => (
            <tr key={expense.id} style={{ width: '100%' }}>
                <td>
                    <div>
                    <i class="fas fa-money-bill-wave" style={{color: 'green', marginRight: '7px'}}></i>
                    {expense.title}
                    </div>
                    <div className='expense-description'>
                        {expense.description}
                    </div>
                </td>
                <td className='expense-cost'>
                    <CurrencyFormat value={expense.cost} displayType={'text'} thousandSeparator={true} />
                    đ
                </td>
            </tr>
        ));
    }

    return (
        <div>
            {expenses && expenses.length > 0 ? (
                <Fragment>
                    <table className='table table-expenses'>
                        <tbody>
                            {expensesJsx}
                        </tbody>
                    </table>
                </Fragment>
            ) : (
                    null
                )}
        </div>
    );
}

export default CampaignExpenses;