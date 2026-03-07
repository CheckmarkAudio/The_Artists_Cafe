// ┌─────────────────────────────────────────────────────────────────────────┐
// │                                                                         │
// │        ░█████╗░██████╗░████████╗██╗░██████╗████████╗                   │
// │        ██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝╚══██╔══╝                   │
// │        ███████║██████╔╝░░░██║░░░██║╚█████╗░░░░██║░░░                   │
// │        ██╔══██║██╔══██╗░░░██║░░░██║░╚═══██╗░░░██║░░░                   │
// │        ██║░░██║██║░░██║░░░██║░░░██║██████╔╝░░░██║░░░                   │
// │        ╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░╚═╝╚═════╝░░░░╚═╝░░░                   │
// │                                                                         │
// │                  C A F É  —  mail.js                                    │
// │             artistscafe@hallpassinternational.com                        │
// │                                                                         │
// │         Email delivery powered by  E m a i l J S                        │
// │                   emailjs.com  ·  free tier: 200/mo                     │
// │                                                                         │
// └─────────────────────────────────────────────────────────────────────────┘


// ═══════════════════════════════════════════════════════════════════════════════
//  CREDENTIALS  —  fill these in, then the form is live
// ═══════════════════════════════════════════════════════════════════════════════
//
//  1. emailjs.com → Email Services → Add New Service → copy Service ID
//  2. Email Templates → create Template A + B below → copy each Template ID
//  3. Account → General → Public Key → copy Public Key

const EMAILJS_SERVICE_ID            = "service_jdvioa3";       // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID           = "template_f017y76";      // Template A — admin notification
const EMAILJS_AUTOREPLY_TEMPLATE_ID = "template_ma22uub";      // Template B — applicant reply  (or "" to skip)
const EMAILJS_PUBLIC_KEY            = "N5UpWeOs8jdOTQitf";     // e.g. "AbCdEfGhIjKlMnOp"

const ADMIN_EMAIL = "artistscafe@hallpassinternational.com";


// ═══════════════════════════════════════════════════════════════════════════════
//  TEMPLATE A — Admin Notification  ·  ID: template_f017y76  ✓ CONFIGURED
//  Subject line:  Artist Cafe Application — {{artist_name}}
//  Reply-To:      {{reply_to}}
// ═══════════════════════════════════════════════════════════════════════════════

