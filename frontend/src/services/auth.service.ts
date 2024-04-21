import { notifications } from '@mantine/notifications';
import { authRegistrationCreate, authLoginCreate } from '../api/endpoints/auth/auth'
import { Login } from '../api/model/login';
import { Register } from '../api/model/register';
import Router from 'next/router';
import Cookies from "js-cookie";
import { Jwt } from '../api/model';
export interface RegisterForm {email: string, password: string, vpassword: string, terms: boolean}
export interface LoginForm {email: string, password: string, stayLoggedIn: boolean}
export interface UserToken {access: string, refresh: string, user: {email: string, first_name: string, last_name: string, username: string, pk: number}}

export class AuthService {

  register = async (input: RegisterForm ) => {
    Cookies.remove("currentUser");
    const data: Register = {email: input.email, password1: input.password, password2: input.vpassword}
    console.log(data)
    return await authRegistrationCreate(data).then((res): Jwt  => {
      Cookies.set("currentUser", JSON.stringify(res));
      return res as Jwt;
    })
    .catch((err) => {
      console.log(err)
      let specificError = "";
      if (err.response?.data?.email) {
        specificError = err.response.data.email[0];
      }
      else if(err.response?.data?.password1) {
        specificError = err.response.data.password1[0];
      }
      else if(err.response?.data?.password2) {
        specificError = err.response.data.password2[0];
      }
      else if(err.response?.data?.username) {
        specificError = err.response.data.username[0];
      }
      else if(err.response?.data?.non_field_errors) {
        specificError = err.response.data.non_field_errors[0];
      }
      if (specificError) specificError = ": \n" + specificError;
      const msg = specificError;
      if (specificError){
        notifications.show({ message: msg, color: 'red' });
      }
      return false;
    });      

  }

  login = async (input: LoginForm ) => {
    const data: Login = {email: input.email, username: input.email, password: input.password}; 

    return authLoginCreate(data).then((res): Jwt => {
      return res as Jwt;
    })
    .catch((err) => {
      console.log(err)
      let specificError = "";
      if (err.response?.data?.email) {
        specificError = err.response.data.email[0];
      }
      else if(err.response?.data?.password) {
        specificError = err.response.data.password1[0];
      }
      else if(err.response?.data?.username) {
        specificError = err.response.data.username[0];
      }
      if (specificError) specificError = ": \n" + specificError;
      const msg = specificError;
      if (specificError) notifications.show({ message: msg, color: 'red' });
      return null;
    });     

  }
}