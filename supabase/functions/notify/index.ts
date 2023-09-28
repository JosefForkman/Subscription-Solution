import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import * as OneSignal from "https://esm.sh/@onesignal/node-onesignal@1.0.0-beta7";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0";
import { Database } from "../../supabase.ts";

const _OnesignalAppId_ = Deno.env.get("ONESIGNAL_APP_ID")!;
const _OnesignalUserAuthKey_ = Deno.env.get("USER_AUTH_KEY")!;
const _OnesignalRestApiKey_ = Deno.env.get("ONESIGNAL_REST_API_KEY")!;

const _supabaseUrl_ = Deno.env.get("supabaseUrl")!;
const _supabaseKey_ = Deno.env.get("supabaseKey")!;

const configuration = OneSignal.createConfiguration({
    userKey: _OnesignalUserAuthKey_,
    appKey: _OnesignalRestApiKey_,
});

const onesignal = new OneSignal.DefaultApi(configuration);

serve(async (req) => {
    const supabase = createClient<Database>(_supabaseUrl_, _supabaseKey_);
    try {
        /* price_history row changed */
        const {
            record: { serevice_id },
        } = await req.json();

        /* user_service */
        const { data: user_id } = await supabase
            .from("user_service")
            .select("user_id,")
            .eq("service_id", serevice_id);

        if (!user_id) {
            return new Response("Server error.", {
                headers: { "Content-Type": "application/json" },
                status: 400,
            });
        }

        // Build OneSignal notification object
        user_id.forEach(async (user_id) => {
            const notification = new OneSignal.Notification();
            notification.app_id = _OnesignalAppId_;
            notification.include_external_user_ids = [user_id];
            notification.contents = {
                en: `You just spent $${record.enterd_price}!`,
            };
            const onesignalApiRes = await onesignal.createNotification(
                notification
            );
        });

        return new Response(
            JSON.stringify({ onesignalResponse: onesignalApiRes }),
            {
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (err) {
        console.error("Failed to create OneSignal notification", err);
        return new Response("Server error.", {
            headers: { "Content-Type": "application/json" },
            status: 400,
        });
    }
});
