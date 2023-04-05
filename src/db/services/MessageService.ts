import axios, { AxiosError } from "axios";

export const SendMessageService = (numberList: number[], message: string, title: string) => {
    try {
        const notifyUrl = process.env.APP_NOTIFY_SMS_API;
        const user_id = process.env.APP_NOTIFY_SMS_USERID;
        const api_key = process.env.APP_NOTIFY_SMS_KEYAPI;
        const sender_id = process.env.APP_NOTIFY_SMS_SENDER_ID;
        message = title + "\n" + message;

        if (notifyUrl !== undefined) {
            numberList.forEach(function (num: number) {
                if (num.toString().length === 9) {
                    let number = `+94${num}`;                    
                    axios.post(notifyUrl, null, {
                        params: {
                            user_id: user_id,
                            api_key: api_key,
                            sender_id: sender_id,
                            to: Number(number),
                            message: message
                        }
                    }).then(function (response) {
                    }).catch(function (error: AxiosError) {
                        console.log("SendMessage Error: " + JSON.stringify(error.response?.data));
                    });
                }
            });
        }
    } catch (error: any) {
        console.log("SendMessage: " + error);
    }
};