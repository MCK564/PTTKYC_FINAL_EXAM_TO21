import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/loginWithJWT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Lưu trữ token trong Local Storage hoặc trạng thái ứng dụng
        console.log(data);
        localStorage.setItem('token', data.token);
        // Điều hướng đến trang sau khi đăng nhập thành công
        // history.push('/dashboard');
      } else {
        // Xử lý khi đăng nhập không thành công
        // Hiển thị thông báo lỗi hoặc xử lý theo ý muốn
      }
    } catch (error) {
      // Xử lý lỗi nếu có
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
