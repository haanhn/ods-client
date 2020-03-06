import React from 'react';
import '../../css/host-manage-posts.css';
import '../../css/icon.css';

const CampaignPosts = () => {
    return (
        <div className='container host-list-posts'>
            <div style={{textAlign: 'right', marginBottom: '10px'}} > 
                <button className='btn btn-sm btn-success'>Tạo bài viết</button>
            </div>
            <table className="table">
                <tbody>
                    <tr>
                        <td>John John John John John John JohnJohn n John John John John JohnJohn John John n John John John John JohnJohn John John  John  John  John  John</td>
                        <td>30/3/2020</td>
                        <td><i class="fas fa-plus-circle icon-theme"></i></td>
                    </tr>
                    <tr>
                        <td>John John John John John John JohnJohn John John  John  John  John  John</td>
                        <td>30/3/2020</td>
                        <td><i class="fas fa-minus-circle icon-light"></i></td>
                    </tr>
                    <tr>
                        <td>John John John John John John JohnJohn John John  John  John  John  John</td>
                        <td>30/3/2020</td>
                        <td><i class="fas fa-minus-circle icon-light"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CampaignPosts;