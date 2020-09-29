import { Manager } from "@twilio/flex-ui";
const callApi = async (
  method,
  route,
  urlParams,
  requestData,
  skipReadingResponseBody
) => {
  try {
    let headers = {
      Authorization: `Bearer ${
        Manager.getInstance().store.getState().flex.session.ssoTokenPayload
          .token
      }`,
    };

    let body = undefined;
    const url = `${process.env.REACT_APP_API_BASE_URL}/flex/${route}${
      urlParams ? "?" + urlParams.toString() : ""
    }`;
    if (requestData) {
      if (method === "GET") {
        return {
          statusCode: 0,
          error: "Invalid request, GET requests cannont have a body",
        };
      }
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(requestData);
    }

    const res = await fetch(url, {
      method,
      headers,
      body,
    });

    if (res.ok) {
      try {
        const resData = skipReadingResponseBody ? undefined : await res.json(); //NOTE: not runtime safe
        return {
          statusCode: res.status,
          responseObj: resData,
        };
      } catch (err) {
        console.error(err);
        return {
          statusCode: res.status,
          error: "failed to parse response returned by server",
        };
      }
    } else {
      return {
        statusCode: res.status,
        error: `${res.status} - ${res.statusText || ""}`,
      };
    }
  } catch (err) {
    let errorMessage = "failed to call api";
    return {
      statusCode: 0,
      error: errorMessage,
    };
  }
};

class AddressBookService {
  
 async getAddressBookContacts(model) {
    return callApi(
      "POST", "GetAddressBookContacts", undefined, model, false
    );
  }
}

const addressBookService = new AddressBookService();
export default addressBookService;
