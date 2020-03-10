import React, { useContext, useEffect } from 'react';
import mycampaignsContext from '../../../context/mycampaigns/mycampaignsContext';
import '../../css/host-manage-campaign.css';
// import '../../css/icon.css';
import { getDateFormatDD_MM_YYYY } from '../../../utils/commonUtils';
import { Link } from 'react-router-dom';
import { routes } from '../../../odsApi';

const MyCampaignPosts = (props) => {
    const { slug } = props.match.params;
    const myCampaignsContext = useContext(mycampaignsContext);

    let postJsx = null;
    let posts = myCampaignsContext.myCampaignPosts;

    // const viewPostDetail = (event) => {
    //     console.log('clicked');
    //     const id = event.target.id;
    //     console.log(id);
    //     let post = getPostById(posts, id);

    //     console.log(post)
    // }

    if (posts && posts.length > 0) {
        postJsx = posts.map((post) => {
            const date = getDateFormatDD_MM_YYYY(post.updatedAt);
            const route = routes.getRouteMyCampaignPostDetail(slug);
            return (
                <tr key={post.id}>
                    <td className='post-title' >
                        <Link to={{
                            pathname: route,
                            state: {
                                post: {
                                    id: post.id,
                                    postTitle: post.postTitle,
                                    postContent: post.postContent,
                                    postStatus: post.postStatus
                                }
                            }
                        }}>
                            {post.postTitle}
                        </Link>
                    </td>
                    <td style={{ textAlign: 'right' }} >{date}</td>
                    {/* <td><i class="fas fa-plus-circle icon-theme"></i></td> */}
                </tr>
            );
        })
    }

    useEffect(() => {
        myCampaignsContext.getMyCampaignPosts(slug);
    }, []);

    const createRoute = routes.getRouteMyCampaignPostDetail(slug);

    return (
        <div className='container host-list-posts'>
            <div style={{ textAlign: 'right', marginBottom: '20px' }} >
                <button className='btn btn-sm btn-success'>
                    <Link to={createRoute} style={{ color: 'white' }} > Tạo bài viết </Link>
                </button>
            </div>

            {posts ? (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Tiêu đề</th>
                            <th>Cập nhật</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postJsx}
                    </tbody>
                </table>
            )
                : (
                    null
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

export default MyCampaignPosts;