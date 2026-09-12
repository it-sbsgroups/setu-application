"use client";
export default function ToastProvider() {
  if (typeof window !== "undefined" && !window.toast) {
    window.toast = (m) => {
      const el = document.getElementById("global-toast");
      if (!el) return;
      el.textContent = m;
      el.style.display = "block";
      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(()=>el.style.display="none", 2200);
    };
  }
  return <div id="global-toast" style={{display:"none"}} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-2xl" />;
}
