import React from 'react';
import '../css/about.css';

const About = () => {
    return (
        <div className='about-container'>
            <div className='about-content'>
                <h3>FAQs</h3>
                <h5>1. ODS là gì?</h5>
                <div>
                    ODS là 1 ứng dụng giúp người dùng tạo và quản lý hoạt động gây quỹ.
                </div>

                <h5>2. Những ai có thể khởi tạo chiến dịch?</h5>
                <div>
                    ODS được xây dựng để bất cứ cá nhân nào cũng có thể sử dụng để khởi tạo chiến dịch gây quỹ của riêng mình.
                </div>

                <h5>3. Các chiến dịch sẽ được xét trước khi khởi chạy?</h5>
                <div>
                    Đúng vậy, chúng tôi cần đảm bảo các chiến dịch được đăng không vi phạm các nguyên tắc cơ bản của chúng tôi.
                    Bao gồm các nguyên tắc: không vi phạm bản quyền; không xâm phạm quyền trẻ em, quyền động vật; không xúc phạm thân thể và danh dự của người khác; bảo vệ môi trường…
                </div>
                <h5>4. Thời gian xét duyệt sẽ kéo dài bao lâu?</h5>
                <div>
                    Các chiến dịch sẽ mất tối đa 3 ngày cho quá trình duyệt thông tin.
                    Chúng tôi sẽ liên hệ với chủ chiến dịch (qua email hoặc điện thoại) để xác minh các thông tin được đăng là chính xác.
                </div>

                <h5>5. Điều gì xảy ra nếu tôi không đạt được mục tiêu gây quỹ như dự định?</h5>
                <div>
                    Bạn tự chịu trách nhiệm với chiến dịch gây quỹ của mình và với các cam kết đã đưa ra.
                    Bạn có thể hoàn tiền cho người ủng hộ, hoặc đưa ra một kế hoạch hành động mới với số tiền đã có.
                </div>

                <h5>6. Khi nào thì tôi nhận được số tiền quyên góp của mình?</h5>
                <div>
                    Chúng tôi sẽ giải ngân cho chiến dịch trong vòng 2 ngày làm việc kể từ khi chiến dịch hết thời hạn gây quỹ.
                    Các trường hợp gây quỹ khẩn cấp như cứu trợ thiên tai hoặc y tế sẽ được cân nhắc giải ngân sớm hơn.
                    Tiền ủng hộ sẽ chuyển về tài khoản ngân hàng mà bạn đã đăng ký trước đó.
                </div>

                <h5>7. Tôi cần đáp ứng điều kiện gì để có thể khởi tạo chiến dịch?</h5>
                <div>
                    <ul>
                        <li>- Người chủ chiến dịch là công dân Việt Nam đủ 18 tuổi.</li>
                        <li>- Nội dung gây quỹ không vi phạm Điều khoản sử dụng của chúng tôi</li>
                        <li>- Một tài khoản ngân hàng.</li>
                    </ul>
                </div>
            </div>

            <div className='about-content'>
                <h3>Quyên góp</h3>
                <h5>Người ủng hộ trên ODS</h5>
                <div>
                    Người ủng hộ gửi tiền đến chiến dịch qua 1 trong 3 phương thức:
                    (1) Chuyển khoản ngân hàng, (2) Chuyển tiền mặt, (3) Thanh toán Paypal:
                    <br />
                    <ul>
                        <li>
                            - Chuyển khoản ngân hàng: Người ủng hộ chuyển tiền vào tài khoản của chủ chiến dịch, ODS sẽ thông tin tài khoản ngân hàng qua mail đến người ủng hộ.
                        </li>
                        <li>
                            - Chuyển tiền mặt: Người ủng hộ sẽ chuyển tiền đến địa chỉ liên hệ của chủ chiến dịch, ODS sẽ thông tin địa chỉ qua mail đến người ủng hộ.
                        </li>
                        <li>
                            - Thanh toán Paypal: Người ủng hộ được chuyển sang cổng thanh toán điện tử Paypal.
                            Việc thanh toán sẽ thông qua USD,
                            Phí giao dịch là 1.5 USD, ODS sẽ thu giúp cổng thanh toán Paypal.
                        </li>
                    </ul>
                </div>

                <h5>Người ủng hộ không qua ODS</h5>
                <div>
                    Đối với người ủng hộ không thông qua ODS, chủ chiến dịch có thể tạo quyên góp thay họ ở phần quản lý chiến dịch.
                </div>
            </div>
        </div>
    );
}

export default About;