/*

<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px; background-color: #f4f4f4; padding: 24px; color: #111111;">
  <div style="max-width: 760px; margin: 0 auto; background: #ffffff; border: 1px solid #d9d9d9; border-radius: 14px; overflow: hidden;">

    <div style="background: #000000; padding: 28px 24px 20px 24px; text-align: center;">
      <img
        src="{{logo_url}}"
        alt="Artist's Cafe"
        style="max-width: 220px; width: 100%; height: auto; display: block; margin: 0 auto 14px auto;"
      />
      <div style="font-size: 13px; color: #29c7f3; letter-spacing: 0.08em;">
        ARTIST DEVELOPMENT · BRANDING · DISTRIBUTION
      </div>
    </div>

    <div style="padding: 24px;">
      <div style="font-size: 14px; color: #2c3e50;">
        A new <strong>Artist's Café</strong> application has been received. Review the submission details below and respond when ready.
      </div>

      <div style="margin-top: 20px; padding: 18px 0; border-width: 1px 0; border-style: dashed; border-color: #cfcfcf;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="vertical-align: top; width: 72px;">
              <div style="padding: 8px 10px; margin: 0 12px 0 0; background: linear-gradient(180deg, #f2f2f2 0%, #c9c9c9 100%); border-radius: 8px; font-size: 28px; text-align: center; color: #111111;" role="img" aria-label="artist">
                🎤
              </div>
            </td>
            <td style="vertical-align: top;">
              <div style="color: #111111; font-size: 18px;">
                <strong>{{artist_name}}</strong>
              </div>
              <div style="color: #8c8c8c; font-size: 13px; margin-top: 2px;">
                Submitted {{submitted_at}}
              </div>
              <p style="font-size: 15px; margin: 12px 0 0 0; color: #2c3e50; line-height: 1.6;">
                {{goals}}
              </p>
            </td>
          </tr>
        </table>
      </div>

      <div style="margin-top: 18px;">
        <div style="font-size: 15px; font-weight: 700; color: #29c7f3; margin-bottom: 10px;">Identity</div>
        <table role="presentation" style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 7px 0; color: #666666; width: 190px;">Artist / Stage Name</td>
            <td style="padding: 7px 0; color: #111111;"><strong>{{artist_name}}</strong></td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">Contact Name</td>
            <td style="padding: 7px 0; color: #111111;">{{contact_name}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">Email</td>
            <td style="padding: 7px 0; color: #111111;">{{email}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">Phone</td>
            <td style="padding: 7px 0; color: #111111;">{{phone}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">Location</td>
            <td style="padding: 7px 0; color: #111111;">{{location}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">Role</td>
            <td style="padding: 7px 0; color: #111111;">{{role}}</td>
          </tr>
        </table>
      </div>

      <div style="margin-top: 24px;">
        <div style="font-size: 15px; font-weight: 700; color: #29c7f3; margin-bottom: 10px;">Platform Presence</div>
        <table role="presentation" style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 7px 0; color: #666666; width: 190px;">Spotify</td>
            <td style="padding: 7px 0; color: #111111;">{{spotify}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">Apple Music</td>
            <td style="padding: 7px 0; color: #111111;">{{apple_music}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">YouTube</td>
            <td style="padding: 7px 0; color: #111111;">{{youtube}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">TikTok</td>
            <td style="padding: 7px 0; color: #111111;">{{tiktok}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">Instagram</td>
            <td style="padding: 7px 0; color: #111111;">{{instagram}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">SoundCloud / Bandcamp</td>
            <td style="padding: 7px 0; color: #111111;">{{soundcloud}}</td>
          </tr>
        </table>
      </div>

      <div style="margin-top: 24px;">
        <div style="font-size: 15px; font-weight: 700; color: #29c7f3; margin-bottom: 10px;">About</div>
        <div style="font-size: 14px; color: #2c3e50; line-height: 1.6;">
          <div><strong style="color:#111111;">Bio:</strong></div>
          <div style="margin-top: 4px;">{{bio}}</div>
          <div style="margin-top: 14px;"><strong style="color:#111111;">Release Links:</strong></div>
          <div style="margin-top: 4px;">{{releases}}</div>
        </div>
      </div>

      <div style="margin-top: 24px;">
        <div style="font-size: 15px; font-weight: 700; color: #29c7f3; margin-bottom: 10px;">Rights + Goals</div>
        <table role="presentation" style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 7px 0; color: #666666; width: 190px;">Rights Confirmed</td>
            <td style="padding: 7px 0; color: #111111;">{{rights_confirmed}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">Label Affiliation</td>
            <td style="padding: 7px 0; color: #111111;">{{label_affiliation}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">Label Name</td>
            <td style="padding: 7px 0; color: #111111;">{{label_name}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">Distributing</td>
            <td style="padding: 7px 0; color: #111111;">{{media_types}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">Looking For</td>
            <td style="padding: 7px 0; color: #111111;">{{interests}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">Billing Preference</td>
            <td style="padding: 7px 0; color: #111111;">{{billing_option}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">Goals</td>
            <td style="padding: 7px 0; color: #111111;">{{goals}}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #666666;">Notes</td>
            <td style="padding: 7px 0; color: #111111;">{{notes}}</td>
          </tr>
        </table>
      </div>
    </div>

    <div style="background: #000000; padding: 16px 24px; text-align: center;">
      <div style="font-size: 12px; color: #cfcfcf;">
        <span style="color:#ffffff; font-weight:700;">Artist's Café</span>
        <span style="color:#29c7f3;"> · Artist Development · Branding · Distribution</span>
      </div>
    </div>

  </div>
</div>

*/


// ═══════════════════════════════════════════════════════════════════════════════
//  TEMPLATE B — Applicant Auto-Reply
//  Paste this HTML into the EmailJS template editor body for Template B
//  To Email:  {{to_email}}
//  Subject:   Your Artist Cafe application — we got it
// ═══════════════════════════════════════════════════════════════════════════════

