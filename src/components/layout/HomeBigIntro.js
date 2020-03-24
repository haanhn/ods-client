import React from 'react';

const HomeBigIntro = () => {
	return (
		// <!-- Banner Section -->
		<section className="banner-section">
			<div className="banner-carousel love-carousel owl-theme owl-carousel" data-options='{"loop": true, "margin": 0, "autoheight":true, "lazyload":true, "nav": true, "dots": true, "autoplay": true, "autoplayTimeout": 6000, "smartSpeed": 300, "responsive":{ "0" :{ "items": "1" }, "768" :{ "items" : "1" } , "1000":{ "items" : "1" }}}'>
				{/* <!-- Slide Item --> */}
				{/* <div className="slide-item">
				<div className="image-layer lazy-image" data-bg="url('images/main-slider/1.jpg')"></div>

				<div className="auto-container">
					<div className="content-box">
						<h2>You Can Help  <br>The Poor</h2>
						<div className="text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div>
						<div className="btn-box"><a href="donate.html" className="theme-btn btn-style-one"><span className="btn-title">Donate Now</span></a></div>
					</div>  
				</div>
			</div> */}

				{/* <!-- Slide Item --> */}
				{/* <div className="slide-item">
				<div className="image-layer lazy-image" data-bg="url('images/main-slider/2.jpg')"></div>

				<div className="auto-container">
					<div className="content-box">
						<h2>You Can Help  <br>The Poor</h2>
						<div className="text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div>
						<div className="btn-box"><a href="donate.html" className="theme-btn btn-style-one"><span className="btn-title">Donate Now</span></a></div>
					</div>  
				</div>
			</div> */}

				{/* <!-- Slide Item --> */}
				<div className="slide-item">
					<div className="image-layer lazy-image" data-bg="url('images/main-slider/3.jpg')"></div>

					<div className="auto-container">
						<div className="content-box">
							<h2>You Can Help  <br />The Poor</h2>
							<div className="text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div>
							<div className="btn-box"><a href="donate.html" className="theme-btn btn-style-one"><span className="btn-title">View list campaigns</span></a></div>
						</div>
					</div>
				</div>

			</div>

		</section>
		// End Banner Section 
	);
};

export default HomeBigIntro;