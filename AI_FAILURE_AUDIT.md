# AI Failure Audit Report - Exercise 1

## Vulnerability 01: Báo lỗi `dom.setAttribute is not a function`
- **Nguyên nhân**: AI duyệt toàn bộ `props` và gọi `dom.setAttribute()` trên Text Node (`document.createTextNode`).
- **Phát hiện**: Đã bắt lỗi qua DevTools Console.
- **Khắc phục**: Tách riêng kiểm tra `vnode.type === 'TEXT_ELEMENT'` để return ngay Text Node trước khi duyệt `props`.

## Vulnerability 02: Lỗi `Identifier 'createElement' has already been declared`
- **Nguyên nhân**: AI gợi ý nhầm việc khai báo lặp lại hàm `createElement` ở cả file test/script.
- **Phát hiện**: Xảy ra SyntaxError trên browser.
- **Khắc phục**: Chỉ xuất/nhập hàm thông qua ES6 Module (`export` / `import`).

## Vulnerability 03: Nguy cơ XSS với chuỗi HTML nguy hiểm
- **Nguyên nhân**: Ban đầu AI sử dụng `innerHTML` để chèn nội dung con.
- **Phát hiện**: Vi phạm tiêu chuẩn an toàn (XSS Checkpoint) trong yêu cầu bài tập.
- **Khắc phục**: Chuyển toàn bộ chuỗi con thành `document.createTextNode()` để trình duyệt tự động escape an toàn.