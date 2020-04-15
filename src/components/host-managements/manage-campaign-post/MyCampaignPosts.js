import React, { useContext, useEffect, Fragment } from 'react';
import mycampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import '../../css/host-manage-campaign.css';
// import '../../css/icon.css';
import { getDateFormatDD_MM_YYYY } from '../../../utils/commonUtils';
import { Link } from 'react-router-dom';
import { routes } from '../../../odsApi';
import DataTable from 'react-data-table-component';
import { getPostStatus } from './postUtils';
import Alert from '../../common/Alert';

const MyCampaignPosts = (props) => {
    const { slug } = props.match.params;
    const myCampaignsContext = useContext(mycampaignsContext);

    let postJsx = null;
    let posts = myCampaignsContext.myCampaignPosts;

    const deletePost = (event, row) => {
        try {
            if (row) {
                myCampaignsContext.deleteCampaignPost(row.id);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const columns = [
        {
            name: 'Tiêu đề',
            selector: 'postTitle',
            sortable: true
        },
        {
            name: 'Thời gian',
            selector: 'dateJsx',
            sortable: true,
            center: true
        },
        {
            name: 'Trạng thái',
            selector: 'postStatusJsx',
            sortable: true,
            center: true
        },
        {
            name: ' ',
            cell: (row) => (
                <Fragment>
                    <Link to={{
                        pathname: routes.getRouteMyCampaignPostDetail(slug, row.id),
                        state: {
                            hello: 'hello'
                        }
                    }} className='btn btn-sm btn-info' style={{ color: '#fff' }} >
                        <i className="fas fa-eye"></i>
                    </Link>
                    <button className='btn btn-sm btn-danger' style={{ color: '#fff', marginLeft: '5px' }}
                        onClick={(event) => { deletePost(event, row) }} >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </Fragment>
            ),
            center: true,
            maxWidth: '80px'
        }
    ]

    let data = [];
    if (posts && posts.length > 0) {
        data = getPostsData(posts);
    }

    useEffect(() => {
        myCampaignsContext.getMyCampaignPosts(slug);
    }, []);

    const createRoute = routes.getRouteMyCampaignPostCreate(slug);

    return (
        <div className='container host-list-posts' style={{ maxWidth: '850px' }}>
            <h4>Các bài viết
                <button className='btn btn-sm btn-success' style={{ float: 'right' }}>
                    <i class="fas fa-plus-circle" style={{ marginRight: '3px' }}></i><Link to={createRoute} style={{ color: 'white' }} > Tạo bài viết </Link>
                </button>
            </h4>
            {/* <div style={{ marginBottom: '8px' }} >
                <button className='btn btn-sm btn-success'>
                    <Link to={createRoute} style={{ color: 'white' }} > Tạo bài viết </Link>
                </button>
            </div> */}

            {posts && posts.length > 0 ? (
                <DataTable
                    // title="Các bài viết"
                    columns={columns}
                    data={data}
                    pagination={true}
                    striped={true}
                    highlightOnHover={true}
                    customStyles={customStyles}
                />

            )
                : (
                    <Alert alert={alertEmpty} />
                )}

        </div>
    );
}

// const getPostById = (list, id) => {
//     if (list && list.length > 0) {
//         let item;
//         let post;
//         for (item of list) {
//             console.log(item.id);
//             if (item.id === id) {
//                 post = item;
//                 return post;
//             }
//         }
//     }
//     return null;
// }


const getPostsData = (posts) => {
    if (!posts || posts.length === 0) {
        return [];
    }
    let i = 0;
    for (i = 0; i < posts.length; i++) {
        const status = getPostStatus(posts[i].postStatus);
        //statusJsx
        posts[i].postStatusJsx = <span className={
            'badge ' +
            (posts[i].postStatus === 'enable'
                ? 'badge-success' : 'badge-warning'
            )
        }>
            {status}
        </span>
        //dateJsx
        posts[i].dateJsx = getDateFormatDD_MM_YYYY(posts[i].updatedAt);
    }
    return posts;
}

const customStyles = {
    rows: {
        style: {
            fontSize: '15px', // override the row height
        }
    },
    headCells: {
        style: {
            fontSize: '15px',
            fontWeight: 'bold',
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '6px', // override the cell padding for data cells
            paddingRight: '6px',
        },
    },
};

const alertEmpty = {
    type: 'secondary',
    msg: 'Chưa có bài viết nào'
}

export default MyCampaignPosts;

// if (posts && posts.length > 0) {
//     data = getPostsData(posts);
//     postJsx = posts.map((post) => {
//         const date = getDateFormatDD_MM_YYYY(post.updatedAt);
//         const route = routes.getRouteMyCampaignPostDetail(slug);
//         return (
//             <tr key={post.id}>
//                 <td className='post-title' >
//                     <Link to={{
//                         pathname: route,
//                         state: {
//                             post: {
//                                 id: post.id,
//                                 postTitle: post.postTitle,
//                                 postContent: post.postContent,
//                                 postStatus: post.postStatus
//                             }
//                         }
//                     }}>
//                         {post.postTitle}
//                     </Link>
//                 </td>
//                 <td style={{ textAlign: 'right' }} >{date}</td>
//                 {/* <td><i class="fas fa-plus-circle icon-theme"></i></td> */}
//             </tr>
//         );
//     })
// }

{/* <table className="table table-hover">
    <thead>
        <tr>
            <th>Tiêu đề</th>
            <th>Cập nhật</th>
        </tr>
    </thead>
    <tbody>
        {postJsx}
    </tbody>
</table> */}
