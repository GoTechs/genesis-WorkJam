/**
 * create the data for creating, update the order data
 */

const data = {
  getCreateOrderData(data, date, orderid = 1) {
    let createOrder = {};
    const uuidv1 = require("uuid/v1");
    let formData = this.getformtData(data, date);
    createOrder["fields"] = formData;
    createOrder["sourceorderid"] = uuidv1();
    createOrder["sourceid"] = orderid;
    createOrder["packages"] = { 1: orderid };
    return createOrder;
  },
  getUpdateOrderData(data, date) {
    let updateOrder = {};
    let formData = this.getformtData(data, date);
    updateOrder["fields"] = formData;
    updateOrder["orderid"] = 1;
    updateOrder["packages"] = 1;
    return updateOrder;
  },
  postUserInfo(data, uid, date) {
    let $request = {};
    let formatDate = date;
    let stateData = data;
    $request["uid"] = uid;
    for (let formElement in stateData) {
      switch (formElement) {
        case "day":
          $request["birthdate"] = formatDate;
          break;
        case "month":
          $request["birthdate"] = formatDate;
          break;
        case "year":
          $request["birthdate"] = formatDate;
          break;
        case "checkbox":
          $request[formElement] = stateData[formElement].value === "confirmed";
          break;
        default:
          $request[formElement] = stateData[formElement].value;
      }
    }

    return $request;
  },
  postCreditInfo(data, date, userId) {
    let dataForm = {};
    let stateData = data;
    let formatDate = date;
    dataForm["user_id"] = userId;
    for (let formElement in stateData) {
      switch (formElement) {
        case "month":
          dataForm["expDateMonth"] = formatDate.month;
          break;
        case "year":
          dataForm["expDateYear"] = formatDate.year.slice(2);
          break;
        default:
          dataForm[formElement] = stateData[formElement];
      }
    }

    return dataForm;
  },
  getformtData(data, date) {
    let formData = {};
    let formatDate = date;
    let stateData = data;
    for (let formElement in stateData) {
      const key = data[formElement].key;
      if (key) {
        switch (formElement) {
          case "day":
            formData[17] = formatDate;

            break;
          case "month":
            formData[17] = formatDate;
            break;
          case "year":
            formData[17] = formatDate;
            break;
          case "checkbox":
            formData[key] = stateData[formElement].value === "confirmed";
            break;
          default:
            formData[key] = stateData[formElement].value;
        }
      }
    }
    return formData;
  },
  updateUserInfo(dataForm, userInfo) {
    let data = { ...dataForm };

    let updateData = Object.keys(data).map(inputElement => {
      if (userInfo.hasOwnProperty(inputElement)) {
        data[inputElement].value = userInfo[inputElement];
        data[inputElement].valid = true;
        data[inputElement].touched = true;
      }
      return data[inputElement];
    });
    return data;
  },
  formatEditDate(date) {
    let newDate = date.split("-");
    for (let i = 0; i < newDate.length; i++) {
      newDate[i] = newDate[i].startsWith("0")
        ? newDate[i].slice(1)
        : newDate[i];
    }
    return newDate;
  }
};
export default data;
