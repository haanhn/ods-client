import React from 'react';
import { routes } from '../../../odsApi';

const FormChooseMethodDonation = (props) => {
    const { method, setMethod } = props;
    const inputMethod = React.createRef();
    const { slug } = props.match.params;
    const { history } = props;

    const methods = [
        { 
            key: 'cash',
            value: 'Chuyển tiền mặt'    
        },
        { 
            key: 'banking',
            value: 'Chuyển khoản ngân hàng'    
        },
        { 
            key: 'paypal',
            value: 'Chuyển qua Paypal'    
        },
        { 
            key: 'vnpay',
            value: 'Thanh toán VNPAY'    
        },
    ];

    const methodsJsx = methods.map((m) => {
        return (method === m.key) ? 
        <option key={m.key} value={m.key} selected> { m.value } </option>  
        : <option key={m.key} value={m.key}> {m.value} </option>
    }, []);

    const chooseMethod = (event) => {
        event.preventDefault();
        
        const chosenMethod = inputMethod.current.value;
        setMethod(chosenMethod);
        
        console.log(chosenMethod);
        
        if (chosenMethod === 'vnpay') {
            history.push(routes.getRouteDonateCampaignVnPay(slug));
        } else {
            history.push(routes.getRouteDonateCampaignDetails(slug));
        }
    }

    return (
        <div>
            <form>
                <div className="form-group row">
                    <label className="col-sm-12 col-form-label">Chọn phương thức chuyển tiền</label>
                    <div className="col-sm-12">
                        <select className="custom-select" ref={inputMethod} >
                            { methodsJsx }
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ textAlign: 'center' }} >
                        <button className="btn btn-success" style={{minWidth: '120px'}} onClick={chooseMethod} >Tiếp tục</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FormChooseMethodDonation;