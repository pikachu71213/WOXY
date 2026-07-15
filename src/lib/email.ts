export interface EmailParams {
  name: string;
  phone: string;
  email?: string;
  program: string;
  message?: string;
  source: string;
}

/**
 * Sends an email notification using the EmailJS REST API.
 * Uses environment variables: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY.
 */
export async function sendEmailNotification(params: EmailParams): Promise<boolean> {
  const serviceId = "service_khu3fx4";
  const templateId = "template_7v8zuz9";
  const publicKey = "YRYpYF4MvwyNOgrW3";

  if (!serviceId || !templateId || !publicKey) {
    console.warn("EmailJS credentials not configured.");
    return false;
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name: params.name,
          phone: params.phone,
          email: params.email || "Not Provided",
          program: params.program,
          message: params.message || "No custom message",
          source: params.source,
        },
      }),
    });

    if (response.ok) {
      console.log("Email notification sent successfully via EmailJS!");
      return true;
    } else {
      const errText = await response.text();
      console.error("Failed to send email via EmailJS:", response.status, errText);
      return false;
    }
  } catch (error) {
    console.error("Error occurred while sending EmailJS request:", error);
    return false;
  }
}
