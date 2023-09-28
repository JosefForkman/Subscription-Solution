import OneSignal from "react-onesignal";

export default async function runOneSignal(uid: string) {
    await OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONESIGNSL_KEY ?? "",
        allowLocalhostAsSecureOrigin: true,
    });
    OneSignal.Slidedown.promptPush();

    OneSignal.login(uid);   
}
