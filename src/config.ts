/**
 * Site-wide settings. Edit these before going live.
 */
export const config = {
  /** Where pilot requests are sent if no form endpoint is set (opens the visitor's email app). */
  contactEmail: 'pilot@example.com',

  /**
   * Optional: a URL that accepts a JSON POST of the pilot form
   * (for example a Cloudflare Worker you run, or a form service).
   * Leave empty to use the email fallback above.
   */
  formEndpoint: '',
};
