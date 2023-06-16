import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { registerUser } from '../../store/api-actions';
import { NewUser } from '../../types/new-user';

function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const formData: NewUser = {
      name: nameRef.current?.value as string,
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
    };

    const response = await dispatch(registerUser(formData));
    if (response.meta.requestStatus === 'rejected') {
      toast.error('Can\'t sign up');
    } else {
      toast.success('Success! Please sign in!');
      navigate(AppRoute.Login);
    }
  };

  return (
    <form className="sign-in__form register-form"
      action="#"
      method="post"
      onSubmit={(evt) =>
        void handleSubmit(evt)}
    >
      <div className="input-login">
        <label htmlFor="name">Введите имя</label>
        <input type="text" id="name" name="name" autoComplete="off" required/>
        <p className="input-login__error">Заполните поле</p>
      </div>
      <div className="input-login">
        <label htmlFor="email">Введите e-mail</label>
        <input type="email" id="email" name="email" autoComplete="off" required/>
        <p className="input-login__error">Заполните поле</p>
      </div>
      <div className="input-login">
        <label htmlFor="password">Придумайте пароль</label>
        <span>
          <input type="password" placeholder="• • • • • • • • • • • •" id="password" name="password"
            autoComplete="off" required
          />
          <button className="input-login__button-eye" type="button">
            <svg width="14" height="8" aria-hidden="true">
              <use xlinkHref="#icon-eye"></use>
            </svg>
          </button>
        </span>
        <p className="input-login__error">Заполните поле</p>
      </div>
      <button className="button login__button button--medium" type="submit">Зарегистрироваться</button>
    </form>
  );
}

export default RegisterForm;
