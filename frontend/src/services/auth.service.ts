import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";
import OpenAPIClientAxios from 'openapi-client-axios';
import {Client as ObrazciClient, Definitions, Paths } from '../types/api.d';
import { notifications } from '@mantine/notifications';
import Router from 'next/router';
import Cookies from "js-cookie";
export interface RegisterForm {email: string, password: string, vpassword: string, terms: boolean}
export interface LoginForm {email: string, password: string, stayLoggedIn: boolean}
export interface UserToken {access: string, refresh: string, user: {email: string, first_name: string, last_name: string, username: string, pk: number}}

export class AuthService {
  protected readonly instance: OpenAPIClientAxios;
  public constructor() {
    const base = "https://api.obrazci.net";
    const api = new OpenAPIClientAxios({ 
      definition: base + '/swagger.json',
      axiosConfigDefaults: {baseURL: base, headers: getAuthorizationHeader()},
    });
    api.init<ObrazciClient>();
    this.instance = api;
  }


  register = async (input: RegisterForm ) => {
    Cookies.remove("currentUser");
    let data: Definitions.Register = {email: input.email, username: input.email, password1: input.password, password2: input.vpassword}; 
    const client = await this.instance.getClient<ObrazciClient>();
    return client.paths["/user-auth/registration/"].post(null, data).then((res) => {
      const userToken = res.data;
      Cookies.set("currentUser", JSON.stringify(userToken));
      return true;
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
      const msg = err.message + specificError;
      notifications.show({ message: msg, color: 'red' });
      return false;
    });      

  }

  login = async (input: LoginForm ) => {
    let payload: Definitions.Login = {email: input.email, username: input.email, password: input.password}; 
    console.log(payload)
    const client = await this.instance.getClient<ObrazciClient>();
    return client.paths["/user-auth/login/"].post(null, payload).then((res): UserToken => {
      const userToken = res.data;
      Cookies.set("currentUser", JSON.stringify(userToken));
      return userToken as any;
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
      const msg = err.message + specificError;
      notifications.show({ message: msg, color: 'red' });
      return null;
    });     

  }
}