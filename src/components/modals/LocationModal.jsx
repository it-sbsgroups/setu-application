"use client";
import { useState } from "react";
import { useLocationCtx } from "@/components/layout/LocationContext";
const DISTRICTS = {"Maharashtra":["Mumbai","Pune","Nagpur"],"Delhi":["New Delhi","Central Delhi"],"Gujarat":["Ahmedabad","Surat"],"Karnataka":["Bangalore Urban"],"Tamil Nadu":["Chennai"]};
export default function LocationModal() {
  const { isOpen, setIsOpen, setLocation } = useLocationCtx();
  const [state, setState] = useState(""); const [district, setDistrict] = useState(""); const [pin, setPin] = useState(""); const [detecting, setDetecting] = useState(false);
  if (!isOpen) return null;
  const handleDetect = () => { setDetecting(true); setTimeout(()=>{ setState("Maharashtra"); setDistrict("Mumbai"); setPin("400001"); setDetecting(false); window.toast("Location detected"); }, 800); };
  const apply = () => { if (!state) { window.toast("Please select a state"); return; } const label = (district ? district + ", " : "") + (pin || state); setLocation(label); setIsOpen(false); window.toast("Delivering to " + label); };
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[80px] bg-black/55 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-80 max-w-full p-5 pop-animate"><div className="flex items-center justify-between mb-4"><h3 className="font-semibold font-display">Select Delivery Location</h3><button onClick={()=>setIsOpen(false)} className="text-gray-400">✕</button></div><button onClick={handleDetect} className="w-full flex items-center gap-2 border-2 border-dashed border-orange-300 rounded-lg p-3 text-sm font-medium mb-4 hover:bg-orange-50" style={{color:'#FF6B35'}}>{detecting ? "Detecting..." : "Use my current location"}</button><div className="space-y-3"><select value={state} onChange={e=>setState(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm"><option value="">Select State</option>{Object.keys(DISTRICTS).map(s=><option key={s} value={s}>{s}</option>)}</select>{state && <select value={district} onChange={e=>setDistrict(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm"><option value="">Select District</option>{(DISTRICTS[state]||[]).map(d=><option key={d} value={d}>{d}</option>)}</select>}<input value={pin} onChange={e=>setPin(e.target.value)} placeholder="Enter 6-digit pincode" maxLength={6} className="w-full border rounded-lg px-3 py-2 text-sm" /></div><button onClick={apply} className="w-full mt-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#FF6B35]">Apply Location</button></div>
    </div>
  );
}