/*

<div style="font-family: system-ui, -apple-system, Arial, sans-serif; font-size: 13px; background-color: #060a0f; padding: 32px 16px; min-height: 100%;">
  <div style="max-width: 560px; margin: 0 auto;">

    <!-- Header -->
    <div style="background-color: #0d1520; border: 1px solid #1e3040; border-radius: 12px; padding: 36px 32px; text-align: center; margin-bottom: 4px;">
      <div style="font-size: 11px; letter-spacing: 0.36em; text-transform: uppercase; color: #5fd6e6; margin-bottom: 14px;">Artist Cafe</div>
      <div style="font-size: 26px; font-weight: 700; color: #f5f9ff; line-height: 1.25; margin-bottom: 10px;">We got your application,<br>{{artist_name}}.</div>
      <div style="width: 40px; height: 2px; background: linear-gradient(90deg, #2ee6c3, #3dbbff); margin: 18px auto;"></div>
      <div style="color: #6b8599; font-size: 14px; line-height: 1.7;">
        Our team reviews applications on a rolling basis.<br>
        If approved, we'll follow up with next steps for<br>
        onboarding and your first release.
      </div>
    </div>

    <!-- What happens next -->
    <div style="background-color: #0d1520; border: 1px solid #1e3040; border-radius: 12px; padding: 24px 32px; margin-top: 4px;">
      <div style="font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: #5fd6e6; margin-bottom: 18px;">What happens next</div>
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #1a2a38; vertical-align: top; width: 32px;">
            <span style="color: #5fd6e6; font-size: 13px; font-weight: 700;">01</span>
          </td>
          <td style="padding: 10px 0 10px 14px; border-bottom: 1px solid #1a2a38; vertical-align: top;">
            <span style="color: #f5f9ff;">We review your application and profile for readiness.</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #1a2a38; vertical-align: top;">
            <span style="color: #5fd6e6; font-size: 13px; font-weight: 700;">02</span>
          </td>
          <td style="padding: 10px 0 10px 14px; border-bottom: 1px solid #1a2a38; vertical-align: top;">
            <span style="color: #f5f9ff;">If approved, we send onboarding instructions and payment info.</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; vertical-align: top;">
            <span style="color: #5fd6e6; font-size: 13px; font-weight: 700;">03</span>
          </td>
          <td style="padding: 10px 0 10px 14px; vertical-align: top;">
            <span style="color: #f5f9ff;">You set up your profile and prepare your first release.</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Disclaimer -->
    <div style="background-color: #0a111a; border: 1px solid #1a2530; border-radius: 12px; padding: 20px 32px; margin-top: 4px;">
      <div style="color: #4a6070; font-size: 12px; line-height: 1.75;">
        Additional opportunities — including editorial submissions and platform
        verification — are discretionary and non-guaranteed. Placement decisions
        are made entirely by third-party platforms and editors.
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 28px 0 8px; text-align: center;">
      <div style="font-size: 13px; font-weight: 600; color: #3a5060; letter-spacing: 0.08em; margin-bottom: 6px;">Artist Cafe</div>
      <a href="mailto:artistscafe@hallpassinternational.com" style="font-size: 11px; color: #2a4050; text-decoration: none;">artistscafe@hallpassinternational.com</a>
      <div style="margin-top: 16px; font-size: 10px; color: #1e2e3a; letter-spacing: 0.14em; text-transform: uppercase;">Access is paid. Support is earned.</div>
    </div>

  </div>
</div>

*/


// ══════════════════════════════════════════════════════════════════════════════
//  ↓  DO NOT EDIT BELOW THIS LINE
// ══════════════════════════════════════════════════════════════════════════════


const sendEmailJS = async ({ templateId, params }) => {
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id:      EMAILJS_SERVICE_ID,
      template_id:     templateId,
      user_id:         EMAILJS_PUBLIC_KEY,
      template_params: params,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "EmailJS request failed");
  }

  return response.text();
};

const buildAdminParams = (payload) => ({
  to_email:          ADMIN_EMAIL,
  reply_to:          payload.email         || "",
  subject:           `Artist Cafe Application — ${payload.artistName || "New Applicant"}`,
  logo_url:          "https://static.wixstatic.com/media/afbb39_c393044f52d345399aedd62ef55e0da3~mv2.png",
  artist_name:       payload.artistName    || "—",
  contact_name:      payload.contactName   || "—",
  email:             payload.email         || "—",
  phone:             payload.phone         || "—",
  location:          payload.location      || "—",
  role:              payload.role          || "—",
  spotify:           payload.spotify       || (payload.spotifyNotLive ? "Not live on Spotify yet" : "—"),
  apple_music:       payload.appleMusic    || "—",
  youtube:           payload.youtube       || "—",
  tiktok:            payload.tiktok        || "—",
  instagram:         payload.instagram     || "—",
  soundcloud:        payload.soundcloud    || "—",
  bio:               payload.bio           || "—",
  releases:          payload.releases      || "—",
  rights_confirmed:  payload.rightsCheck   ? "Yes" : "No",
  label_affiliation: payload.labelAffiliation || "No",
  label_name:        payload.labelName     || "—",
  media_types:       Array.isArray(payload.mediaTypes)
                       ? payload.mediaTypes.join(", ") || "—"
                       : payload.mediaTypes            || "—",
  interests:         Array.isArray(payload.interests)
                       ? payload.interests.join(", ")  || "—"
                       : payload.interests             || "—",
  billing_option:    payload.billingOption || "—",
  goals:             payload.goals         || "—",
  notes:             payload.notes         || "—",
  submitted_at:      payload.submittedAt
                       ? new Date(payload.submittedAt).toLocaleString("en-US", {
                           dateStyle: "long", timeStyle: "short",
                         })
                       : new Date().toLocaleString("en-US", {
                           dateStyle: "long", timeStyle: "short",
                         }),
});

const buildAutoreplyParams = (payload) => ({
  to_email:    payload.email      || "",
  artist_name: payload.artistName || "there",
});

window.MailService = {
  sendApplication: async (payload) => {
    await sendEmailJS({
      templateId: EMAILJS_TEMPLATE_ID,
      params:     buildAdminParams(payload),
    });

    const hasAutoreply =
      EMAILJS_AUTOREPLY_TEMPLATE_ID &&
      EMAILJS_AUTOREPLY_TEMPLATE_ID !== "";

    if (hasAutoreply && payload.email) {
      await sendEmailJS({
        templateId: EMAILJS_AUTOREPLY_TEMPLATE_ID,
        params:     buildAutoreplyParams(payload),
      });
    }
  },
};
