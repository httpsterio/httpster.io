/*
  Hello, curious person! NeatStats records a basic page visit so the site owner can see how
  their site is being used. It sends the page URL and standard browser info, does not use
  cookies, and is not used to identify you in any way. Learn more at https://neatstats.net.
*/
(() => {
  const ENDPOINT = "https://neatstats.net/view";
  const payload = {
    v: 1,
    url: location.href,
    ref: document.referrer || ""
  };
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "text/plain;charset=UTF-8" });
    navigator.sendBeacon(ENDPOINT, blob);
    return;
  }
  if (window.fetch) {
    fetch(ENDPOINT, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body
    }).catch(() => { });
    return;
  }
  const i = new Image();
  i.src =
    ENDPOINT +
    "?url=" + encodeURIComponent(payload.url) +
    "&ref=" + encodeURIComponent(payload.ref) +
    "&v=1";
})();
