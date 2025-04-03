import { toast } from "react-toastify";

const toastConfig = {
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

/**
 * Calls the Toastify information pop-up.
 *
 * @param {string} message String containing the pop-up's message.
 * @returns {Id} Id containing data used to update and dismiss the pop-up.
 */
export function toastInfo(message) {
  toast.info(message, toastConfig);
}

/**
 * Calls the Toastify success pop-up.
 *
 * @param {string} message String containing the pop-up's message.
 * @returns {Id} Id containing data used to update and dismiss the pop-up.
 */
export function toastSuccess(message) {
  toast.success(message, toastConfig);
}

/**
 * Calls the Toastify warning pop-up.
 *
 * @param {string} message String containing the pop-up's message.
 * @returns {Id} Id containing data used to update and dismiss the pop-up.
 */
export function toastWarning(message) {
  toast.warn(message, toastConfig);
}

/**
 * Calls the Toastify error pop-up.
 *
 * @param {string} message String containing the pop-up's message.
 * @returns {Id} Id containing data used to update and dismiss the pop-up.
 */
export function toastError(message) {
  toast.error(message, toastConfig);
}
