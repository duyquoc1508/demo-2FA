Two-Factor Authentication (2FA)
One-time Password (OTP)
HMAC-based One-Time Password (HOTP)
Time-based One-time Password (TOTP)

**Two-Factor Authentication** (thường viết tắt là 2FA hoặc TFA) là một phương pháp xác thực người dùng dựa trên 2 yếu tố, một là mật khẩu (thứ phổ biến nhất) và thứ hai là một thứ mà người dùng sở hữu, có quyền truy cập đến, ví dụ như dấu vân tay, tin nhắn SMS, gửi mã token tới Email hoặc tốt hơn nữa là One-time Password (OTP) (mật khẩu một lần có giới hạn hiệu lực theo thời gian).

**One-Time Password** sẽ là, SMS và Email thì mình sẽ làm ở những bài riêng biệt khác sau. Và đúng như cái tên của nó, One-time Password hay còn được viết tắt là OTP là một loại mã token mà chỉ có thể được sử dụng một lần rồi sau đó nó sẽ bị hủy, không được phép sử dụng tới lần thứ hai.

Để mã token mà thỏa mãn điều kiện là duy nhất chúng ta phải tìm hiểu đến 2 khái niệm khác

**HMAC-based One-Time Password – HOTP** là một thuật toán sinh mã OTP dựa trên hàm băm HMAC_SHA-1, nó sử dụng 2 thành phần: thứ nhất là một Chuỗi Secret cố định, còn thành phần thứ hai là một bộ đếm (Counter) bộ đếm này dùng một cái là “Moving-Factor” (mình tạm dịch ra là một yếu tố di chuyển, các bạn cũng có thể coi nó tương tự một chuỗi random ngẫu nhiên cho dễ hiểu cũng được.)

**Time-based One-time Password – TOTP** về cơ bản chỉ khác HOTP ở chỗ là TOTP sẽ sử dụng “thời gian” (Time) để làm bộ đếm (Counter) thay vì “Moving Factor” như HOTP. Chính vì việc sử dụng counter là thời gian nên phía Server lẫn Client khi đã có chung Secret Key rồi thì không cần có sự tương tác qua lại nữa. Vì cả 2 phía đều có quyền truy cập vào thời gian. Điều này cũng trả lời luôn cho một thắc mắc khá thú vị mà lâu nay mình vẫn tự hỏi, đó là tại sao khi mình thử tắt mạng, không kết nối internet cho cái điện thoại vậy mà Token sinh ra của mấy cái app Google Authenticator hay Authy vẫn sử dụng được ngon lành chả vấn đề gì

Giải thích cụ thể hơn đó là: phía Server sẽ so sánh giá trị token mà người dùng submit từ phía client (trong app gg authenticator ...) lên với tất cả các token được sinh ra trong cùng một khoảng thời gian nhất định trên Server. (thường là 30 giây cho đến 1 phút), và dĩ nhiên là nếu trùng nhau thì bạn sẽ pass qua vòng xác thực 2 lớp này. Đọc đến đây nhiều bạn có thể sẽ thắc mắc tiếp là: Ủa thế server và client khác múi giờ (Time zone) thì làm sao mà khoảng thời gian của 2 phía có thể đồng nhất được nhỉ?
Giải pháp là chúng ta có thể convert thời gian của cả 2 phía về dạng Unix Timestamp (hay còn gọi với tên khác là Epoch Time) rồi so sánh chúng. Hiểu một cách đơn giản thì Unix Timestamp là số giây đếm tăng dần từ một điểm thời gian cố định trong quá khứ đó là ngày 01/01/1970 (UTC) 00:00:00

## Flow demo authen 2FA
1. call api /login bằng username/password
2. call api /enable-2fa để lấy mã liên kết với app
3. call api /verify-2fa dùng mà OTP trong app để verify


### Ref
- https://trungquandev.com/nodejs-trien-khai-xac-thuc-2-lop-two-factor-authentication-2fa/
