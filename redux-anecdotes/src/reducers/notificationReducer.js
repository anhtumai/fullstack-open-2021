const initialMessage = "";

const createShowNotificationAction = (message) => ({
  type: "SHOW",
  data: { message },
});

const createClearNotficationAction = () => ({
  type: "CLEAR",
});

let prevNotificationId;
export const createSetNotificationAction = (message, seconds = 10) => {
  return async (dispatch) => {
		if (prevNotificationId) clearTimeout(prevNotificationId)
    dispatch(createShowNotificationAction(message));
    prevNotificationId = setTimeout(() => {
      dispatch(createClearNotficationAction());
    }, seconds * 1000);
  };
};

const notificationReducer = (state = initialMessage, action) => {
  switch (action.type) {
    case "SHOW":
      return action.data.message;
    case "CLEAR":
      return initialMessage;
    default:
      return state;
  }
};

export default notificationReducer;
