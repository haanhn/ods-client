import React, { Fragment } from 'react';

const HomeBigIntro = () => {
	return (
		<Fragment>
			<div className='big-intro-section' style={{
				// backgroundImage: `url('https://wallpaperaccess.com/full/314670.jpg')`,
				background: 'linear-gradient(rgba(20,20,20, .4), rgba(20,20,20, .4)), url("/images/default-data-images/big-intro-cover.jpg")',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				height: '90vh',
			}} >
				<h1>Gây quỹ cá nhân</h1>
			</div>
		</Fragment>
	);
};

export default HomeBigIntro;