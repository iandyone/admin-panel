import { ToastPayload } from '@/types';

export enum ENotificationTypes {
  DASHBOARD_PRODUCTS_FETCHING_ERROR,
  DASHBOARD_ORDERS_FETCHING_ERROR,
  DASHBOARD_TRENDS_FETCHING_ERROR,
  DASHBOARD_STATISTIC_FETCHING_ERROR,

  EMPLOYEE_FETCHING_ERROR,
  ORDERS_FETCHING_ERROR,
  PRODUCTS_FETCHING_ERROR,
  USERS_FETCHING_ERROR,

  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_ERROR,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_ERROR,
  ORDER_REMOVE_SUCCESS,
  ORDER_REMOVE_ERROR,

  USER_CREATE_SUCCESS,
  USER_CREATE_ERROR,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  USER_REMOVE_SUCCESS,
  USER_REMOVE_ERROR,

  SIGN_IN_SUCCESS,
  SIGN_IN_SUCCESS_ACTIVATED,
  SIGN_IN_ERROR,
  SIGN_IN_WRONG_CREDENTIALS,

  SESSION_EXPIRED
}


export const NOTIFICATIONS: Record<ENotificationTypes, ToastPayload> = {
  [ENotificationTypes.PRODUCTS_FETCHING_ERROR]: {
    title: "Products data fetching failed",
    message: "Error during fetching products data",
    severity: "error",
  },
  [ENotificationTypes.ORDERS_FETCHING_ERROR]: {
    title: "Orders data fetching failed",
    message: "Error during fetching employee data",
    severity: "error",
  },
  [ENotificationTypes.USERS_FETCHING_ERROR]: {
    title: "Users data fetching failed",
    message: "Error during fetching users data",
    severity: "error",
  },
  [ENotificationTypes.EMPLOYEE_FETCHING_ERROR]: {
    title: "Employee data fetching failed",
    message: "Error during fetching employee data",
    severity: "error",
  },

  [ENotificationTypes.DASHBOARD_STATISTIC_FETCHING_ERROR]: {
    title: "Statistics data fetching failed",
    message: "Error during fetching statistics data",
    severity: "error",
  },
  [ENotificationTypes.DASHBOARD_TRENDS_FETCHING_ERROR]: {
    title: "Trends data fetching failed",
    message: "Error during fetching products trends data",
    severity: "error",
  },
  [ENotificationTypes.DASHBOARD_ORDERS_FETCHING_ERROR]: {
    title: "Orders data fetching failed",
    message: "Error during fetching orders chart data",
    severity: "error",
  },
  [ENotificationTypes.DASHBOARD_PRODUCTS_FETCHING_ERROR]: {
    title: "Products data fetching failed",
    message: "Error during fetching products chart data",
    severity: "error",
  },

  [ENotificationTypes.USER_REMOVE_SUCCESS]: {
    title: "User removed",
    message: "The user was successfully removed",
    severity: "success",
  },
  [ENotificationTypes.USER_REMOVE_ERROR]: {
    title: "User removing failed",
    message: "Error during removing the user",
    severity: "error",
  },
  [ENotificationTypes.USER_CREATE_SUCCESS]: {
    title: "User created",
    message: "The user was successfully created",
    severity: "success",
  },
  [ENotificationTypes.USER_CREATE_ERROR]: {
    title: "User creation failed",
    message: "Error during creation the user",
    severity: "error",
  },
  [ENotificationTypes.USER_UPDATE_SUCCESS]: {
    title: "User updated",
    message: "The user was successfully updated",
    severity: "success",
  },
  [ENotificationTypes.USER_UPDATE_ERROR]: {
    title: "User updating failed",
    message: "Error during updating the user",
    severity: "error",
  },

  [ENotificationTypes.ORDER_REMOVE_SUCCESS]: {
    title: "Order removed",
    message: "The order was successfully removed",
    severity: "success",
  },
  [ENotificationTypes.ORDER_REMOVE_ERROR]: {
    title: "Order removing failed",
    message: "Error during removing the order",
    severity: "error",
  },
  [ENotificationTypes.ORDER_CREATE_SUCCESS]: {
    title: "Order created",
    message: "The order was successfully created",
    severity: "success",
  },
  [ENotificationTypes.ORDER_CREATE_ERROR]: {
    title: "Order creation failed",
    message: "Error during creation the order",
    severity: "error",
  },
  [ENotificationTypes.ORDER_UPDATE_SUCCESS]: {
    title: "Order updated",
    message: "The order was successfully updated",
    severity: "success",
  },
  [ENotificationTypes.ORDER_UPDATE_ERROR]: {
    title: "Order updating failed",
    message: "Error during updating the order",
    severity: "error",
  },

  [ENotificationTypes.SIGN_IN_SUCCESS]: {
    title: "Authenticated",
    message: "Success message",
    severity: "success",
  },
  [ENotificationTypes.SIGN_IN_SUCCESS_ACTIVATED]: {
    title: "Account activated",
    message: "Account successfully activated. Credentials saved",
    severity: "success",
  },
  [ENotificationTypes.SIGN_IN_WRONG_CREDENTIALS]: {
    title: "Authentication failed",
    message: "Wrong user email or password",
    severity: "error",
  },
  [ENotificationTypes.SIGN_IN_ERROR]: {
    title: "Authentication failed",
    message: "Something went wrong. Please, update the page and try again",
    severity: "error",
  },

  [ENotificationTypes.SESSION_EXPIRED]: {
    title: "Session expired",
    message: "Session expired. Signing out...",
    severity: "info",
    options: { autoClose: false }
  },
};
