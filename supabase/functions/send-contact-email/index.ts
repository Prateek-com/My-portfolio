import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    console.log("Sending notification email to prateek9q9q@gmail.com");

    // Send notification email to Prateek
    const notificationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["prateek9q9q@gmail.com"],
        subject: `New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #8B5CF6;">New Contact Form Submission</h2>
            <div style="background: #1a1a2e; padding: 20px; border-radius: 10px; color: #fff;">
              <p><strong style="color: #8B5CF6;">Name:</strong> ${name}</p>
              <p><strong style="color: #8B5CF6;">Email:</strong> ${email}</p>
              <p><strong style="color: #8B5CF6;">Message:</strong></p>
              <p style="background: rgba(139, 92, 246, 0.1); padding: 15px; border-radius: 8px; border-left: 3px solid #8B5CF6;">
                ${message.replace(/\n/g, '<br>')}
              </p>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        `,
      }),
    });

    if (!notificationRes.ok) {
      const errorData = await notificationRes.text();
      console.error("Failed to send notification email:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    console.log("Notification email sent successfully");

    // Send confirmation email to the sender
    console.log("Sending confirmation email to", email);
    const confirmationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Prateek Chaudhary <onboarding@resend.dev>",
        to: [email],
        subject: "Thanks for reaching out!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #8B5CF6;">Hi ${name}!</h2>
            <p>Thank you for getting in touch. I've received your message and will get back to you as soon as possible.</p>
            <p>In the meantime, feel free to check out my work on <a href="https://github.com/Prateek-com" style="color: #8B5CF6;">GitHub</a>.</p>
            <br>
            <p>Best regards,</p>
            <p><strong style="color: #8B5CF6;">Prateek Chaudhary</strong></p>
          </div>
        `,
      }),
    });

    if (!confirmationRes.ok) {
      console.error("Failed to send confirmation email");
    } else {
      console.log("Confirmation email sent successfully");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-contact-email function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
