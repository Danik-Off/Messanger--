import "./loginForm.scss";
import logo from "../assets/logo.png";
import { Form } from "react-router-dom";

const handlerLogin = () => {
  // const login = e.target[0].value;
  // const password = e.target[0].value;

 localStorage.setItem("token","");
};

function LoginForm() {
  return (
    <Form className="loginForm" onSubmit={handlerLogin}>
      <div className="mForm">
        <a className="logo" href="https://lspu-lipetsk.ru/">
          <img src={logo}></img>
        </a>
        <h2>Авторизация</h2>
        <input placeholder="Логин" name="login"></input>
        <input placeholder="Пароль"></input>
        <button>Войти</button>
      </div>
    </Form>
  );
}

export default LoginForm;
